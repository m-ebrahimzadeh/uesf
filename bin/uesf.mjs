#!/usr/bin/env node
/**
 * UESF Canonical Cross-Platform CLI Engine (DEC-026, DEC-027, DEC-028, DEC-029)
 * Zero external dependencies. Consolidates install, update, check, doctor,
 * uninstall, init-project, sync-snapshot, and build.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import os from 'node:os';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');
const FW_VERSION = '0.9.3';

function toPosix(p) {
  return p.replace(/\\/g, '/');
}

function readNormalized(filePath) {
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) return '';
  return fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '').replace(/\r\n/g, '\n').trim();
}

function writeLf(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content.replace(/\r\n/g, '\n'), { encoding: 'utf8' });
}

function sha256Hex(text) {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex').toLowerCase();
}

function pathExistsOrSymlink(targetPath) {
  try {
    fs.lstatSync(targetPath);
    return true;
  } catch {
    return false;
  }
}

function removePathSafely(targetPath) {
  let stat;
  try {
    stat = fs.lstatSync(targetPath);
  } catch {
    return false;
  }
  if (stat.isSymbolicLink()) {
    try {
      fs.unlinkSync(targetPath);
    } catch {
      fs.rmSync(targetPath, { recursive: true, force: true });
    }
    return true;
  }
  fs.rmSync(targetPath, { recursive: true, force: true });
  return true;
}

function removeDirIfEmpty(dirPath) {
  try {
    if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
      if (fs.readdirSync(dirPath).length === 0) {
        fs.rmdirSync(dirPath);
      }
    }
  } catch {
    // Best-effort empty directory cleanup
  }
}

const STRUCTURAL_EXCLUDED_DIRS = new Set(['.git', 'handoffs', 'dist']);

const NON_GIT_SKIP_DIRS = new Set([
  '.git',
  'handoffs',
  'dist',
  'node_modules',
  '.venv',
  'venv',
  'vendor',
  'target',
  '.next',
  'build',
  'coverage',
]);

function walkMdFiles(dirPath, rootDir, excludeDistAndSnap = false) {
  const results = [];
  if (!fs.existsSync(dirPath)) return results;
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const full = path.join(dirPath, entry.name);
    const rel = toPosix(path.relative(rootDir, full));
    if (entry.isDirectory()) {
      if (entry.name === '.git' || entry.name === 'handoffs') continue;
      if (excludeDistAndSnap && NON_GIT_SKIP_DIRS.has(entry.name)) continue;
      results.push(...walkMdFiles(full, rootDir, excludeDistAndSnap));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      if (excludeDistAndSnap && entry.name === 'CONTEXT_SNAPSHOT.md') continue;
      results.push(rel);
    }
  }
  return results;
}

function discoverSnapshotMdFiles(targetRoot) {
  const res = spawnSync(
    'git',
    ['-c', 'core.quotepath=false', 'ls-files', '-z', '--cached', '--others', '--exclude-standard', '--', '*.md'],
    { cwd: targetRoot, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, windowsHide: true }
  );
  if (res.error || res.status !== 0 || typeof res.stdout !== 'string') {
    return walkMdFiles(targetRoot, targetRoot, true);
  }

  const seen = new Set();
  const results = [];
  for (const raw of res.stdout.split('\0')) {
    if (!raw) continue;
    const rel = toPosix(raw);
    if (!rel.endsWith('.md')) continue;
    if (seen.has(rel)) continue;
    const segs = rel.split('/');
    if (segs[segs.length - 1] === 'CONTEXT_SNAPSHOT.md') continue;
    if (segs.some((seg) => STRUCTURAL_EXCLUDED_DIRS.has(seg))) continue;
    seen.add(rel);
    const full = path.join(targetRoot, rel);
    try {
      if (fs.statSync(full).isFile()) {
        results.push(rel);
      }
    } catch {
      // Unstaged deletions stay excluded so MISSING_ON_DISK drift is surfaced
    }
  }
  return results;
}

function sortPathsCaseInsensitive(arr) {
  return [...arr].sort((a, b) => {
    const la = a.toLowerCase();
    const lb = b.toLowerCase();
    if (la < lb) return -1;
    if (la > lb) return 1;
    return a < b ? -1 : a > b ? 1 : 0;
  });
}

// ============================================================================
// 1. SYNC-SNAPSHOT COMMAND
// ============================================================================
export function runSyncSnapshot(targetRootArg = '') {
  let targetRoot = targetRootArg ? path.resolve(targetRootArg) : REPO_ROOT;
  if (
    path.basename(targetRoot) === '.uesf' &&
    fs.existsSync(path.join(targetRoot, 'EXTENSION.md'))
  ) {
    targetRoot = path.dirname(targetRoot);
  }

  const isUesfCore =
    fs.existsSync(path.join(targetRoot, 'management/PROJECT_PROFILE.md')) &&
    fs.existsSync(path.join(targetRoot, 'core/UNIVERSAL_AGENT_OPERATING_MODEL.md'));

  let ctrlDir, profilePath, tasksPath, decisionsPath, kmPath, outPath, ledgerFiles;
  if (isUesfCore) {
    ctrlDir = 'management';
    profilePath = 'management/PROJECT_PROFILE.md';
    tasksPath = 'management/ACTIVE_TASKS.md';
    decisionsPath = 'management/DECISION_LOG.md';
    kmPath = 'management/KNOWLEDGE_MAP.md';
    outPath = 'management/CONTEXT_SNAPSHOT.md';
    ledgerFiles = [
      profilePath,
      tasksPath,
      decisionsPath,
      kmPath,
      'management/RELEASE_HISTORY.md',
      'management/IMPLEMENTATION_ROADMAP.md',
    ];
  } else if (fs.existsSync(path.join(targetRoot, '.uesf/EXTENSION.md'))) {
    ctrlDir = '.uesf';
    profilePath = '.uesf/EXTENSION.md';
    tasksPath = '.uesf/ACTIVE_TASKS.md';
    decisionsPath = '.uesf/DECISION_LOG.md';
    kmPath = '.uesf/KNOWLEDGE_MAP.md';
    outPath = '.uesf/CONTEXT_SNAPSHOT.md';
    ledgerFiles = [profilePath, tasksPath, decisionsPath, kmPath];
  } else {
    throw new Error(
      `No UESF control plane found in ${targetRoot} (expected management/PROJECT_PROFILE.md or .uesf/EXTENSION.md).`
    );
  }

  const concatLedger = ledgerFiles
    .map((rel) => `=== ${rel} ===\n${readNormalized(path.join(targetRoot, rel))}`)
    .join('\n');
  const ledgerHashFull = sha256Hex(concatLedger);
  const ledgerHashShort = ledgerHashFull.slice(0, 12);

  const profileText = readNormalized(path.join(targetRoot, profilePath));
  const verMatch = profileText.match(/\* \*\*Version\*\*: ([^\r\n]+)/);
  const projVer = verMatch ? verMatch[1].trim() : FW_VERSION;
  const updMatch = profileText.match(/\* \*\*Last Updated\*\*: ([^\r\n]+)/);
  const lastUpd = updMatch ? updMatch[1].trim() : new Date().toISOString().slice(0, 10);

  const kmText = readNormalized(path.join(targetRoot, kmPath));
  const kmRowRegex = /^\| `([^`]+)` \| `([^`]+)` \|[^|]*\|[^|]*\| `([^`]+)` \|/gm;
  const kmRows = [...kmText.matchAll(kmRowRegex)].map((m) => ({
    id: m[1],
    path: m[2],
    version: m[3],
  }));
  const kmPaths = kmRows.map((r) => r.path);

  const relMd = sortPathsCaseInsensitive(discoverSnapshotMdFiles(targetRoot));
  const missingOnDisk = kmPaths.filter((p) => !relMd.includes(p));
  const extraOnDisk = relMd.filter((p) => !kmPaths.includes(p));

  const verMismatches = [];
  for (const r of kmRows) {
    if (!isUesfCore && !r.path.startsWith('.uesf/')) continue;
    const fullP = path.join(targetRoot, r.path);
    if (fs.existsSync(fullP)) {
      const ft = readNormalized(fullP);
      const escapedV = r.version.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (!new RegExp(`\\* \\*\\*Version\\*\\*: ${escapedV}`).test(ft)) {
        verMismatches.push(r.path);
      }
    }
  }

  const tasksText = readNormalized(path.join(targetRoot, tasksPath));
  const taskRegex =
    /^\| `(TASK-\d+)` \| ([^|]+) \| ([^|]+) \| ([^|]+) \| ([^|]+) \| `([^`]+)` \| `([^`]+)` \|/gm;
  const taskRows = [...tasksText.matchAll(taskRegex)];
  const acceptedCount = taskRows.filter((m) => m[7].trim() === 'ACCEPTED').length;

  const decisionsText = readNormalized(path.join(targetRoot, decisionsPath));
  const decRows = [
    ...decisionsText.matchAll(/^\| `(DEC-\d+)` \| ([^|]+) \| ([^|]+) \| ([^|]+) \|/gm),
  ];
  const oqRows = [
    ...decisionsText.matchAll(/^\| `(OQ-\d+)` \| ([^|]+) \| ([^|]+) \| ([^|]+) \|/gm),
  ];
  const unresolvedOq = oqRows.filter((m) => !/Closed|Resolved/i.test(m[4]));

  const driftAlerts = [];
  if (missingOnDisk.length > 0) driftAlerts.push(`MISSING_ON_DISK: ${missingOnDisk.join(', ')}`);
  if (isUesfCore && extraOnDisk.length > 0) driftAlerts.push(`UNINDEXED_MD_ON_DISK: ${extraOnDisk.join(', ')}`);
  if (verMismatches.length > 0) driftAlerts.push(`KM_VERSION_MISMATCH: ${verMismatches.join(', ')}`);
  const driftStatus =
    driftAlerts.length === 0
      ? 'CLEAN (0 discrepancies between canonical ledgers and on-disk specification tree)'
      : `DRIFT_DETECTED (${driftAlerts.length} issue(s))`;

  const lines = [
    '# UESF Context Snapshot (Machine-Generated)',
    '> **NON-AUTHORITATIVE DERIVED ARTIFACT — DO NOT EDIT MANUALLY**',
    '> Generated deterministically by `bin/uesf.mjs sync-snapshot` per `policies/SOURCE_OF_TRUTH_POLICY.md` (`DEC-023`, `DEC-026`).',
    `> * **Canonical Control Plane**: \`${ctrlDir}/\``,
    `> * **Snapshot Version**: \`${projVer}\``,
    `> * **Source-Ledger-SHA256**: \`${ledgerHashFull}\` (\`${ledgerHashShort}\`)`,
    `> * **Last Ledger Update**: \`${lastUpd}\``,
    '',
    '## 1. Empirically Verified Repository Facts (`[VERIFIED_BY_GIT_AND_FS_PROBE]`)',
    `* **Canonical Specification Files on Disk**: \`${relMd.length}\``,
    `* **Registered Documents in \`KNOWLEDGE_MAP.md\`**: \`${kmRows.length}\``,
    `* **Missing Registered Files on Disk**: \`${missingOnDisk.length}\``,
    `* **Unindexed Canonical Markdown Files on Disk**: \`${extraOnDisk.length}\``,
    `* **Header-to-Registry Version Mismatches**: \`${verMismatches.length}\``,
    `* **Total Recorded Tasks (\`ACCEPTED\` / Total)**: \`${acceptedCount} / ${taskRows.length}\``,
    `* **Total Recorded Decisions (\`DEC-*\`)**: \`${decRows.length}\``,
    `* **Unresolved Open Questions (\`OQ-*\`)**: \`${unresolvedOq.length}\``,
    '',
    '## 2. Recorded Project & Governance State (`[RECORDED_IN_LEDGER]`)',
    `### 2.1 Project Identity & Architecture Profile (\`${profilePath}\`)`,
    profileText,
    '',
    `### 2.2 Active & Recent Task Ledger (\`${tasksPath}\`)`,
    tasksText,
    '',
    `### 2.3 Architectural & Governance Decisions (\`${decisionsPath}\`)`,
    decisionsText,
    '',
    `### 2.4 Master Knowledge Map Routing Index (\`${kmPath}\`)`,
    kmText,
    '',
    '## 3. Automated Discrepancy & Drift Audit (`[DRIFT_CHECK]`)',
    `* **Drift Audit Verdict**: \`${driftStatus}\``,
  ];
  for (const a of driftAlerts) {
    lines.push(`  * **Alert**: \`${a}\``);
  }
  lines.push(
    `* **Cloud / Remote Session Note**: When reading this file remotely without local \`CAP-FS\`/\`CAP-GIT\`, treat Section 1 as verified at the time of the commit that produced \`Source-Ledger-SHA256: ${ledgerHashShort}\`, treat Section 2 as \`[REPORTED — Remote Ledger]\`, and treat any uncommitted local working-tree edits as \`[UNKNOWN — Local FS Unavailable]\`.`
  );

  writeLf(path.join(targetRoot, outPath), lines.join('\n') + '\n');
  console.log(`SNAPSHOT_SYNCED=${outPath} (SHA256=${ledgerHashShort})`);
}

// ============================================================================
// 2. BUILD-DIST COMMAND
// ============================================================================
function extractTemplateStructure(filePath) {
  const raw = readNormalized(filePath);
  // 1. Fenced-block templates (Task Contract, Handoff, Evidence, KDP, Escalation):
  //    extract copy-pasteable ```markdown blocks directly, stripping metadata headers,
  //    Purpose, redundant wrapper headings ("## 2. Canonical ... Block"), and Relationships.
  const fencedBlocks = [...raw.matchAll(/```markdown\n[\s\S]*?\n```/g)].map((m) => m[0].trim());
  if (fencedBlocks.length > 0) {
    return fencedBlocks.join('\n\n');
  }
  // 2. Schema-rule templates (Feature Discovery Brief, Project Extension, or future
  //    "## 2. Canonical Markdown Structure" templates): extract actionable schema body.
  const schemaMatch = raw.match(
    /## (?:2\. Canonical Markdown Structure|3\. Rules and Requirements)\s*\n([\s\S]*?)(?=\n## \d+\.|\s*$)/
  );
  if (schemaMatch) {
    return schemaMatch[1].trim();
  }
  // 3. Deterministic fallback for any unstructured template: strip header, Purpose, Relationships.
  return raw
    .replace(/^# [^\n]+\n(?:\* \*\*[^\n]+\n)+\s*/, '')
    .replace(/## 1\. Purpose\s*\n[\s\S]*?(?=\n## \d+\.|\s*$)/, '')
    .replace(/\n## \d+\. Relationships with Other Documents\s*\n[\s\S]*$/, '')
    .trim();
}

export function runBuildDist() {
  runSyncSnapshot(REPO_ROOT);

  const sourceDirs = [
    'core',
    'policies',
    'protocols',
    'roles',
    'workflows',
    'templates',
    'adapters',
    'extensions',
  ];
  let sourceFiles = [];
  for (const d of sourceDirs) {
    sourceFiles.push(...walkMdFiles(path.join(REPO_ROOT, d), REPO_ROOT, false));
  }
  sourceFiles = sortPathsCaseInsensitive(sourceFiles);

  const concatSource = sourceFiles
    .map((rel) => `=== ${rel} ===\n${readNormalized(path.join(REPO_ROOT, rel))}`)
    .join('\n');
  const sourceHashFull = sha256Hex(concatSource);
  const sourceHashShort = sourceHashFull.slice(0, 12);

  const coreInvariantsBlock = [
    `## UESF Embedded Core & Policy Invariants (\`v${FW_VERSION}\`)`,
    '1. **Autonomy Tiers (`policies/AUTONOMY_POLICY.md`)**:',
    '   * `A0` (Advisory & Discovery — Read-Only, zero file writes/edits, zero task contracting).',
    '   * `A1` (Bounded Execution — execute only explicitly contracted steps within file boundaries).',
    '   * `A2` (Autonomous Execution — make routine technical/governance decisions within approved scope).',
    '   * `A3` (Human Approval Required — mandatory pause for destructive git actions, security/secret changes, scope overrides, transitioning out of Feature Discovery, or tagging `v1.0.0`).',
    '2. **Epistemic Discipline (`policies/VERIFICATION_POLICY.md`)**:',
    '   * Distinguish all claims into: `Verified` (reproducible tool/test/git output in current session), `Observed` (seen in state without full lifecycle test), `Reported` (from handoff/remote ledger), `Inferred` (logically deduced), and `Unknown` (inaccessible in current runtime). Never fabricate tool execution or file edits.',
    '3. **Capability Probing & Three-Domain Knowledge Lookup (`core/CAPABILITY_MODEL.md`, `policies/SOURCE_OF_TRUTH_POLICY.md`)**:',
    '   * Probe available capabilities (`CAP-FS`, `CAP-TERM`, `CAP-GIT`, `CAP-WS`, `CAP-WEB`, `CAP-MCP`, `CAP-AGENT`) before acting.',
    '   * If working in a downstream project with `.uesf/`, read operational state from `.uesf/{EXTENSION.md, KNOWLEDGE_MAP.md, ACTIVE_TASKS.md, DECISION_LOG.md, CONTEXT_SNAPSHOT.md}` and permanent project documentation from native `docs/` paths indexed in `.uesf/KNOWLEDGE_MAP.md`. If working in the UESF repository itself, read `management/`.',
    '4. **Risk-Gated Proportional Execution (`protocols/TASK_CONTRACT_PROTOCOL.md`)**:',
    '   * Unambiguous, single-concern, low-risk tasks in a single workspace may use the `Fast-Path` inline contract (registering `IN_PROGRESS` in `ACTIVE_TASKS.md` on disk before code edits, running `Verified` checks, and updating the row to `IN_REVIEW`/`ACCEPTED` before committing with `[TASK-XXX]`). Any task touching auth, secrets, deletion logic, policies, multi-module interfaces, or `A3` gates requires the `Standard-Contract` track (or immediate `IN_PROGRESS -> BLOCKED` Track Promotion if discovered mid-task).',
    '5. **File-Backed Operational Handoff Spool (`protocols/HANDOFF_PROTOCOL.md`, `DEC-031`)**:',
    '   * Cross-session and cross-agent handoffs use the gitignored flat directory `<ctrlDir>/handoffs/` (`.uesf/handoffs/` in downstream projects, `management/handoffs/` in UESF) with paired sequential filenames: odd sequences (`HO-TASK-XXX-01.md`, `-03.md`) for Outbound dispatches and even sequences (`HO-TASK-XXX-02.md`, `-04.md`) for Inbound returns with embedded `EV-TASK-XXX` evidence.',
    '   * When `CAP-FS` or `CAP-MCP` is available, read/write handoff files directly in `<ctrlDir>/handoffs/` and emit a compact 5-line Dispatch/Return Summary Card in chat; fall back to full inline chat Markdown only when filesystem access is unavailable. Permanent task states and decisions MUST still be recorded in `ACTIVE_TASKS.md` and `DECISION_LOG.md`.',
    '6. **Single-Sentence Closing Action Prompt (`core/UNIVERSAL_AGENT_OPERATING_MODEL.md`, `DSC-006`)**:',
    '   * End every UESF skill response with **one concise, actionable sentence** starting with `**Next:**` recommending the single best next step—no lengthy explanations or multi-option lists.',
    '   * On completed execution or handoff, include a ready-to-use `/uesf-<name>` command populated with concrete known context (`TASK-XXX`, `DSC-XXX`, `HO-TASK-XXX-YY`) without fabricating unknown IDs (adapt prefix to `$uesf-<name>` in Codex or `/uesf-<name>.md` in Cline when active). On `A0`/`A3` pauses or `BLOCKED` halts, state the exact in-chat reply, approval, or unblock action needed without prematurely recommending a gated downstream command.',
    '   * Exceptions: a 5-line Handoff Summary Card whose `Next Command` line already names the next step satisfies this rule without duplication; `/uesf-init` Stage 3 keeps its 3-command newcomer welcome card.',
  ].join('\n');

  const bundles = [
    { name: 'discovery',     kind: 'role',     source: 'roles/discovery/SKILL.md',         autonomy: 'A0 (Read-Only Lock)',  desc: 'UESF Feature Discovery & Requirements Strategist (Iterative A0 Brainstorming)', templates: ['templates/FEATURE_DISCOVERY_BRIEF_TEMPLATE.md'] },
    { name: 'cto',           kind: 'role',     source: 'roles/cto/SKILL.md',               autonomy: 'A2 (A3 Human-Gated)',  desc: 'UESF Founding CTO & Chief Architect (Governance, Task Contracting & Acceptance)', templates: ['templates/TASK_CONTRACT_TEMPLATE.md', 'templates/HANDOFF_PACKAGE_TEMPLATE.md'] },
    { name: 'architect',     kind: 'role',     source: 'roles/architect/SKILL.md',         autonomy: 'A1/A2',                desc: 'UESF Architect Role (System Design, Interface Contracts & Layer Isolation)', templates: ['templates/PROJECT_EXTENSION_TEMPLATE.md'] },
    { name: 'developer',     kind: 'role',     source: 'roles/developer/SKILL.md',         autonomy: 'A1/A2',                desc: 'UESF Developer Role (Bounded Implementation, Unit Tests & Branch Hygiene)', templates: ['templates/EVIDENCE_PACKAGE_TEMPLATE.md', 'templates/KDP_TEMPLATE.md'] },
    { name: 'qa',            kind: 'role',     source: 'roles/qa/SKILL.md',                autonomy: 'A1/A2',                desc: 'UESF QA Role (Independent Verification, Acceptance Audits & Regression Checks)', templates: ['templates/EVIDENCE_PACKAGE_TEMPLATE.md'] },
    { name: 'devops',        kind: 'role',     source: 'roles/devops/SKILL.md',            autonomy: 'A1/A2',                desc: 'UESF DevOps Role (Build/Dist Automation, Git Workflows & Environment Tooling)', templates: ['templates/EVIDENCE_PACKAGE_TEMPLATE.md'] },
    { name: 'security',      kind: 'role',     source: 'roles/security/SKILL.md',          autonomy: 'A1/A2',                desc: 'UESF Security Role (Threat Modeling, Secret Hygiene & Prompt-Injection Gates)', templates: ['templates/ESCALATION_RECORD_TEMPLATE.md'] },
    { name: 'sre',           kind: 'role',     source: 'roles/sre/SKILL.md',               autonomy: 'A1/A2',                desc: 'UESF SRE Role (Operational Readiness, Observability & Rollback Verification)', templates: ['templates/EVIDENCE_PACKAGE_TEMPLATE.md'] },
    { name: 'documentation', kind: 'role',     source: 'roles/documentation/SKILL.md',     autonomy: 'A1',                   desc: 'UESF Documentation Role (Specification Formatting, Link Integrity & Mirrors)', templates: ['templates/KDP_TEMPLATE.md'] },
    { name: 'init',          kind: 'workflow', source: 'workflows/INIT_WORKFLOW.md',       autonomy: 'A0 -> A1 on Approval', desc: 'UESF Project Initialization Workflow (/uesf-init - A0 Audit & .uesf/ Scaffold)', templates: ['templates/PROJECT_EXTENSION_TEMPLATE.md'] },
    { name: 'handoff',       kind: 'workflow', source: 'workflows/HANDOFF_WORKFLOW.md',    autonomy: 'A0/A1',                desc: 'UESF Session-Exit Handoff Workflow (/uesf-handoff - Package Work & Evidence)', templates: ['templates/HANDOFF_PACKAGE_TEMPLATE.md', 'templates/EVIDENCE_PACKAGE_TEMPLATE.md'] },
    { name: 'status',        kind: 'workflow', source: 'workflows/STATUS_WORKFLOW.md',     autonomy: 'A0 (Read-Only)',       desc: 'UESF Unified Session-Entry & Context Reconstruction Workflow (/uesf-status)', templates: [] },
  ];

  const distRoot = path.join(REPO_ROOT, 'dist');
  if (fs.existsSync(distRoot)) fs.rmSync(distRoot, { recursive: true, force: true });

  const manifestBundles = [];

  for (const b of bundles) {
    const skillId = `uesf-${b.name}`;
    const srcText = readNormalized(path.join(REPO_ROOT, b.source));

    let extraSections = '';
    if (b.templates.length > 0) {
      const tLines = ['', '---', '## Embedded Canonical Output Templates'];
      for (const tp of b.templates) {
        tLines.push('', `### Template Source: \`${tp}\``, extractTemplateStructure(path.join(REPO_ROOT, tp)));
      }
      extraSections += tLines.join('\n');
    }

    const metadataFooter = `<!-- UESF-BUNDLE-METADATA: bundle=${skillId} command=/${skillId} source=${b.source} version=${FW_VERSION} sha256=${sourceHashFull} short_sha256=${sourceHashShort} -->`;

    const compiledBody = [
      `* **Activation Banner Rule**: Begin your first response with: \`**[UESF v${FW_VERSION} | Active: ${skillId} | Autonomy: ${b.autonomy}]**\``,
      '',
      coreInvariantsBlock,
      '',
      '---',
      `## Canonical Specification (\`${b.source}\`)`,
      '',
      srcText + extraSections,
      '',
      metadataFooter,
    ].join('\n') + '\n';

    const quotedDesc = JSON.stringify(b.desc);

    const skillRelPath = `dist/skills/${skillId}/SKILL.md`;
    const skillContent = [
      '---',
      `name: ${skillId}`,
      `description: ${quotedDesc}`,
      '---',
      '',
      compiledBody.trimEnd(),
      '',
    ].join('\n');
    writeLf(path.join(REPO_ROOT, skillRelPath), skillContent);

    const cmdRelPath = `dist/commands/uesf/${b.name}.md`;
    const cmdContent = [
      '---',
      `description: ${quotedDesc}`,
      '---',
      '',
      compiledBody.trimEnd(),
      '',
    ].join('\n');
    writeLf(path.join(REPO_ROOT, cmdRelPath), cmdContent);

    const tomlRelPath = `dist/gemini-cli/uesf/${b.name}.toml`;
    const escapedBody = compiledBody.replace(/\\/g, '\\\\').replace(/"""/g, '\\"\\"\\"');
    const tomlContent = [
      `# UESF Compiled Gemini CLI Reference Command: /${skillId} (v${FW_VERSION} | Source-SHA256: ${sourceHashShort})`,
      `description = ${quotedDesc}`,
      'prompt = """',
      escapedBody.trimEnd(),
      '"""',
      '',
    ].join('\n');
    writeLf(path.join(REPO_ROOT, tomlRelPath), tomlContent);

    manifestBundles.push({
      id: skillId,
      command: `/${skillId}`,
      kind: b.kind,
      canonical_source: b.source,
      skill_path: skillRelPath,
      command_path: cmdRelPath,
      gemini_toml_path: tomlRelPath,
    });
  }

  const manifestObj = {
    framework: 'Universal Engineering Skills Framework (UESF)',
    version: FW_VERSION,
    source_sha256: sourceHashFull,
    source_sha256_short: sourceHashShort,
    bundle_count: bundles.length,
    bundles: manifestBundles,
  };
  writeLf(path.join(distRoot, 'manifest.json'), JSON.stringify(manifestObj, null, 2) + '\n');
  console.log(
    `DIST_BUILT=12 bundles (36 files + dist/manifest.json, SHA256=${sourceHashShort})`
  );
}

// ============================================================================
// 3. INIT-PROJECT COMMAND (DEC-027)
// ============================================================================
export function runInitProject(projDirArg = '.') {
  const projPath = path.resolve(projDirArg || '.');
  const projUesfScripts = path.join(projPath, '.uesf/scripts');
  fs.mkdirSync(projUesfScripts, { recursive: true });
  for (const s of ['sync-snapshot.ps1', 'sync-snapshot.sh']) {
    const src = path.join(REPO_ROOT, 'scripts', s);
    if (fs.existsSync(src)) {
      const dst = path.join(projUesfScripts, s);
      fs.copyFileSync(src, dst);
      if (s.endsWith('.sh')) {
        try { fs.chmodSync(dst, 0o755); } catch {}
      }
    }
  }
  const projBinDir = path.join(projPath, '.uesf/bin');
  fs.mkdirSync(projBinDir, { recursive: true });
  const dstCli = path.join(projBinDir, 'uesf.mjs');
  fs.copyFileSync(__filename, dstCli);
  try { fs.chmodSync(dstCli, 0o755); } catch {}

  const projHandoffsDir = path.join(projPath, '.uesf/handoffs');
  fs.mkdirSync(projHandoffsDir, { recursive: true });

  const rootGitignorePath = path.join(projPath, '.gitignore');
  let rootIgnoresHandoffs = false;
  if (fs.existsSync(rootGitignorePath) && fs.statSync(rootGitignorePath).isFile()) {
    const giLines = readNormalized(rootGitignorePath).split('\n').map((l) => l.trim());
    rootIgnoresHandoffs = giLines.includes('.uesf/handoffs/') || giLines.includes('.uesf/handoffs');
  }
  if (!rootIgnoresHandoffs) {
    const uesfGitignorePath = path.join(projPath, '.uesf/.gitignore');
    if (fs.existsSync(uesfGitignorePath) && fs.statSync(uesfGitignorePath).isFile()) {
      const uesfGiText = readNormalized(uesfGitignorePath);
      const uesfGiLines = uesfGiText.split('\n').map((l) => l.trim());
      if (!uesfGiLines.includes('handoffs/') && !uesfGiLines.includes('handoffs')) {
        writeLf(uesfGitignorePath, (uesfGiText ? uesfGiText + '\n' : '') + 'handoffs/\n');
      }
    } else {
      writeLf(uesfGitignorePath, '# UESF Ephemeral Local Handoff Spool (DEC-031)\nhandoffs/\n');
    }
  }

  const hookSrc = path.join(REPO_ROOT, 'scripts/hooks/pre-commit');
  const projHooks = path.join(projPath, '.git/hooks');
  if (!fs.existsSync(projHooks)) {
    console.log(
      `PROJECT_HOOK_SKIPPED_NO_GIT=${toPosix(projPath)} (run 'git init' and re-run init-project to wire pre-commit hook)`
    );
  } else {
    const hooksPathRes = spawnSync('git', ['config', '--get', 'core.hooksPath'], {
      cwd: projPath,
      encoding: 'utf8',
      windowsHide: true,
    });
    const customHooksPath =
      hooksPathRes.status === 0 && typeof hooksPathRes.stdout === 'string'
        ? hooksPathRes.stdout.trim()
        : '';
    if (customHooksPath) {
      console.log(
        `PROJECT_HOOK_SKIPPED_CUSTOM_HOOKSPATH=${toPosix(projPath)} (custom core.hooksPath detected; add 'node .uesf/bin/uesf.mjs sync-snapshot && git add .uesf/CONTEXT_SNAPSHOT.md' to your pre-commit hook)`
      );
    } else {
      const dstH = path.join(projHooks, 'pre-commit');
      if (
        fs.existsSync(dstH) &&
        !readNormalized(dstH).includes('UESF Automatic Context Snapshot')
      ) {
        console.log(
          `PROJECT_HOOK_SKIPPED_EXISTING=${toPosix(projPath)} (existing pre-commit hook preserved; append 'node .uesf/bin/uesf.mjs sync-snapshot && git add .uesf/CONTEXT_SNAPSHOT.md' to chain UESF snapshot sync)`
        );
      } else if (fs.existsSync(hookSrc)) {
        fs.copyFileSync(hookSrc, dstH);
        try { fs.chmodSync(dstH, 0o755); } catch {}
        console.log(`PROJECT_HOOK_WIRED=${toPosix(projPath)}`);
      }
    }
  }

  const extPath = path.join(projPath, '.uesf/EXTENSION.md');
  if (fs.existsSync(extPath)) {
    const extText = readNormalized(extPath);
    const extVerMatch = extText.match(/\* \*\*Version\*\*: ([^\r\n]+)/);
    const extVer = extVerMatch ? extVerMatch[1].trim() : '0.1.0';
    const today = new Date().toISOString().slice(0, 10);

    const kmDest = path.join(projPath, '.uesf/KNOWLEDGE_MAP.md');
    if (!fs.existsSync(kmDest)) {
      writeLf(
        kmDest,
        [
          '# Project Knowledge Map & Source-of-Truth Registry',
          '* **Document ID**: PROJ-MGMT-004',
          '* **Canonical Path**: .uesf/KNOWLEDGE_MAP.md',
          '* **Version**: 0.1.0',
          '* **Status**: Active',
          '* **Owner**: CTO',
          `* **Last Updated**: ${today}`,
          '',
          '## 1. Registered Project Documents',
          '| Doc ID | Repository Path | Category | Owner | Version | Status |',
          '| :--- | :--- | :--- | :--- | :--- | :--- |',
          `| \`PROJ-EXT-001\` | \`.uesf/EXTENSION.md\` | Project Extension | CTO | \`${extVer}\` | Active |`,
          '| `PROJ-MGMT-002` | `.uesf/ACTIVE_TASKS.md` | Operational State | CTO | `0.1.0` | Active |',
          '| `PROJ-MGMT-003` | `.uesf/DECISION_LOG.md` | Operational State | CTO | `0.1.0` | Active |',
          '| `PROJ-MGMT-004` | `.uesf/KNOWLEDGE_MAP.md` | Operational State | CTO | `0.1.0` | Active |',
          '',
        ].join('\n')
      );
    }

    const tasksDest = path.join(projPath, '.uesf/ACTIVE_TASKS.md');
    if (!fs.existsSync(tasksDest)) {
      writeLf(
        tasksDest,
        [
          '# Active Tasks Registry',
          '* **Document ID**: PROJ-MGMT-002',
          '* **Canonical Path**: .uesf/ACTIVE_TASKS.md',
          '* **Version**: 0.1.0',
          '* **Status**: Active',
          '* **Owner**: CTO',
          `* **Last Updated**: ${today}`,
          '',
          '## 1. Current Task Registry',
          '| Task ID | Title | Responsible Role | Reviewer Role | Target Workspace | Autonomy | State | Evidence / Notes |',
          '| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |',
          '| `TASK-001` | Initialize UESF Project Control Plane (.uesf/) | CTO / DevOps | Human Stakeholder | Engineering Workspace | `A1` | `ACCEPTED` | Initialized via /uesf-init. |',
          '',
        ].join('\n')
      );
    }

    const decDest = path.join(projPath, '.uesf/DECISION_LOG.md');
    if (!fs.existsSync(decDest)) {
      writeLf(
        decDest,
        [
          '# Architectural & Governance Decision Log',
          '* **Document ID**: PROJ-MGMT-003',
          '* **Canonical Path**: .uesf/DECISION_LOG.md',
          '* **Version**: 0.1.0',
          '* **Status**: Active',
          '* **Owner**: CTO',
          `* **Last Updated**: ${today}`,
          '',
          '## 1. Confirmed & Approved Decisions',
          '| Decision ID | Category | Decision Summary | Status | Authority | Date |',
          '| :--- | :--- | :--- | :--- | :--- | :--- |',
          `| \`DEC-001\` | Governance | Onboard Project to UESF Three-Domain Governance | Confirmed | Human Stakeholder | ${today} |`,
          '',
        ].join('\n')
      );
    }

    runSyncSnapshot(projPath);
  }
}

// ============================================================================
// 4. AGENT ADAPTERS, INSTALL STATE & VALIDATION HELPERS (DEC-028)
// ============================================================================
function listInstalledVsCodeExtNames(userHome) {
  const names = [];
  for (const rel of [
    '.vscode/extensions',
    '.vscode-insiders/extensions',
    '.vscode-server/extensions',
    '.vscode-server-insiders/extensions',
    '.antigravity-server/extensions',
  ]) {
    const extRoot = path.join(userHome, rel);
    if (!fs.existsSync(extRoot)) continue;
    try {
      for (const entry of fs.readdirSync(extRoot, { withFileTypes: true })) {
        if (entry.isDirectory() || entry.isSymbolicLink()) {
          names.push(entry.name.toLowerCase());
        }
      }
    } catch {
      // Ignore unreadable extension roots
    }
  }
  return names;
}

/**
 * Returns the 6 local coding agent adapters (DEC-028, DEC-029).
 */
export function getAgentAdapters(userHome = os.homedir()) {
  const vsCodeExtNames = listInstalledVsCodeExtNames(userHome);
  const hasVsCodeExt = (prefix) => {
    const p = prefix.toLowerCase();
    return vsCodeExtNames.some((n) => n === p || n.startsWith(`${p}-`));
  };
  const localAppData = process.env.LOCALAPPDATA || '';

  return [
    {
      name: 'antigravity',
      detect: () =>
        fs.existsSync(path.join(userHome, '.gemini/config/.migrated')) ||
        fs.existsSync(path.join(userHome, '.gemini/config')) ||
        fs.existsSync(path.join(userHome, '.gemini/antigravity-cli')) ||
        (localAppData ? fs.existsSync(path.join(localAppData, 'Programs/Antigravity')) : false) ||
        hasVsCodeExt('google.google-antigravity'),
      skillsDir: path.join(userHome, '.gemini/config/skills'),
      legacyPathsToClean: [
        path.join(userHome, '.gemini/antigravity/skills/uesf-*'),
        path.join(userHome, '.gemini/antigravity/skills/.uesf-manifest.json'),
        path.join(userHome, '.gemini/config/skills/.uesf-manifest.json'),
      ],
      uiHint: 'Invoke via /uesf-<name> or automatic skill matching in Antigravity',
    },
    {
      name: 'claude-code',
      detect: () =>
        fs.existsSync(path.join(userHome, '.claude')) ||
        hasVsCodeExt('anthropic.claude-code'),
      skillsDir: path.join(userHome, '.claude/skills'),
      legacyPathsToClean: [
        path.join(userHome, '.claude/commands/uesf'),
        path.join(userHome, '.claude/skills/.uesf-manifest.json'),
      ],
      uiHint: 'Invoke via /uesf-<name> (or automatic skill matching) in Claude Code',
    },
    {
      name: 'gemini-cli',
      detect: () => fs.existsSync(path.join(userHome, '.gemini')),
      skillsDir: path.join(userHome, '.gemini/skills'),
      legacyPathsToClean: [
        path.join(userHome, '.gemini/commands/uesf'),
        path.join(userHome, '.gemini/skills/.uesf-manifest.json'),
      ],
      uiHint: 'Invoke via /uesf-<name> (or /skills list) in Gemini CLI',
    },
    {
      name: 'cline',
      detect: () =>
        fs.existsSync(path.join(userHome, '.cline')) ||
        fs.existsSync(path.join(userHome, 'Documents/Cline')) ||
        hasVsCodeExt('saoudrizwan.claude-dev'),
      skillsDir: path.join(userHome, '.cline/skills'),
      workflowsDir: path.join(userHome, 'Documents/Cline/Workflows'),
      legacyPathsToClean: [
        path.join(userHome, 'Documents/Cline/Workflows/uesf'),
        path.join(userHome, 'Documents/Cline/Workflows/.uesf-manifest.json'),
        path.join(userHome, '.cline/skills/.uesf-manifest.json'),
      ],
      uiHint: 'Invoke via /uesf-<name>.md in chat or manage in Cline Skills tab',
    },
    {
      name: 'kilocode',
      detect: () =>
        fs.existsSync(path.join(userHome, '.kilo')) ||
        fs.existsSync(path.join(userHome, '.config/kilo')) ||
        hasVsCodeExt('kilocode.kilo-code'),
      skillsDir: path.join(userHome, '.kilo/skills'),
      legacyPathsToClean: [
        path.join(userHome, '.kilocode/workflows/uesf'),
        path.join(userHome, '.kilocode/workflows/.uesf-manifest.json'),
        path.join(userHome, '.kilo/skills/.uesf-manifest.json'),
      ],
      uiHint: 'Invoke via /uesf-<name> or Skills settings in Kilo Code',
    },
    {
      name: 'codex',
      detect: () =>
        fs.existsSync(path.join(userHome, '.codex')) ||
        hasVsCodeExt('openai.chatgpt'),
      skillsDir: path.join(userHome, '.codex/skills'),
      legacyPathsToClean: [
        path.join(userHome, '.codex/skills/.uesf-manifest.json'),
        path.join(userHome, '.codex/prompts/uesf-*.md'),
      ],
      uiHint: "Run 'Force reload skills' (or restart Codex), then invoke via $uesf-<name> or /",
    },
  ];
}

function buildInstalledPathEntry(adapter) {
  if (adapter.workflowsDir) {
    return {
      skills_dir: toPosix(adapter.skillsDir),
      workflows_dir: toPosix(adapter.workflowsDir),
    };
  }
  return toPosix(adapter.skillsDir);
}

function getInstallStatePath(userHome = os.homedir()) {
  return path.join(userHome, '.uesf', 'install-state.json');
}

function readInstallState(userHome = os.homedir()) {
  const p = getInstallStatePath(userHome);
  if (!fs.existsSync(p)) return null;
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch {
    return null;
  }
}

function writeInstallState(distManifest, installedMap, userHome = os.homedir()) {
  const p = getInstallStatePath(userHome);
  const existing = readInstallState(userHome);
  const mergedPaths = { ...(existing?.installed_paths || {}), ...installedMap };
  const payload = {
    framework: distManifest.framework || 'Universal Engineering Skills Framework (UESF)',
    version: distManifest.version,
    source_sha256: distManifest.source_sha256,
    source_sha256_short: distManifest.source_sha256_short,
    uesf_repo_path: toPosix(REPO_ROOT),
    updated_at: new Date().toISOString(),
    installed_paths: mergedPaths,
  };
  writeLf(p, JSON.stringify(payload, null, 2) + '\n');
  return p;
}

function expandLegacyPattern(patternPath) {
  const base = path.basename(patternPath);
  if (!base.includes('*')) {
    return pathExistsOrSymlink(patternPath) ? [patternPath] : [];
  }
  const parentDir = path.dirname(patternPath);
  if (!fs.existsSync(parentDir)) return [];
  const regexStr = '^' + base.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$';
  const re = new RegExp(regexStr);
  const matches = [];
  for (const entry of fs.readdirSync(parentDir, { withFileTypes: true })) {
    if (re.test(entry.name)) {
      matches.push(path.join(parentDir, entry.name));
    }
  }
  return matches;
}

function findLegacyArtifacts(adapters) {
  const found = [];
  const seen = new Set();
  for (const a of adapters) {
    for (const pattern of a.legacyPathsToClean) {
      for (const matched of expandLegacyPattern(pattern)) {
        const key = path.resolve(matched).toLowerCase();
        if (seen.has(key)) continue;
        seen.add(key);
        found.push({ adapter: a.name, path: matched });
      }
    }
  }
  return found;
}

function cleanLegacyArtifacts(adapters) {
  const found = findLegacyArtifacts(adapters);
  const removed = [];
  for (const item of found) {
    if (removePathSafely(item.path)) {
      removed.push(item);
      console.log(`CLEANED_LEGACY=[${item.adapter}] ${toPosix(item.path)}`);
    }
  }
  return removed;
}

function resolveTargetSelection(rawTargets, allAdapters, defaultMode = 'auto') {
  const aliases = {
    claude: 'claude-code',
    gemini: 'gemini-cli',
    kilo: 'kilocode',
  };
  const tokens = (rawTargets && rawTargets.length > 0 ? rawTargets : [defaultMode]).map(
    (t) => aliases[t] || t
  );
  if (tokens.includes('all')) return { mode: 'all', selected: allAdapters };
  if (tokens.includes('auto')) return { mode: 'auto', selected: allAdapters.filter((a) => a.detect()) };

  const validNames = new Set(allAdapters.map((a) => a.name));
  for (const t of tokens) {
    if (!validNames.has(t)) {
      throw new Error(
        `Unknown agent target '${t}'. Valid targets: auto, all, ${[...validNames].join(', ')}.`
      );
    }
  }
  return { mode: 'explicit', selected: allAdapters.filter((a) => tokens.includes(a.name)) };
}

function loadDistManifest() {
  const distRoot = path.join(REPO_ROOT, 'dist');
  const manifestPath = path.join(distRoot, 'manifest.json');
  if (!fs.existsSync(manifestPath)) {
    throw new Error('dist/manifest.json not found. Run `node bin/uesf.mjs build` first.');
  }
  const distManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  return { distRoot, distManifest };
}

function parseSkillFrontmatter(rawFm) {
  const keys = [];
  const fields = {};
  for (const line of rawFm.split('\n')) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!m) {
      return { error: `Invalid YAML frontmatter line: ${line}` };
    }
    const key = m[1];
    const rawVal = m[2].trim();
    keys.push(key);
    fields[key] = rawVal;
  }
  return { keys, fields };
}

