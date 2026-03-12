/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  FileText, 
  History, 
  Wallet, 
  X, 
  ChevronDown, 
  CheckCircle2,
  ShieldAlert,
  TrendingUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Contract {
  asset: string;
  trigger: string;
  notional: string;
  yield: number;
  status: 'Active' | 'Pending' | 'High Risk';
  event: string;
}

// --- Constants ---
const CONTRACTS: Contract[] = [
  { asset: 'FC Bayern Munich', trigger: 'Serie A Relegation', notional: '€45,000,000', yield: 9.2, status: 'Active', event: 'rel_sa' },
  { asset: 'Manchester United', trigger: 'Premier League Drop', notional: '€30,000,000', yield: 7.8, status: 'Pending', event: 'rel_pl' },
  { asset: 'Valencia CF', trigger: 'La Liga Relegation', notional: '€18,000,000', yield: 11.4, status: 'Active', event: 'rel_pl' },
  { asset: 'Schalke 04', trigger: 'Bundesliga Drop', notional: '€25,000,000', yield: 13.1, status: 'High Risk', event: 'rel_bl' },
  { asset: 'Nottm Forest', trigger: 'Championship Return', notional: '€12,000,000', yield: 6.5, status: 'Active', event: 'rel_pl' },
];

const TICKER_ITEMS = [
  "EUR/GBP 0.8542", "BTC/USD 64,210.50", "ETH/USD 3,420.12", 
  "FC Bayern Spread: 142bps", "SOL/USD 145.20", "Serie A Relegation Index: 18.4", 
  "Opta Feed LIVE", "PL Risk Index: 24.7", "USDC/USD 1.0001",
  "ELO Model v3.2 ACTIVE", "USD/EUR 0.9218"
];

// --- Components ---

