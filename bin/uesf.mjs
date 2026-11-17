#!/usr/bin/env node
/**
 * UESF Canonical Cross-Platform CLI Engine (DEC-026)
 * Zero external dependencies. Consolidates install, check, sync-snapshot, and build.
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
const FW_VERSION = '0.6.3';

function readNormalized(filePath) {
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) return '';
  return fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n').trim();
}

function writeLf(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content.replace(/\r\n/g, '\n'), { encoding: 'utf8' });
}

function sha256Hex(text) {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex').toLowerCase();
}

function walkMdFiles(dirPath, rootDir, excludeDistAndSnap = false) {
  const results = [];
  if (!fs.existsSync(dirPath)) return results;
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const full = path.join(dirPath, entry.name);
    const rel = path.relative(rootDir, full).replace(/\\/g, '/');
    if (entry.isDirectory()) {
      if (entry.name === '.git') continue;
      if (excludeDistAndSnap && entry.name === 'dist') continue;
      results.push(...walkMdFiles(full, rootDir, excludeDistAndSnap));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      if (excludeDistAndSnap && entry.name === 'CONTEXT_SNAPSHOT.md') continue;
      results.push(rel);
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
  const lastUpd = updMatch ? updMatch[1].trim() : '2026-11-17';

  const kmText = readNormalized(path.join(targetRoot, kmPath));
  const kmRowRegex = /^\| `([^`]+)` \| `([^`]+)` \|[^|]*\|[^|]*\| `([^`]+)` \|/gm;
  const kmRows = [...kmText.matchAll(kmRowRegex)].map((m) => ({
    id: m[1],
    path: m[2],
    version: m[3],
  }));
  const kmPaths = kmRows.map((r) => r.path);

  const relMd = sortPathsCaseInsensitive(walkMdFiles(targetRoot, targetRoot, true));
  const missingOnDisk = kmPaths.filter((p) => !relMd.includes(p));
  const extraOnDisk = relMd.filter((p) => !kmPaths.includes(p));

  const verMismatches = [];
  for (const r of kmRows) {
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
  if (extraOnDisk.length > 0) driftAlerts.push(`UNINDEXED_MD_ON_DISK: ${extraOnDisk.join(', ')}`);
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
    { name: 'init',          kind: 'workflow', source: 'workflows/INIT_WORKFLOW.md',       autonomy: 'A0 -> A1 on Approval', desc: 'UESF Project Initialization Workflow (/uesf:init - A0 Audit & .uesf/ Scaffold)', templates: ['templates/PROJECT_EXTENSION_TEMPLATE.md'] },
    { name: 'handoff',       kind: 'workflow', source: 'workflows/HANDOFF_WORKFLOW.md',    autonomy: 'A0/A1',                desc: 'UESF Session-Exit Handoff Workflow (/uesf:handoff - Package Work & Evidence)', templates: ['templates/HANDOFF_PACKAGE_TEMPLATE.md', 'templates/EVIDENCE_PACKAGE_TEMPLATE.md'] },
    { name: 'status',        kind: 'workflow', source: 'workflows/STATUS_WORKFLOW.md',     autonomy: 'A0 (Read-Only)',       desc: 'UESF Unified Session-Entry & Context Reconstruction Workflow (/uesf:status)', templates: [] },
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
        tLines.push('', `### Template Source: \`${tp}\``, readNormalized(path.join(REPO_ROOT, tp)));
      }
      extraSections += tLines.join('\n');
    }

    if (b.name === 'init') {
      const initWiringBlock = [
        '',
        '---',
        '## Embedded Project Automation Wiring (`.uesf/bin/uesf.mjs`, `.uesf/scripts/` & `.git/hooks/pre-commit`)',
        'After creating `.uesf/EXTENSION.md`, `.uesf/KNOWLEDGE_MAP.md`, `.uesf/ACTIVE_TASKS.md`, and `.uesf/DECISION_LOG.md` in Stage 2, wire the standalone snapshot engine and Git pre-commit hook and generate the initial `.uesf/CONTEXT_SNAPSHOT.md` by executing ONE of the following commands in the target project root:',
        '',
        '1. **Fast Local Wiring (Preferred when `.uesf-manifest.json` exists in your agent skills folder)**:',
        '   Read `uesf_repo_path` from `.uesf-manifest.json` (in `~/.gemini/antigravity/skills/`, `~/.gemini/skills/`, `~/.claude/skills/`, or `~/.codex/skills/`) and run:',
        '   ```bash',
        '   node "<uesf_repo_path>/bin/uesf.mjs" init-project .',
        '   ```',
        '2. **Zero-Clone Fallback (Via GitHub `npx`)**:',
        '   ```bash',
        '   npx --yes github:m-ebrahimzadeh/uesf init-project .',
        '   ```',
        'Both commands atomically install `.uesf/bin/uesf.mjs`, `.uesf/scripts/sync-snapshot.ps1`, `.uesf/scripts/sync-snapshot.sh`, and `.git/hooks/pre-commit`, and automatically generate `.uesf/CONTEXT_SNAPSHOT.md`.',
      ].join('\n');
      extraSections += initWiringBlock;
    }

    const compiledBody = [
      '> **NON-AUTHORITATIVE COMPILED UESF BUNDLE — DO NOT EDIT MANUALLY**',
      `> * **Bundle ID**: \`${skillId}\` (\`/uesf:${b.name}\`)`,
      `> * **Canonical Source**: \`${b.source}\` (\`uesf@v${FW_VERSION}\`)`,
      `> * **Source-SHA256**: \`${sourceHashFull}\` (\`${sourceHashShort}\`)`,
      `> * **Activation Banner Rule**: Begin your first response with: \`**[UESF v${FW_VERSION} | Active: ${skillId} | Autonomy: ${b.autonomy}]**\``,
      '',
      coreInvariantsBlock,
      '',
      '---',
      `## Canonical Specification (\`${b.source}\`)`,
      '',
      srcText + extraSections,
    ].join('\n') + '\n';

    const skillRelPath = `dist/skills/${skillId}/SKILL.md`;
    const skillContent = [
      '---',
      `name: ${skillId}`,
      `description: ${b.desc}`,
      `version: ${FW_VERSION}`,
      '---',
      '',
      compiledBody.trimEnd(),
      '',
    ].join('\n');
    writeLf(path.join(REPO_ROOT, skillRelPath), skillContent);

    const cmdRelPath = `dist/commands/uesf/${b.name}.md`;
    writeLf(path.join(REPO_ROOT, cmdRelPath), compiledBody);

    const tomlRelPath = `dist/gemini-cli/uesf/${b.name}.toml`;
    const escapedBody = compiledBody.replace(/\\/g, '\\\\').replace(/"""/g, '\\"\\"\\"');
    const tomlContent = [
      `# UESF Compiled Gemini CLI Command: /uesf:${b.name} (v${FW_VERSION} | Source-SHA256: ${sourceHashShort})`,
      `description = "${b.desc}"`,
      'prompt = """',
      escapedBody.trimEnd(),
      '"""',
      '',
    ].join('\n');
    writeLf(path.join(REPO_ROOT, tomlRelPath), tomlContent);

    manifestBundles.push({
      id: skillId,
      command: `/uesf:${b.name}`,
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

  const hookSrc = path.join(REPO_ROOT, 'scripts/hooks/pre-commit');
  const projHooks = path.join(projPath, '.git/hooks');
  if (fs.existsSync(projHooks) && fs.existsSync(hookSrc)) {
    const dstH = path.join(projHooks, 'pre-commit');
    fs.copyFileSync(hookSrc, dstH);
    try { fs.chmodSync(dstH, 0o755); } catch {}
  }
  console.log(`PROJECT_HOOK_WIRED=${projPath.replace(/\\/g, '/')}`);

  if (fs.existsSync(path.join(projPath, '.uesf/EXTENSION.md'))) {
    runSyncSnapshot(projPath);
  }
}

// ============================================================================
// 4. INSTALL & CHECK COMMANDS
// ============================================================================
export function runInstallOrCheck(options = {}) {
  const {
    check = false,
    link = false,
    initProject = '',
    targets = ['auto'],
    explicitTargets = false,
    version = '',
  } = options;

  const distRoot = path.join(REPO_ROOT, 'dist');
  const manifestPath = path.join(distRoot, 'manifest.json');
  if (!fs.existsSync(manifestPath)) {
    throw new Error('dist/manifest.json not found. Run `node bin/uesf.mjs build` first.');
  }
  const distManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  // Handle explicit --version selection if different from current bundle version
  if (version && !check) {
    const cleanVer = version.replace(/^v/i, '');
    if (cleanVer !== distManifest.version && version !== distManifest.version) {
      const refCandidate = version.startsWith('v') || /^[0-9a-f]{7,40}$/i.test(version)
        ? version
        : `v${version}`;
      console.log(
        `VERSION_REDIRECT=Requested UESF ${version} (local bundle is v${distManifest.version}); delegating to npx github:m-ebrahimzadeh/uesf#${refCandidate}`
      );
      const npxCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
      const forwardArgs = ['--yes', `github:m-ebrahimzadeh/uesf#${refCandidate}`, 'install'];
      if (link) forwardArgs.push('--link');
      if (initProject) forwardArgs.push('--init-project', initProject);
      if (targets.length > 0 && !(targets.length === 1 && targets[0] === 'auto')) {
        forwardArgs.push('--target', targets.join(','));
      }
      const res = spawnSync(npxCmd, forwardArgs, { stdio: 'inherit', shell: process.platform === 'win32' });
      process.exit(res.status ?? 1);
    }
  }

  // Optional downstream project hook & script wiring
  if (initProject && !check) {
    runInitProject(initProject);
    if (!explicitTargets) return;
  }

  // 1. Install Git pre-commit hook if inside UESF repo
  const gitHooksDir = path.join(REPO_ROOT, '.git/hooks');
  const hookSrc = path.join(REPO_ROOT, 'scripts/hooks/pre-commit');
  if (fs.existsSync(gitHooksDir) && fs.existsSync(hookSrc) && !check) {
    const hookDst = path.join(gitHooksDir, 'pre-commit');
    fs.copyFileSync(hookSrc, hookDst);
    try { fs.chmodSync(hookDst, 0o755); } catch {}
    console.log('HOOK_INSTALLED=.git/hooks/pre-commit');
  }

  const userHome = os.homedir();
  const agentTargets = [
    { name: 'antigravity', baseDir: path.join(userHome, '.gemini/antigravity'), skillsDir: path.join(userHome, '.gemini/antigravity/skills'), cmdDir: '', format: 'md' },
    { name: 'gemini-cli',  baseDir: path.join(userHome, '.gemini'),             skillsDir: path.join(userHome, '.gemini/skills'),             cmdDir: path.join(userHome, '.gemini/commands/uesf'), format: 'toml' },
    { name: 'claude-code', baseDir: path.join(userHome, '.claude'),             skillsDir: path.join(userHome, '.claude/skills'),             cmdDir: path.join(userHome, '.claude/commands/uesf'), format: 'md' },
    { name: 'codex',       baseDir: path.join(userHome, '.codex'),              skillsDir: path.join(userHome, '.codex/skills'),              cmdDir: '', format: 'md' },
    { name: 'kilocode',    baseDir: path.join(userHome, '.kilocode'),           skillsDir: '',                                                 cmdDir: path.join(userHome, '.kilocode/workflows/uesf'), format: 'md' },
    { name: 'cline',       baseDir: path.join(userHome, 'Documents/Cline'),     skillsDir: '',                                                 cmdDir: path.join(userHome, 'Documents/Cline/Workflows/uesf'), format: 'md' },
  ];

  for (const t of agentTargets) {
    const shouldProcess =
      targets.includes('all') ||
      targets.includes(t.name) ||
      (targets.includes('auto') && fs.existsSync(t.baseDir));
    if (!shouldProcess) continue;

    const markerDir = t.skillsDir || t.cmdDir;
    const installedManifestPath = path.join(markerDir, '.uesf-manifest.json');

    if (check) {
      if (!fs.existsSync(installedManifestPath)) {
        console.log(`CHECK_TARGET=${t.name}: NOT_INSTALLED`);
      } else {
        const inst = JSON.parse(fs.readFileSync(installedManifestPath, 'utf8'));
        if (
          inst.version === distManifest.version &&
          inst.source_sha256 === distManifest.source_sha256
        ) {
          console.log(
            `CHECK_TARGET=${t.name}: UP_TO_DATE (v${inst.version}, SHA256=${inst.source_sha256_short})`
          );
        } else {
          console.log(
            `CHECK_TARGET=${t.name}: OUTDATED (installed v${inst.version} / ${inst.source_sha256_short} vs dist v${distManifest.version} / ${distManifest.source_sha256_short})`
          );
        }
      }
      continue;
    }

    if (t.skillsDir) {
      fs.mkdirSync(t.skillsDir, { recursive: true });
      for (const entry of fs.readdirSync(t.skillsDir, { withFileTypes: true })) {
        if ((entry.isDirectory() || entry.isSymbolicLink()) && entry.name.startsWith('uesf-')) {
          fs.rmSync(path.join(t.skillsDir, entry.name), { recursive: true, force: true });
        }
      }
      for (const b of distManifest.bundles) {
        const srcSkillDir = path.join(distRoot, 'skills', b.id);
        const dstSkillDir = path.join(t.skillsDir, b.id);
        if (link) {
          fs.symlinkSync(
            srcSkillDir,
            dstSkillDir,
            process.platform === 'win32' ? 'junction' : 'dir'
          );
        } else {
          fs.cpSync(srcSkillDir, dstSkillDir, { recursive: true, force: true });
        }
      }
    }

    if (t.cmdDir) {
      if (fs.existsSync(t.cmdDir)) fs.rmSync(t.cmdDir, { recursive: true, force: true });
      fs.mkdirSync(t.cmdDir, { recursive: true });
      const srcSubDir =
        t.format === 'toml'
          ? path.join(distRoot, 'gemini-cli/uesf')
          : path.join(distRoot, 'commands/uesf');
      for (const f of fs.readdirSync(srcSubDir)) {
        fs.copyFileSync(path.join(srcSubDir, f), path.join(t.cmdDir, f));
      }
    }

    const savedManifest = {
      ...distManifest,
      uesf_repo_path: REPO_ROOT.replace(/\\/g, '/'),
    };
    writeLf(installedManifestPath, JSON.stringify(savedManifest, null, 2) + '\n');
    console.log(
      `INSTALLED_TARGET=${t.name} (v${distManifest.version}, SHA256=${distManifest.source_sha256_short})`
    );
  }

  if (!check && !initProject) {
    console.log('');
    console.log(`--- UESF v${distManifest.version} QUICKSTART ---`);
    console.log('1. Onboard any project:  Open project in your agent and run /uesf:init (or @uesf-init)');
    console.log('2. Resume any session:   Run /uesf:status (or @uesf-status)');
    console.log('3. Brainstorm a feature: Run /uesf:discovery (or @uesf-discovery) [A0 Read-Only]');
    console.log('4. Check update status:  node bin/uesf.mjs check (or npx github:m-ebrahimzadeh/uesf check)');
  }
}

// ============================================================================
// 5. CLI ARGUMENT PARSER
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
    link: false,
    initProject: '',
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
    } else if (lower === '--link' || lower === '-link') {
      opts.link = true;
    } else if (lower === '--init-project' || lower === '-initproject') {
      opts.initProject = args[++i] || '.';
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
        '  npx github:m-ebrahimzadeh/uesf init-project [path]',
        '  npx github:m-ebrahimzadeh/uesf check',
        '  node bin/uesf.mjs <install|init-project|check|sync-snapshot|build> [options]',
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
  } else if (subcommand === 'install' || subcommand === 'check') {
    runInstallOrCheck(opts);
  } else {
    throw new Error(`Unknown subcommand '${subcommand}'. Use install, init-project, check, sync-snapshot, or build.`);
  }
}