function decodeYamlScalar(rawVal) {
  if (rawVal.startsWith('"') && rawVal.endsWith('"')) {
    try {
      return { value: JSON.parse(rawVal), quoted: true };
    } catch {
      return { error: 'Malformed double-quoted string in YAML frontmatter.' };
    }
  }
  if (rawVal.startsWith("'") && rawVal.endsWith("'")) {
    return { value: rawVal.slice(1, -1).replace(/''/g, "'"), quoted: true };
  }
  return { value: rawVal, quoted: false };
}

function validateBundleFile(filePath, { kind = 'skill', expectedId = '', expectedShortSha = '' } = {}) {
  const issues = [];
  const label = kind === 'skill' ? 'SKILL.md' : 'Workflow .md';
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    return { valid: false, missing: true, issues: [`${label} missing`] };
  }
  const raw = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---(?:\n|$)([\s\S]*)$/);
  if (!fmMatch) {
    return { valid: false, missing: false, issues: ['Missing or malformed YAML frontmatter block'] };
  }

  const parsed = parseSkillFrontmatter(fmMatch[1]);
  if (parsed.error) {
    issues.push(parsed.error);
  } else {
    const { keys, fields } = parsed;
    if (keys.includes('version')) {
      issues.push("Unexpected top-level 'version' key in YAML frontmatter");
    }
    const allowedKeys = kind === 'skill' ? ['name', 'description'] : ['description'];
    const extraKeys = keys.filter((k) => !allowedKeys.includes(k));
    if (extraKeys.length > 0) {
      issues.push(`Unexpected frontmatter key(s): ${extraKeys.join(', ')}`);
    }
    if (kind === 'skill' && !keys.includes('name')) {
      issues.push("Missing 'name' in frontmatter");
    }
    if (!keys.includes('description')) {
      issues.push("Missing 'description' in frontmatter");
    }

    if (kind === 'skill' && fields.name !== undefined) {
      const nameDecoded = decodeYamlScalar(fields.name);
      const nameVal = (nameDecoded.value || '').trim();
      if (!nameVal || nameVal.length > 64) {
        issues.push(`Invalid skill name length (${nameVal.length})`);
      } else if (!/^[a-z0-9-]+$/.test(nameVal) || nameVal.startsWith('-') || nameVal.endsWith('-') || nameVal.includes('--')) {
        issues.push(`Invalid skill name format '${nameVal}'`);
      } else if (expectedId && nameVal !== expectedId) {
        issues.push(`Skill name '${nameVal}' does not match directory '${expectedId}'`);
      }
    }

    if (fields.description !== undefined) {
      const descDecoded = decodeYamlScalar(fields.description);
      if (descDecoded.error) {
        issues.push(descDecoded.error);
      } else {
        const descVal = (descDecoded.value || '').trim();
        if (!descDecoded.quoted) {
          issues.push("Frontmatter 'description' must be quoted");
        }
        if (!descVal) {
          issues.push("Frontmatter 'description' cannot be empty");
        } else if (descVal.length > 1024) {
          issues.push(`Frontmatter 'description' exceeds 1024 chars (${descVal.length})`);
        }
        if (descVal.includes('<') || descVal.includes('>')) {
          issues.push("Frontmatter 'description' cannot contain '<' or '>'");
        }
      }
    }
  }

  const body = fmMatch[2];
  if (/^>\s*\*\*NON-AUTHORITATIVE/m.test(body)) {
    issues.push('Top-of-body NON-AUTHORITATIVE boilerplate present');
  }
  const metaMatch = body.match(/<!--\s*UESF-BUNDLE-METADATA:\s*([^>]+)-->/);
  if (!metaMatch) {
    issues.push('Missing UESF-BUNDLE-METADATA HTML comment footer');
  } else {
    if (expectedId && !metaMatch[1].includes(`bundle=${expectedId}`)) {
      issues.push(`Bundle metadata mismatch (expected bundle=${expectedId})`);
    }
    if (expectedShortSha && !metaMatch[1].includes(`short_sha256=${expectedShortSha}`)) {
      issues.push(`SHA256 mismatch (expected short_sha256=${expectedShortSha})`);
    }
  }

  return { valid: issues.length === 0, missing: false, issues };
}