const MetricCard = ({ title, value, sub, delta, colorClass, delay = 0, icon: Icon }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className={`bg-bg-card border border-border rounded-sm p-5 relative overflow-hidden group hover:border-accent-cyan transition-colors`}
  >
    <div className="flex justify-between items-start mb-2">
      <div className="text-[10px] tracking-[0.2em] uppercase text-text-muted font-sans">{title}</div>
      {Icon && <Icon size={14} className="text-text-muted opacity-50 group-hover:text-accent-cyan transition-colors" />}
    </div>
    <div className={`font-mono text-4xl font-bold leading-none mb-2 ${colorClass} drop-shadow-[0_0_10px_rgba(0,207,255,0.3)]`}>
      {value}
    </div>
    <div className="text-[11px] text-text-muted mb-3 flex items-center gap-1.5">
      {sub}
      {delta && (
        <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/5 ${delta.startsWith('+') ? 'text-accent-green' : 'text-accent-red'}`}>
          {delta}
        </span>
      )}
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-cyan opacity-30 group-hover:opacity-100 transition-opacity" />
  </motion.div>
);

export default function App() {
  const [isRfqOpen, setIsRfqOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rfqRef, setRfqRef] = useState('');
  const [settlementType, setSettlementType] = useState<'fiat' | 'crypto'>('fiat');
  const [time, setTime] = useState(new Date().toUTCString().split(' ')[4]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toUTCString().split(' ')[4]);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRfqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = (settlementType === 'crypto' ? 'TX-' : 'SRX-') + Math.random().toString(36).substring(2, 9).toUpperCase();
    setRfqRef(ref);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsRfqOpen(false);
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Nav */}
      <nav className="fixed top-0 left-0 right-0 h-14 bg-bg-elevated border-border border-b flex items-center justify-between px-6 pl-[244px] z-40 shadow-[0_0_20px_rgba(0,207,255,0.08)]">
        <div className="flex items-baseline gap-3">
          <span className="font-display font-bold text-lg text-accent-cyan tracking-wider drop-shadow-[0_0_12px_rgba(0,207,255,0.5)]">
            SportsRisk X
          </span>
          <span className="font-sans text-[11px] text-text-muted tracking-[0.2em] uppercase border-l border-border pl-3">
            Institutional OTC
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-accent-cyan/10 border border-accent-cyan/30 rounded-sm px-3 py-1.5 flex items-center gap-2 text-[11px] font-mono text-accent-cyan">
            <Wallet size={14} />
            <span className="opacity-60">ETH:</span> 0x71C...3F4
            <span className="text-border mx-1">|</span>
            <span className="text-accent-green">14,200 USDC</span>
          </div>
          <div className="bg-accent-green/10 border border-accent-green/30 rounded-sm px-3 py-1.5 flex items-center gap-2 text-[11px] font-mono text-accent-green">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-green shadow-[0_0_6px_#00E87A] animate-pulse-glow" />
            Mainnet · Verified
          </div>
          <div className="w-8 h-8 rounded-full bg-bg-elevated border border-accent-cyan flex items-center justify-center font-display text-[11px] text-accent-cyan">
            CF
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className="fixed top-0 left-0 w-[220px] h-full bg-bg-elevated border-border border-r flex flex-col z-30 pt-14">
        <div className="absolute top-0 left-0 right-0 h-14 flex items-center px-4 border-b border-border">
          <span className="font-display font-bold text-base text-accent-cyan drop-shadow-[0_0_10px_rgba(0,207,255,0.4)]">SX</span>
        </div>
        
        <nav className="flex-1 py-4">
          <div className="text-[9px] tracking-[0.25em] uppercase text-text-muted px-4 py-3 opacity-60">Navigation</div>
          
          <div className="flex items-center gap-2.5 px-4 py-2.5 cursor-pointer text-accent-cyan bg-accent-cyan/10 border-l-2 border-accent-cyan text-xs font-medium">
            <LayoutDashboard size={14} /> Dashboard
          </div>
          <div className="flex items-center gap-2.5 px-4 py-2.5 cursor-pointer text-text-muted hover:text-text-primary hover:bg-white/5 text-xs font-medium transition-colors">
            <TrendingUp size={14} /> Risk Models
          </div>
          <div className="flex items-center gap-2.5 px-4 py-2.5 cursor-pointer text-text-muted hover:text-text-primary hover:bg-white/5 text-xs font-medium transition-colors">
            <FileText size={14} /> Active Contracts
          </div>
          <div className="flex items-center gap-2.5 px-4 py-2.5 cursor-pointer text-text-muted hover:text-text-primary hover:bg-white/5 text-xs font-medium transition-colors">
            <History size={14} /> RFQ History
          </div>
          <div className="flex items-center gap-2.5 px-4 py-2.5 cursor-pointer text-text-muted hover:text-text-primary hover:bg-white/5 text-xs font-medium transition-colors">
            <Wallet size={14} /> Digital Wallet
          </div>
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2 font-mono text-[10px] text-accent-green tracking-wider">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-green shadow-[0_0_5px_#00E87A] animate-pulse-glow" />
            LIVE · OPTA FEED
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-[220px] pt-14 flex-1 flex flex-col">
        {/* Ticker */}
        <div className="h-8 bg-[#040911] border-border border-b overflow-hidden flex items-center relative">
          <div className="flex whitespace-nowrap animate-ticker font-mono text-[10.5px] text-accent-cyan tracking-wider">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="px-8 opacity-85">
                {item.split(' ').slice(0, -1).join(' ')} <span className="text-accent-green">{item.split(' ').pop()}</span>
                <span className="text-border mx-4">|</span>
              </span>
            ))}
          </div>
        </div>

        <div className="p-7 flex-1">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="font-display text-[11px] tracking-[0.3em] uppercase text-text-muted">Institutional Risk Dashboard</div>
              <div className="font-display font-bold text-xl text-text-primary tracking-wider mt-0.5">Portfolio Overview</div>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-text-muted">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse-glow" />
              MARKET OPEN · Q1 2025
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <MetricCard 
              title="Projected Relegation Exposure" 
              value="€65.0M" 
              sub="Aggregated across 5 positions" 
              delta="+3.2% vs Q4" 
              colorClass="text-accent-amber"
              icon={ShieldAlert}
              delay={0.1}
            />
            <MetricCard 
              title="Digital Asset Exposure" 
              value="14.2M" 
              sub="Settled in USDC/USDT" 
              delta="+12.5% vs Q4" 
              colorClass="text-accent-green"
              icon={Wallet}
              delay={0.2}
            />
            <MetricCard 
              title="Market Avg Hedge Premium" 
              value="8.5%" 
              sub="Parametric OTC · Q1 2025" 
              colorClass="text-accent-cyan"
              icon={TrendingUp}
              delay={0.3}
            />
          </div>

          {/* Table */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="font-display text-xs tracking-widest uppercase text-text-primary">Live Contract Board</div>
                <div className="font-mono text-[10px] text-text-muted mt-1">
                  24 instruments · Last updated: <span className="text-accent-cyan">{time} GMT</span>
                </div>
              </div>
            </div>

            <div className="bg-bg-card border border-border rounded-sm overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-bg-primary/60 border-b border-border">
                    <th className="px-4 py-2.5 text-left text-[9px] tracking-[0.25em] uppercase text-text-muted font-medium">Underlying Asset</th>
                    <th className="px-4 py-2.5 text-left text-[9px] tracking-[0.25em] uppercase text-text-muted font-medium">Trigger Condition</th>
                    <th className="px-4 py-2.5 text-left text-[9px] tracking-[0.25em] uppercase text-text-muted font-medium">Notional Value</th>
                    <th className="px-4 py-2.5 text-left text-[9px] tracking-[0.25em] uppercase text-text-muted font-medium">Current Yield</th>
                    <th className="px-4 py-2.5 text-left text-[9px] tracking-[0.25em] uppercase text-text-muted font-medium">Status</th>
                    <th className="px-4 py-2.5 text-left text-[9px] tracking-[0.25em] uppercase text-text-muted font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {CONTRACTS.map((c, i) => (
                    <tr key={i} className="border-b border-border/60 last:border-0 hover:bg-accent-cyan/5 transition-colors group">
                      <td className="px-4 py-3 text-xs font-medium border-l-2 border-transparent group-hover:border-accent-cyan">{c.asset}</td>
                      <td className="px-4 py-3 text-xs text-text-muted">{c.trigger}</td>
                      <td className="px-4 py-3 text-[11.5px] font-mono">{c.notional}</td>
                      <td className={`px-4 py-3 text-[11.5px] font-mono font-semibold ${c.yield > 12 ? 'text-accent-red' : c.yield > 10 ? 'text-accent-amber' : 'text-text-primary'}`}>
                        {c.yield}%
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 text-[11px]">
                          <div className={`w-1.5 h-1.5 rounded-full animate-pulse-glow ${c.status === 'Active' ? 'bg-accent-green shadow-[0_0_5px_#00E87A]' : c.status === 'Pending' ? 'bg-accent-amber shadow-[0_0_5px_#FFB800]' : 'bg-accent-red shadow-[0_0_5px_#FF4444]'}`} />
                          {c.status}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <button 
                          onClick={() => setIsRfqOpen(true)}
                          className="text-[9px] tracking-widest uppercase border border-accent-cyan/30 text-accent-cyan px-2.5 py-1 rounded-sm hover:bg-accent-cyan/10 hover:border-accent-cyan transition-all font-display"
                        >
                          Quote
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* RFQ CTA */}
          <div className="flex flex-col items-end gap-1.5">
            <button 
              onClick={() => setIsRfqOpen(true)}
              className="bg-gradient-to-br from-accent-cyan to-[#0090CC] text-bg-primary font-display font-bold text-[13px] tracking-[0.15em] uppercase px-10 py-3.5 rounded-sm hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(0,207,255,0.2)] hover:shadow-[0_0_32px_rgba(0,207,255,0.45)]"
            >
              Initiate RFQ
            </button>
            <div className="text-[10px] text-text-muted font-mono tracking-tight">
              Institutional liquidity pool · Min. €5M notional
            </div>
          </div>
        </div>
      </main>

      {/* RFQ Modal */}
      <AnimatePresence>
        {isRfqOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsRfqOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-full max-w-md bg-bg-elevated border border-accent-cyan rounded-sm shadow-[0_0_60px_rgba(0,207,255,0.15)] overflow-hidden"
            >
              <div className="h-1 bg-gradient-to-r from-accent-cyan via-[#0090CC] to-transparent" />
              <div className="flex items-center justify-between p-5 border-b border-border">
                <h3 className="font-display text-[13px] tracking-widest uppercase text-accent-cyan">New Request for Quote</h3>
                <button onClick={() => setIsRfqOpen(false)} className="text-text-muted hover:text-accent-red transition-colors">
                  <X size={18} />
                </button>
              </div>

              <div className="p-6">
                {!isSubmitted ? (
                  <form onSubmit={handleRfqSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <label className="block text-[10px] tracking-widest uppercase text-text-muted">Hedge Event</label>
                      <div className="relative">
                        <select className="w-full bg-bg-primary/80 border border-border rounded-sm px-3 py-2.5 text-xs font-mono appearance-none focus:border-accent-cyan outline-none">
                          <option value="">— Select Event —</option>
                          <option value="rel_pl">Relegation (Premier League)</option>
                          <option value="rel_sa">Relegation (Serie A)</option>
                          <option value="rel_bl">Relegation (Bundesliga)</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-accent-cyan pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] tracking-widest uppercase text-text-muted">Settlement Layer</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button 
                          type="button"
                          onClick={() => setSettlementType('fiat')}
                          className={`flex items-center justify-center gap-2 p-2.5 border text-xs rounded-sm transition-all ${settlementType === 'fiat' ? 'border-accent-cyan bg-accent-cyan/5 text-accent-cyan' : 'border-border text-text-muted hover:border-accent-cyan/50'}`}
                        >
                          T+2 Fiat (EUR)
                        </button>
                        <button 
                          type="button"
                          onClick={() => setSettlementType('crypto')}
                          className={`flex items-center justify-center gap-2 p-2.5 border text-xs rounded-sm transition-all ${settlementType === 'crypto' ? 'border-accent-green bg-accent-green/5 text-accent-green' : 'border-border text-text-muted hover:border-accent-green/50'}`}
                        >
                          Instant USDC
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] tracking-widest uppercase text-text-muted">Notional Amount ({settlementType === 'fiat' ? 'EUR' : 'USDC'})</label>
                      <input 
                        type="number" 
                        placeholder={settlementType === 'fiat' ? '€ 5,000,000' : '5,000,000 USDC'}
                        className="w-full bg-bg-primary/80 border border-border rounded-sm px-3 py-2.5 text-xs font-mono focus:border-accent-cyan outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] tracking-widest uppercase text-text-muted">Counterparty</label>
                      <div className="grid grid-cols-2 gap-3">
                        <label className="flex items-center justify-center gap-2 p-2.5 border border-accent-cyan bg-accent-cyan/5 text-accent-cyan text-xs rounded-sm cursor-pointer">
                          <input type="radio" name="cp" defaultChecked className="hidden" />
                          Best Execution
                        </label>
                        <label className="flex items-center justify-center gap-2 p-2.5 border border-border text-text-muted text-xs rounded-sm cursor-pointer hover:border-accent-cyan/50 transition-colors">
                          <input type="radio" name="cp" className="hidden" />
                          Specific LP
                        </label>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className={`w-full font-display font-bold text-xs tracking-[0.2em] uppercase py-3.5 rounded-sm transition-shadow mt-4 ${settlementType === 'crypto' ? 'bg-gradient-to-br from-accent-green to-[#009955] text-bg-primary shadow-[0_0_24px_rgba(0,232,122,0.4)]' : 'bg-gradient-to-br from-accent-cyan to-[#0090CC] text-bg-primary shadow-[0_0_24px_rgba(0,207,255,0.4)]'}`}
                    >
                      {settlementType === 'crypto' ? 'Execute On-Chain' : 'Submit to Liquidity Pool'}
                    </button>
                  </form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-8 text-center"
                  >
                    <CheckCircle2 size={48} className="text-accent-green mx-auto mb-4" />
                    <h4 className="font-display text-base tracking-widest uppercase text-accent-green mb-2">
                      {settlementType === 'crypto' ? 'Transaction Executed' : 'RFQ Submitted'}
                    </h4>
                    <p className="font-mono text-[11px] text-text-muted">
                      {settlementType === 'crypto' ? 'Settled on Ethereum Mainnet.' : 'Routed to institutional liquidity pool.'}<br />
                      Reference: <span className="text-accent-cyan">{rfqRef}</span>
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
