'use client';

import { useReducedMotion } from 'framer-motion';
import type { ProjectVisualKind } from '@/types';

/**
 * Per-project animated schematics, drawn as SVG — not screenshots.
 * Each one is a working diagram of how the project actually functions:
 * value flowing through contracts, a scanner sweeping traffic, blocks
 * chaining, bubbles drifting, packets routing around a firewall.
 * Animations are SMIL-based and fully disabled under reduced motion.
 */

interface VisualProps {
  animate: boolean;
}

const frame = 'h-full w-full';

/* ---------------- contracts: wallet → commission → escrow ---------- */

function ContractsVisual({ animate }: VisualProps) {
  const boxes = [
    { x: 16, label: 'Wallet', sub: 'Manager.sol' },
    { x: 152, label: 'Commission', sub: 'Core.sol' },
    { x: 288, label: 'Pay', sub: 'Escrow.sol' },
  ];
  return (
    <svg viewBox="0 0 400 260" className={frame} aria-hidden="true">
      {boxes.map((b) => (
        <g key={b.label}>
          <rect x={b.x + 5} y={95} width={96} height={70} className="fill-ink" />
          <rect x={b.x} y={90} width={96} height={70} className="fill-acid stroke-ink" strokeWidth="3" />
          <text x={b.x + 48} y={120} textAnchor="middle" className="fill-ink font-mono" fontSize="13" fontWeight="bold">
            {b.label}
          </text>
          <text x={b.x + 48} y={140} textAnchor="middle" className="fill-ink font-mono" fontSize="10">
            {b.sub}
          </text>
        </g>
      ))}
      {/* Flow arrows */}
      <line x1={112} y1={125} x2={152} y2={125} className="stroke-ink" strokeWidth="3" strokeDasharray="6 4" />
      <line x1={248} y1={125} x2={288} y2={125} className="stroke-ink" strokeWidth="3" strokeDasharray="6 4" />
      {/* ETH packet traveling the pipeline */}
      <circle r="7" cx={64} cy={125} className="fill-shock stroke-ink" strokeWidth="2">
        {animate && <animate attributeName="cx" values="64;200;336;336" keyTimes="0;0.4;0.8;1" dur="3s" repeatCount="indefinite" />}
        {animate && <animate attributeName="opacity" values="1;1;1;0" keyTimes="0;0.4;0.8;1" dur="3s" repeatCount="indefinite" />}
      </circle>
      {/* Event log line */}
      <text x={20} y={210} className="fill-ink font-mono" fontSize="11">
        emit CommissionPaid(affiliate, amount)
        {animate && <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.8;1" dur="3s" repeatCount="indefinite" />}
      </text>
      <rect x={20} y={225} width={150} height={20} className="fill-term" />
      <text x={28} y={239} className="fill-ink font-mono" fontSize="11" fontWeight="bold">
        13 tx · 0 reverts ✓
      </text>
    </svg>
  );
}

/* ---------------- anomaly: traffic trace + sweeping scanner -------- */

function AnomalyVisual({ animate }: VisualProps) {
  return (
    <svg viewBox="0 0 400 260" className={frame} aria-hidden="true">
      {/* Grid */}
      {[40, 80, 120, 160, 200].map((y) => (
        <line key={y} x1={16} y1={y} x2={384} y2={y} className="stroke-ink/20" strokeWidth="1" />
      ))}
      {/* Traffic baseline */}
      <polyline
        points="16,170 56,160 96,175 136,150 176,165 216,60 256,168 296,155 336,75 384,160"
        fill="none"
        className="stroke-ink"
        strokeWidth="3"
      />
      {/* Anomaly spikes */}
      {[
        { x: 216, y: 60 },
        { x: 336, y: 75 },
      ].map((p) => (
        <g key={p.x}>
          <circle cx={p.x} cy={p.y} r="6" className="fill-danger stroke-ink" strokeWidth="2">
            {animate && <animate attributeName="r" values="5;9;5" dur="1.2s" repeatCount="indefinite" />}
          </circle>
          <text x={p.x + 10} y={p.y - 8} className="fill-danger font-mono" fontSize="10" fontWeight="bold">
            FLAGGED
          </text>
        </g>
      ))}
      {/* Scanner sweep */}
      <rect width="3" y={30} height={185} className="fill-term">
        {animate && <animate attributeName="x" values="16;384;16" dur="5s" repeatCount="indefinite" />}
      </rect>
      <text x={20} y={245} className="fill-ink font-mono" fontSize="11">
        model.predict(packet_features) → {'{'}normal: 0.97, intrusion: 0.03{'}'}
      </text>
    </svg>
  );
}

/* ---------------- protocol: blocks chaining ------------------------ */

function ProtocolVisual({ animate }: VisualProps) {
  const blocks = [
    { x: 24, hash: '0x3fa1…' },
    { x: 152, hash: '0x9bc4…' },
    { x: 280, hash: '0xe77d…' },
  ];
  return (
    <svg viewBox="0 0 400 260" className={frame} aria-hidden="true">
      {blocks.map((b, i) => (
        <g key={b.hash}>
          <rect x={b.x + 5} y={85} width={96} height={90} className="fill-ink" />
          <rect x={b.x} y={80} width={96} height={90} className={i === 2 ? 'fill-shock stroke-ink' : 'fill-paper stroke-ink'} strokeWidth="3" />
          <text x={b.x + 48} y={105} textAnchor="middle" className={`font-mono ${i === 2 ? 'fill-paper' : 'fill-ink'}`} fontSize="11" fontWeight="bold">
            BLOCK {i + 7}
          </text>
          <line x1={b.x + 12} y1={115} x2={b.x + 84} y2={115} className={i === 2 ? 'stroke-paper' : 'stroke-ink'} strokeWidth="2" />
          <text x={b.x + 48} y={135} textAnchor="middle" className={`font-mono ${i === 2 ? 'fill-paper' : 'fill-ink'}`} fontSize="10">
            {b.hash}
          </text>
          <text x={b.x + 48} y={155} textAnchor="middle" className={`font-mono ${i === 2 ? 'fill-paper' : 'fill-ink/70'}`} fontSize="9">
            prev: {i === 0 ? '0x0000…' : blocks[i - 1].hash}
          </text>
        </g>
      ))}
      {/* Chain links with flowing dashes */}
      {[120, 248].map((x) => (
        <line key={x} x1={x} y1={125} x2={x + 32} y2={125} className="stroke-ink" strokeWidth="4" strokeDasharray="8 6">
          {animate && <animate attributeName="stroke-dashoffset" values="28;0" dur="1s" repeatCount="indefinite" />}
        </line>
      ))}
      <text x={24} y={225} className="fill-ink font-mono" fontSize="11">
        consensus: verified · finality: probabilistic
      </text>
      <rect x={24} y={235} width={120} height={3} className="fill-acid" />
    </svg>
  );
}

/* ---------------- bubbles: animated scatter ------------------------ */

function BubblesVisual({ animate }: VisualProps) {
  const bubbles = [
    { cx: 70, cy: 180, r: 14, cls: 'fill-acid', dur: '4s' },
    { cx: 130, cy: 120, r: 22, cls: 'fill-shock', dur: '5s' },
    { cx: 200, cy: 150, r: 10, cls: 'fill-cyber', dur: '3.5s' },
    { cx: 260, cy: 90, r: 26, cls: 'fill-violet', dur: '6s' },
    { cx: 320, cy: 140, r: 16, cls: 'fill-term', dur: '4.5s' },
    { cx: 350, cy: 190, r: 8, cls: 'fill-ink', dur: '3s' },
  ];
  return (
    <svg viewBox="0 0 400 260" className={frame} aria-hidden="true">
      {/* Axes */}
      <line x1={40} y1={20} x2={40} y2={220} className="stroke-ink" strokeWidth="3" />
      <line x1={40} y1={220} x2={384} y2={220} className="stroke-ink" strokeWidth="3" />
      <text x={46} y={32} className="fill-ink font-mono" fontSize="10">
        life_expectancy
      </text>
      <text x={300} y={244} className="fill-ink font-mono" fontSize="10">
        gdp_per_capita →
      </text>
      {bubbles.map((b) => (
        <circle key={b.cx} cx={b.cx} cy={b.cy} r={b.r} className={`${b.cls} stroke-ink`} strokeWidth="2.5" opacity="0.9">
          {animate && (
            <animate attributeName="cy" values={`${b.cy};${b.cy - 14};${b.cy}`} dur={b.dur} repeatCount="indefinite" />
          )}
          {animate && <animate attributeName="r" values={`${b.r};${b.r + 3};${b.r}`} dur={b.dur} repeatCount="indefinite" />}
        </circle>
      ))}
      {/* Year ticker */}
      <text x={46} y={210} className="fill-ink/40 font-display" fontSize="40">
        1960→2020
        {animate && <animate attributeName="opacity" values="0.25;0.6;0.25" dur="4s" repeatCount="indefinite" />}
      </text>
    </svg>
  );
}

/* ---------------- network: topology + firewall ---------------------- */

function NetworkVisual({ animate }: VisualProps) {
  const hosts = [
    { x: 60, y: 50, label: 'node-1' },
    { x: 60, y: 200, label: 'node-2' },
    { x: 340, y: 50, label: 'node-3' },
    { x: 340, y: 200, label: 'attacker', hostile: true },
  ];
  return (
    <svg viewBox="0 0 400 260" className={frame} aria-hidden="true">
      {/* Edges */}
      {hosts.map((h) => (
        <line key={h.label} x1={200} y1={125} x2={h.x} y2={h.y} className="stroke-ink" strokeWidth="2.5" strokeDasharray="5 4" />
      ))}
      {/* Firewall on the attacker edge */}
      <g transform="translate(262,152) rotate(28)">
        <rect x={-16} y={-10} width={32} height={20} className="fill-danger stroke-ink" strokeWidth="2.5" />
        <line x1={-16} y1={0} x2={16} y2={0} className="stroke-ink" strokeWidth="1.5" />
        <line x1={-5} y1={-10} x2={-5} y2={0} className="stroke-ink" strokeWidth="1.5" />
        <line x1={6} y1={0} x2={6} y2={10} className="stroke-ink" strokeWidth="1.5" />
      </g>
      {/* Router */}
      <rect x={172} y={100} width={56} height={50} className="fill-acid stroke-ink" strokeWidth="3" />
      <text x={200} y={130} textAnchor="middle" className="fill-ink font-mono" fontSize="11" fontWeight="bold">
        router
      </text>
      {/* Hosts */}
      {hosts.map((h) => (
        <g key={h.label}>
          <circle cx={h.x} cy={h.y} r="20" className={`${h.hostile ? 'fill-danger' : 'fill-term'} stroke-ink`} strokeWidth="3" />
          <text x={h.x} y={h.y + (h.y < 125 ? -28 : 38)} textAnchor="middle" className="fill-ink font-mono" fontSize="10" fontWeight="bold">
            {h.label}
          </text>
        </g>
      ))}
      {/* Good packet: node-1 → router → node-3 */}
      <circle r="5" className="fill-cyber stroke-ink" strokeWidth="1.5">
        {animate && <animate attributeName="cx" values="60;200;340" keyTimes="0;0.5;1" dur="2.4s" repeatCount="indefinite" />}
        {animate && <animate attributeName="cy" values="50;125;50" keyTimes="0;0.5;1" dur="2.4s" repeatCount="indefinite" />}
      </circle>
      {/* Hostile packet: attacker → firewall → dropped */}
      <circle r="5" className="fill-danger stroke-ink" strokeWidth="1.5">
        {animate && <animate attributeName="cx" values="340;268;268" keyTimes="0;0.6;1" dur="2s" repeatCount="indefinite" />}
        {animate && <animate attributeName="cy" values="200;156;156" keyTimes="0;0.6;1" dur="2s" repeatCount="indefinite" />}
        {animate && <animate attributeName="opacity" values="1;1;0" keyTimes="0;0.6;1" dur="2s" repeatCount="indefinite" />}
      </circle>
      <text x={20} y={245} className="fill-ink font-mono" fontSize="11">
        pfSense: block attacker → DROP ✓ · vlan_segmented · wireguard_up
      </text>
    </svg>
  );
}

/* ---------------- moderation: RallyPoint AI toxicity gate ----------- */

function ModerationVisual({ animate }: VisualProps) {
  const tiers = [
    { x: 130, label: 'T1', cls: 'fill-term' },
    { x: 180, label: 'T2', cls: 'fill-acid' },
    { x: 230, label: 'T3', cls: 'fill-cyber' },
    { x: 280, label: 'T4', cls: 'fill-danger' },
  ];
  return (
    <svg viewBox="0 0 400 260" className={frame} aria-hidden="true">
      {/* Incoming post */}
      <rect x={16} y={100} width={84} height={50} className="fill-paper stroke-ink" strokeWidth="3" />
      <text x={58} y={122} textAnchor="middle" className="fill-ink font-mono" fontSize="10" fontWeight="bold">
        new post
      </text>
      <text x={58} y={138} textAnchor="middle" className="fill-ink/70 font-mono" fontSize="9">
        user_4821
      </text>

      {/* Claude moderation pipeline */}
      <rect x={118} y={75} width={212} height={100} fill="none" className="stroke-ink" strokeWidth="3" strokeDasharray="7 5" />
      <text x={224} y={66} textAnchor="middle" className="fill-ink font-mono" fontSize="10" fontWeight="bold">
        claude moderation — 4-tier toxicity
      </text>
      {tiers.map((t) => (
        <g key={t.label}>
          <rect x={t.x} y={100} width={36} height={50} className={`${t.cls} stroke-ink`} strokeWidth="2.5" />
          <text x={t.x + 18} y={130} textAnchor="middle" className="fill-ink font-mono" fontSize="11" fontWeight="bold">
            {t.label}
          </text>
        </g>
      ))}

      {/* Outcomes */}
      <rect x={345} y={62} width={44} height={40} className="fill-term stroke-ink" strokeWidth="2.5" />
      <text x={367} y={86} textAnchor="middle" className="fill-ink font-mono" fontSize="9" fontWeight="bold">
        feed
      </text>
      <rect x={345} y={150} width={44} height={40} className="fill-danger stroke-ink" strokeWidth="2.5" />
      <text x={367} y={174} textAnchor="middle" className="fill-ink font-mono" fontSize="9" fontWeight="bold">
        queue
      </text>

      {/* Animated post packet through the pipeline → feed */}
      <circle r="6" cx={58} cy={125} className="fill-violet stroke-ink" strokeWidth="2">
        {animate && (
          <animate attributeName="cx" values="58;224;224;367" keyTimes="0;0.45;0.6;1" dur="3.2s" repeatCount="indefinite" />
        )}
        {animate && (
          <animate attributeName="cy" values="125;125;125;82" keyTimes="0;0.45;0.6;1" dur="3.2s" repeatCount="indefinite" />
        )}
      </circle>

      <text x={20} y={225} className="fill-ink font-mono" fontSize="11">
        score: {'{'}toxicity: 0.04{'}'} → approved · rate_limit: ok · rbac: member
      </text>
      <rect x={20} y={235} width={140} height={3} className="fill-violet" />
    </svg>
  );
}

/* ---------------- orbit: Launchpad 5 tools around the BI graph ------ */

function OrbitVisual({ animate }: VisualProps) {
  const tools = [
    { x: 200, y: 38, label: 'quote2cash', cls: 'fill-acid' },
    { x: 340, y: 100, label: 'receipts', cls: 'fill-shock' },
    { x: 300, y: 205, label: 'contracts', cls: 'fill-cyber' },
    { x: 100, y: 205, label: 'compliance', cls: 'fill-violet' },
    { x: 60, y: 100, label: 'growth', cls: 'fill-term' },
  ];
  return (
    <svg viewBox="0 0 400 260" className={frame} aria-hidden="true">
      {/* Spokes */}
      {tools.map((t) => (
        <line key={t.label} x1={200} y1={125} x2={t.x} y2={t.y} className="stroke-ink" strokeWidth="2.5" strokeDasharray="6 5">
          {animate && <animate attributeName="stroke-dashoffset" values="22;0" dur="1.4s" repeatCount="indefinite" />}
        </line>
      ))}

      {/* Central BI graph hub */}
      <rect x={148} y={98} width={104} height={54} className="fill-ink stroke-ink" strokeWidth="3" />
      <text x={200} y={120} textAnchor="middle" className="fill-acid font-mono" fontSize="10" fontWeight="bold">
        firestore
      </text>
      <text x={200} y={136} textAnchor="middle" className="fill-term font-mono" fontSize="9">
        bi_graph
      </text>

      {/* Tool nodes */}
      {tools.map((t) => (
        <g key={t.label}>
          <rect x={t.x - 42} y={t.y - 16} width={84} height={32} className={`${t.cls} stroke-ink`} strokeWidth="2.5" />
          <text x={t.x} y={t.y + 4} textAnchor="middle" className="fill-ink font-mono" fontSize="9" fontWeight="bold">
            {t.label}
          </text>
        </g>
      ))}

      {/* LLM packets orbiting hub → tools */}
      <circle r="5" className="fill-paper stroke-ink" strokeWidth="1.5">
        {animate && <animate attributeName="cx" values="200;200;200" keyTimes="0;0.5;1" dur="2.6s" repeatCount="indefinite" />}
        {animate && <animate attributeName="cy" values="125;38;125" keyTimes="0;0.5;1" dur="2.6s" repeatCount="indefinite" />}
      </circle>
      <circle r="5" className="fill-paper stroke-ink" strokeWidth="1.5">
        {animate && <animate attributeName="cx" values="200;340;200" keyTimes="0;0.5;1" dur="3.4s" repeatCount="indefinite" />}
        {animate && <animate attributeName="cy" values="125;100;125" keyTimes="0;0.5;1" dur="3.4s" repeatCount="indefinite" />}
      </circle>
      <circle r="5" className="fill-paper stroke-ink" strokeWidth="1.5">
        {animate && <animate attributeName="cx" values="200;100;200" keyTimes="0;0.5;1" dur="3s" repeatCount="indefinite" />}
        {animate && <animate attributeName="cy" values="125;205;125" keyTimes="0;0.5;1" dur="3s" repeatCount="indefinite" />}
      </circle>

      <text x={20} y={245} className="fill-ink font-mono" fontSize="11">
        vertex_ai + gemini pipelines · 2× hackathon track winner ★
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */

const VISUALS: Record<ProjectVisualKind, (p: VisualProps) => JSX.Element> = {
  contracts: ContractsVisual,
  anomaly: AnomalyVisual,
  protocol: ProtocolVisual,
  bubbles: BubblesVisual,
  network: NetworkVisual,
  moderation: ModerationVisual,
  orbit: OrbitVisual,
};

export default function ProjectVisual({ kind }: { kind: ProjectVisualKind }) {
  const prefersReducedMotion = useReducedMotion();
  const Visual = VISUALS[kind];

  return (
    <div className="graph-paper h-full w-full border-3 border-ink bg-paper p-3">
      <Visual animate={!prefersReducedMotion} />
    </div>
  );
}