function syncAdapterSkills(adapter, distRoot, distManifest, link = false) {
  fs.mkdirSync(adapter.skillsDir, { recursive: true });
  for (const entry of fs.readdirSync(adapter.skillsDir, { withFileTypes: true })) {
    if ((entry.isDirectory() || entry.isSymbolicLink()) && entry.name.startsWith('uesf-')) {
      removePathSafely(path.join(adapter.skillsDir, entry.name));
    }
  }
  for (const b of distManifest.bundles) {
    const srcSkillDir = path.join(distRoot, 'skills', b.id);
    const dstSkillDir = path.join(adapter.skillsDir, b.id);
    if (link) {
      fs.symlinkSync(srcSkillDir, dstSkillDir, process.platform === 'win32' ? 'junction' : 'dir');
    } else {
      fs.cpSync(srcSkillDir, dstSkillDir, { recursive: true, force: true });
    }
  }
}

function syncAdapterWorkflows(adapter, distRoot, distManifest) {
  if (!adapter.workflowsDir) return;
  fs.mkdirSync(adapter.workflowsDir, { recursive: true });
  for (const entry of fs.readdirSync(adapter.workflowsDir, { withFileTypes: true })) {
    if ((entry.isFile() || entry.isSymbolicLink()) && /^uesf-.*\.md$/.test(entry.name)) {
      removePathSafely(path.join(adapter.workflowsDir, entry.name));
    }
  }
  for (const b of distManifest.bundles) {
    const srcCmdFile = path.join(path.dirname(distRoot), b.command_path);
    const dstWorkflowFile = path.join(adapter.workflowsDir, `${b.id}.md`);
    fs.copyFileSync(srcCmdFile, dstWorkflowFile);
  }
}

function syncAdapterTargets(adapter, distRoot, distManifest, link = false) {
  syncAdapterSkills(adapter, distRoot, distManifest, link);
  syncAdapterWorkflows(adapter, distRoot, distManifest);
}

function formatAdapterTargetPaths(adapter) {
  return adapter.workflowsDir
    ? `${toPosix(adapter.skillsDir)} & ${toPosix(adapter.workflowsDir)}`
    : toPosix(adapter.skillsDir);
}

function maybeRedirectVersion(subcommand, options) {
  const { version, link, initProject, targets, explicitTargets } = options;
  if (!version) return;
  const { distManifest } = loadDistManifest();
  const cleanVer = version.replace(/^v/i, '');
  if (cleanVer === distManifest.version || version === distManifest.version) return;

  const refCandidate =
    version.startsWith('v') || /^[0-9a-f]{7,40}$/i.test(version) ? version : `v${version}`;
  console.log(
    `VERSION_REDIRECT=Requested UESF ${version} (local bundle is v${distManifest.version}); delegating to npx github:m-ebrahimzadeh/uesf#${refCandidate}`
  );
  const npxCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  const forwardArgs = ['--yes', `github:m-ebrahimzadeh/uesf#${refCandidate}`, subcommand];
  if (link) forwardArgs.push('--link');
  if (initProject) forwardArgs.push('--init-project', initProject);
  if (explicitTargets && targets.length > 0) {
    forwardArgs.push('--target', targets.join(','));
  }
  const res = spawnSync(npxCmd, forwardArgs, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  process.exit(res.status ?? 1);
}

// ============================================================================
// 5. LIFECYCLE COMMANDS: INSTALL, UPDATE, CHECK, DOCTOR, UNINSTALL
// ============================================================================
export function runInstallOrUpdate(options = {}, commandName = 'install') {
  if (options.check) {
    return runCheck(options);
  }
  maybeRedirectVersion(commandName, options);

  const { distRoot, distManifest } = loadDistManifest();

  if (options.initProject) {
    runInitProject(options.initProject);
    if (!options.explicitTargets) return;
  }

  const gitHooksDir = path.join(REPO_ROOT, '.git/hooks');
  const hookSrc = path.join(REPO_ROOT, 'scripts/hooks/pre-commit');
  if (fs.existsSync(gitHooksDir) && fs.existsSync(hookSrc)) {
    const hookDst = path.join(gitHooksDir, 'pre-commit');
    fs.copyFileSync(hookSrc, hookDst);
    try { fs.chmodSync(hookDst, 0o755); } catch {}
    console.log('HOOK_INSTALLED=.git/hooks/pre-commit');
  }

  const userHome = os.homedir();
  const allAdapters = getAgentAdapters(userHome);
  const { mode, selected } = resolveTargetSelection(options.targets, allAdapters, 'auto');

  if (selected.length === 0) {
    console.log(
      `WARN_NO_TARGETS_DETECTED=No supported coding agents detected under ${toPosix(userHome)} (pass --target <antigravity|claude-code|gemini-cli|cline|kilocode|codex|all> to install explicitly)`
    );
    if (process.env.WSL_DISTRO_NAME) {
      console.log(
        `INFO_WSL_HOME_ISOLATION=WSL uses Linux home (${toPosix(userHome)}), separate from Windows %USERPROFILE%; run on Windows for Windows-hosted GUI agents or pass --target <agent|all> for WSL agents.`
      );
    }
    console.log(
      'INFO_REMOTE_TARGET=gemini-desktop -> adapters/gemini-strategic-workspace/ADAPTER.md (Remote GitHub Raw / CONTEXT_SNAPSHOT.md bridge; no local skills dir)'
    );
    return;
  }

  // Clean legacy duplicate command/workflow directories & stray manifests
  const cleanupScope = mode === 'explicit' ? selected : allAdapters;
  cleanLegacyArtifacts(cleanupScope);

  const installedMap = {};
  for (const adapter of selected) {
    syncAdapterTargets(adapter, distRoot, distManifest, Boolean(options.link));
    installedMap[adapter.name] = buildInstalledPathEntry(adapter);
    console.log(
      `INSTALLED_TARGET=${adapter.name} (v${distManifest.version}, SHA256=${distManifest.source_sha256_short}) -> ${formatAdapterTargetPaths(adapter)} [${adapter.uiHint}]`
    );
  }

  const statePath = writeInstallState(distManifest, installedMap, userHome);
  console.log(`INSTALL_STATE=${toPosix(statePath)}`);
  console.log(
    'INFO_REMOTE_TARGET=gemini-desktop -> adapters/gemini-strategic-workspace/ADAPTER.md (Remote GitHub Raw / CONTEXT_SNAPSHOT.md bridge; no local skills dir)'
  );

  if (!options.initProject) {
    console.log('');
    console.log(`--- UESF v${distManifest.version} QUICKSTART ---`);
    console.log('1. Onboard any project:  Open project in your agent and run /uesf-init (or $uesf-init in Codex)');
    console.log('2. Resume any session:   Run /uesf-status (or $uesf-status in Codex)');
    console.log('3. Brainstorm a feature: Run /uesf-discovery (or $uesf-discovery in Codex) [A0 Read-Only]');
    console.log('4. Check & maintain:     node bin/uesf.mjs check | doctor | update | uninstall');
  }
}

export function runCheck(options = {}) {
  const { distManifest } = loadDistManifest();
  const userHome = os.homedir();
  const allAdapters = getAgentAdapters(userHome);
  const { selected } = resolveTargetSelection(options.targets, allAdapters, 'auto');
  if (selected.length === 0) {
    console.log(
      `CHECK_NO_TARGETS_DETECTED=No supported coding agents detected under ${toPosix(userHome)} (pass --target <agent|all> to inspect specific targets)`
    );
    return;
  }
  const expectedIds = new Set(distManifest.bundles.map((b) => b.id));

  for (const adapter of selected) {
    const legacyHits = findLegacyArtifacts([adapter]);
    let missingCount = 0;
    const problemBundles = [];
    let wfMissingCount = 0;
    const wfProblemBundles = [];

    for (const b of distManifest.bundles) {
      const skillMd = path.join(adapter.skillsDir, b.id, 'SKILL.md');
      const res = validateBundleFile(skillMd, {
        kind: 'skill',
        expectedId: b.id,
        expectedShortSha: distManifest.source_sha256_short,
      });
      if (res.missing) {
        missingCount++;
      } else if (!res.valid) {
        problemBundles.push(`${b.id} (${res.issues.join('; ')})`);
      }

      if (adapter.workflowsDir) {
        const wfMd = path.join(adapter.workflowsDir, `${b.id}.md`);
        const wfRes = validateBundleFile(wfMd, {
          kind: 'workflow',
          expectedId: b.id,
          expectedShortSha: distManifest.source_sha256_short,
        });
        if (wfRes.missing) {
          wfMissingCount++;
        } else if (!wfRes.valid) {
          wfProblemBundles.push(`${b.id}.md (${wfRes.issues.join('; ')})`);
        }
      }
    }

    const extraDirs = [];
    if (fs.existsSync(adapter.skillsDir)) {
      for (const entry of fs.readdirSync(adapter.skillsDir, { withFileTypes: true })) {
        if ((entry.isDirectory() || entry.isSymbolicLink()) && entry.name.startsWith('uesf-') && !expectedIds.has(entry.name)) {
          extraDirs.push(entry.name);
        }
      }
    }

    const extraWorkflows = [];
    if (adapter.workflowsDir && fs.existsSync(adapter.workflowsDir)) {
      for (const entry of fs.readdirSync(adapter.workflowsDir, { withFileTypes: true })) {
        if ((entry.isFile() || entry.isSymbolicLink()) && /^uesf-.*\.md$/.test(entry.name)) {
          const wfId = entry.name.replace(/\.md$/, '');
          if (!expectedIds.has(wfId)) {
            extraWorkflows.push(entry.name);
          }
        }
      }
    }

    const skillsAbsent = missingCount === distManifest.bundles.length;
    const workflowsAbsent = !adapter.workflowsDir || wfMissingCount === distManifest.bundles.length;

    if (skillsAbsent && workflowsAbsent && legacyHits.length === 0 && extraDirs.length === 0 && extraWorkflows.length === 0) {
      console.log(`CHECK_TARGET=${adapter.name}: NOT_INSTALLED`);
    } else if (
      missingCount === 0 &&
      wfMissingCount === 0 &&
      problemBundles.length === 0 &&
      wfProblemBundles.length === 0 &&
      legacyHits.length === 0 &&
      extraDirs.length === 0 &&
      extraWorkflows.length === 0
    ) {
      console.log(
        `CHECK_TARGET=${adapter.name}: UP_TO_DATE (v${distManifest.version}, SHA256=${distManifest.source_sha256_short})`
      );
    } else {
      const reasons = [];
      if (missingCount > 0) reasons.push(`missing=${missingCount}`);
      if (problemBundles.length > 0) reasons.push(`invalid_or_outdated=${problemBundles.length}`);
      if (wfMissingCount > 0) reasons.push(`missing_workflows=${wfMissingCount}`);
      if (wfProblemBundles.length > 0) reasons.push(`invalid_or_outdated_workflows=${wfProblemBundles.length}`);
      if (legacyHits.length > 0) reasons.push(`legacy_artifacts=${legacyHits.length}`);
      if (extraDirs.length > 0) reasons.push(`stray_uesf_dirs=${extraDirs.join(',')}`);
      if (extraWorkflows.length > 0) reasons.push(`stray_uesf_workflows=${extraWorkflows.join(',')}`);
      console.log(`CHECK_TARGET=${adapter.name}: OUTDATED (${reasons.join(', ')})`);
    }
  }
}

function inspectAdapterDirectory(adapter, dirPath, kind, expectedIds, expectedSha, issues) {
  let installedCount = 0;
  const seenIds = new Set();

  if (fs.existsSync(dirPath)) {
    for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
      const isSkill =
        kind === 'skill' &&
        (entry.isDirectory() || entry.isSymbolicLink()) &&
        entry.name.startsWith('uesf-');
      const isWorkflow =
        kind === 'workflow' &&
        (entry.isFile() || entry.isSymbolicLink()) &&
        /^uesf-.*\.md$/.test(entry.name);
      if (!isSkill && !isWorkflow) continue;

      const bundleId = isWorkflow ? entry.name.replace(/\.md$/, '') : entry.name;
      const targetFile = isSkill
        ? path.join(dirPath, entry.name, 'SKILL.md')
        : path.join(dirPath, entry.name);

      installedCount++;
      seenIds.add(bundleId);

      const res = validateBundleFile(targetFile, {
        kind,
        expectedId: bundleId,
        expectedShortSha: expectedSha,
      });
      if (!res.valid) {
        issues.push({
          type:
            kind === 'skill'
              ? 'INVALID_SKILL_FRONTMATTER_OR_METADATA'
              : 'INVALID_WORKFLOW_FRONTMATTER_OR_METADATA',
          adapter: adapter.name,
          path: targetFile,
          detail: res.issues.join('; '),
        });
      }
      if (expectedIds && !expectedIds.has(bundleId)) {
        issues.push({
          type: kind === 'skill' ? 'STRAY_UESF_SKILL_DIR' : 'STRAY_UESF_WORKFLOW_FILE',
          adapter: adapter.name,
          path: path.join(dirPath, entry.name),
          detail: `Unexpected UESF ${kind} '${entry.name}' not in dist/manifest.json`,
        });
      }
    }
  }

  if (expectedIds) {
    const missingIds = [...expectedIds].filter((id) => !seenIds.has(id));
    if (installedCount > 0 && missingIds.length > 0) {
      issues.push({
        type: kind === 'skill' ? 'INCOMPLETE_SKILL_SET' : 'INCOMPLETE_WORKFLOW_SET',
        adapter: adapter.name,
        path: dirPath,
        detail: `Missing UESF ${kind}s: ${missingIds.join(', ')}`,
      });
    } else if (installedCount === 0) {
      issues.push({
        type: kind === 'skill' ? 'MISSING_SKILLS' : 'MISSING_WORKFLOWS',
        adapter: adapter.name,
        path: dirPath,
        detail:
          kind === 'skill'
            ? 'No UESF skills installed in detected agent directory'
            : 'No UESF workflows installed in detected agent Workflows directory',
      });
    }
  }
}

function collectDoctorIssues(allAdapters, selectedAdapters, distManifest) {
  const issues = [];
  const expectedIds = distManifest ? new Set(distManifest.bundles.map((b) => b.id)) : null;
  const expectedSha = distManifest ? distManifest.source_sha256_short : '';

  for (const leg of findLegacyArtifacts(allAdapters)) {
    issues.push({
      type: 'LEGACY_OR_MANIFEST_ARTIFACT',
      adapter: leg.adapter,
      path: leg.path,
      detail: 'Legacy command/workflow artifact or stray .uesf-manifest.json present',
    });
  }

  for (const adapter of selectedAdapters) {
    inspectAdapterDirectory(adapter, adapter.skillsDir, 'skill', expectedIds, expectedSha, issues);
    if (adapter.workflowsDir) {
      inspectAdapterDirectory(adapter, adapter.workflowsDir, 'workflow', expectedIds, expectedSha, issues);
    }
  }

  return issues;
}

export function runDoctor(options = {}) {
  const userHome = os.homedir();
  const allAdapters = getAgentAdapters(userHome);
  const { selected } = resolveTargetSelection(options.targets, allAdapters, 'auto');
  const distAvailable = fs.existsSync(path.join(REPO_ROOT, 'dist/manifest.json'));
  const { distRoot, distManifest } = distAvailable ? loadDistManifest() : { distRoot: '', distManifest: null };

  let issues = collectDoctorIssues(allAdapters, selected, distManifest);

  if (issues.length > 0 && options.fix) {
    cleanLegacyArtifacts(allAdapters);
    if (distManifest) {
      const affectedNames = new Set(issues.map((i) => i.adapter));
      const installedMap = {};
      for (const adapter of selected) {
        if (affectedNames.has(adapter.name)) {
          syncAdapterTargets(adapter, distRoot, distManifest, Boolean(options.link));
          installedMap[adapter.name] = buildInstalledPathEntry(adapter);
          console.log(`DOCTOR_FIXED_TARGET=${adapter.name} -> ${formatAdapterTargetPaths(adapter)}`);
        }
      }
      if (Object.keys(installedMap).length > 0) {
        writeInstallState(distManifest, installedMap, userHome);
      }
    }
    issues = collectDoctorIssues(allAdapters, selected, distManifest);
  }

  if (issues.length === 0) {
    if (selected.length === 0) {
      console.log(
        `DOCTOR_STATUS=NO_TARGETS_DETECTED (0 supported coding agents detected under ${toPosix(userHome)}; pass --target <agent|all> to inspect specific targets)`
      );
      return;
    }
    console.log(`DOCTOR_STATUS=HEALTHY (0 issues across all detected agents)`);
    return;
  }

  for (const iss of issues) {
    console.log(`DOCTOR_ISSUE=[${iss.adapter}] ${iss.type}: ${iss.detail} (${toPosix(iss.path)})`);
  }
  console.log(
    `DOCTOR_STATUS=UNHEALTHY (${issues.length} issue(s) found; run 'node bin/uesf.mjs doctor --fix' to repair)`
  );
  process.exitCode = 1;
}

function uninstallProjectWiring(projectDirArg) {
  const projPath = path.resolve(projectDirArg);
  const uesfBin = path.join(projPath, '.uesf/bin/uesf.mjs');
  if (pathExistsOrSymlink(uesfBin)) removePathSafely(uesfBin);
  removeDirIfEmpty(path.join(projPath, '.uesf/bin'));

  for (const s of ['sync-snapshot.ps1', 'sync-snapshot.sh']) {
    const sp = path.join(projPath, '.uesf/scripts', s);
    if (pathExistsOrSymlink(sp)) removePathSafely(sp);
  }
  removeDirIfEmpty(path.join(projPath, '.uesf/scripts'));

  const hookPath = path.join(projPath, '.git/hooks/pre-commit');
  if (fs.existsSync(hookPath) && fs.statSync(hookPath).isFile()) {
    const hookText = fs.readFileSync(hookPath, 'utf8');
    if (hookText.includes('UESF Automatic Context Snapshot')) {
      fs.unlinkSync(hookPath);
    }
  }

  removeDirIfEmpty(path.join(projPath, '.uesf/handoffs'));
  console.log(
    `PROJECT_UNINSTALLED=${toPosix(projPath)} (removed UESF automation scripts/hooks; preserved .uesf/ ledgers, .uesf/handoffs/ history, and docs/)`
  );
}

export function runUninstall(options = {}) {
  if (options.project) {
    uninstallProjectWiring(options.project);
    if (!options.explicitTargets) return;
  }

  const userHome = os.homedir();
  const allAdapters = getAgentAdapters(userHome);
  const defaultMode = options.explicitTargets ? 'auto' : 'all';
  const { mode, selected } = resolveTargetSelection(options.targets, allAdapters, defaultMode);

  for (const adapter of selected) {
    let removedCount = 0;
    if (fs.existsSync(adapter.skillsDir)) {
      for (const entry of fs.readdirSync(adapter.skillsDir, { withFileTypes: true })) {
        if ((entry.isDirectory() || entry.isSymbolicLink()) && entry.name.startsWith('uesf-')) {
          if (removePathSafely(path.join(adapter.skillsDir, entry.name))) {
            removedCount++;
          }
        }
      }
    }
    let removedWorkflowCount = 0;
    if (adapter.workflowsDir && fs.existsSync(adapter.workflowsDir)) {
      for (const entry of fs.readdirSync(adapter.workflowsDir, { withFileTypes: true })) {
        if ((entry.isFile() || entry.isSymbolicLink()) && /^uesf-.*\.md$/.test(entry.name)) {
          if (removePathSafely(path.join(adapter.workflowsDir, entry.name))) {
            removedWorkflowCount++;
          }
        }
      }
    }
    const legacyRemoved = cleanLegacyArtifacts([adapter]);
    if (adapter.detect() || removedCount > 0 || removedWorkflowCount > 0 || legacyRemoved.length > 0 || mode === 'explicit') {
      const wfSummary = adapter.workflowsDir ? ` and ${removedWorkflowCount} UESF workflows` : '';
      console.log(
        `UNINSTALLED_TARGET=${adapter.name} (removed ${removedCount} UESF skills${wfSummary}; preserved all non-UESF files)`
      );
    }
  }

  const statePath = getInstallStatePath(userHome);
  if (fs.existsSync(statePath)) {
    if (mode === 'all') {
      fs.unlinkSync(statePath);
      removeDirIfEmpty(path.dirname(statePath));
      console.log(`REMOVED_INSTALL_STATE=${toPosix(statePath)}`);
    } else {
      const state = readInstallState(userHome);
      if (state && state.installed_paths) {
        for (const a of selected) {
          delete state.installed_paths[a.name];
        }
        if (Object.keys(state.installed_paths).length === 0) {
          fs.unlinkSync(statePath);
          removeDirIfEmpty(path.dirname(statePath));
          console.log(`REMOVED_INSTALL_STATE=${toPosix(statePath)}`);
        } else {
          state.updated_at = new Date().toISOString();
          writeLf(statePath, JSON.stringify(state, null, 2) + '\n');
        }
      }
    }
  }
}

// ============================================================================
// 6. CLI ARGUMENT PARSER
// ============================================================================
function parseCliArgs(argv) {
  const args = argv.slice(2);
  let subcommand = 'install';
  let idx = 0;
  if (args[0] && !args[0].startsWith('-')) {
    subcommand = args[0].toLowerCase();
    idx = 1;
  }

  const opts = {
    check: subcommand === 'check',
    fix: false,
    link: false,
    initProject: '',
    project: '',
    targetRoot: '',
    targets: ['auto'],
    explicitTargets: false,
    version: '',
  };

  if (subcommand === 'init-project') {
    if (args[idx] && !args[idx].startsWith('-')) {
      opts.initProject = args[idx++];
    } else {
      opts.initProject = '.';
    }
  }

  for (let i = idx; i < args.length; i++) {
    const a = args[i];
    const lower = a.toLowerCase();
    if (lower === '--check' || lower === '-check') {
      opts.check = true;
    } else if (lower === '--fix' || lower === '-fix') {
      opts.fix = true;
    } else if (lower === '--link' || lower === '-link') {
      opts.link = true;
    } else if (lower === '--init-project' || lower === '-initproject') {
      opts.initProject = args[++i] || '.';
    } else if (lower === '--project' || lower === '-project') {
      opts.project = args[++i] || '.';
    } else if (lower === '--target-root' || lower === '-targetroot') {
      opts.targetRoot = args[++i] || '';
    } else if (lower === '--target' || lower === '--targets' || lower === '-targets') {
      const val = args[++i] || 'auto';
      opts.targets = val.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
      opts.explicitTargets = true;
    } else if (lower === '--version' || lower === '-version' || lower === '--ref') {
      opts.version = args[++i] || '';
    } else if (lower === '--help' || lower === '-h' || subcommand === 'help') {
      console.log([
        `UESF CLI v${FW_VERSION} — Universal Engineering Skills Framework`,
        'Usage:',
        '  npx github:m-ebrahimzadeh/uesf install [--version <ver>] [--target <auto|all|name>] [--link]',
        '  npx github:m-ebrahimzadeh/uesf update [--version <ver>] [--target <auto|all|name>] [--link]',
        '  npx github:m-ebrahimzadeh/uesf check [--target <auto|all|name>]',
        '  npx github:m-ebrahimzadeh/uesf doctor [--fix] [--target <auto|all|name>]',
        '  npx github:m-ebrahimzadeh/uesf uninstall [--target <agent|all>] [--project <path>]',
        '  npx github:m-ebrahimzadeh/uesf init-project [path]',
        '  node bin/uesf.mjs <install|update|check|doctor|uninstall|init-project|sync-snapshot|build> [options]',
      ].join('\n'));
      process.exit(0);
    }
  }

  return { subcommand, opts };
}

const isMain = (() => {
  if (!process.argv[1]) return false;
  try {
    return fs.realpathSync(process.argv[1]) === fs.realpathSync(__filename);
  } catch {
    return path.resolve(process.argv[1]) === __filename;
  }
})();

if (isMain) {
  const { subcommand, opts } = parseCliArgs(process.argv);
  if (subcommand === 'sync-snapshot') {
    runSyncSnapshot(opts.targetRoot);
  } else if (subcommand === 'build' || subcommand === 'build-dist') {
    runBuildDist();
  } else if (subcommand === 'init-project') {
    runInitProject(opts.initProject || '.');
  } else if (subcommand === 'install' || subcommand === 'update') {
    runInstallOrUpdate(opts, subcommand);
  } else if (subcommand === 'check') {
    runCheck(opts);
  } else if (subcommand === 'doctor') {
    runDoctor(opts);
  } else if (subcommand === 'uninstall') {
    runUninstall(opts);
  } else {
    throw new Error(
      `Unknown subcommand '${subcommand}'. Use install, update, check, doctor, uninstall, init-project, sync-snapshot, or build.`
    );
  }
}
