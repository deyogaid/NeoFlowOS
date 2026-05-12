/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Terminal, 
  Database, 
  Trello, 
  BarChart3, 
  Settings,
  Search,
  Bell,
  User,
  Hash,
  Fingerprint,
  History,
  Scan
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { Idea, Prompt, Reference } from './types';
import { INITIAL_IDEAS, INITIAL_PROMPTS, INITIAL_REFERENCES } from './constants';

// Pages
import Dashboard from './components/Dashboard';
import QuickCapture from './components/QuickCapture';
import PromptBuilder from './components/PromptBuilder';
import ReferenceVault from './components/ReferenceVault';
import ContentPipeline from './components/ContentPipeline';
import Analytics from './components/Analytics';
import SettingsView from './components/SettingsView';
import CaptionGenerator from './components/CaptionGenerator';
import VisualDNA from './components/VisualDNA';
import PromptEvolution from './components/PromptEvolution';
import MoodboardIntelligence from './components/MoodboardIntelligence';

type View = 'dashboard' | 'capture' | 'prompt-builder' | 'vault' | 'pipeline' | 'analytics' | 'settings' | 'captions' | 'visual-dna' | 'evolution' | 'moodboard';

export default function App() {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [ideas, setIdeas] = useState<Idea[]>(() => {
    const saved = localStorage.getItem('neoflow_ideas');
    return saved ? JSON.parse(saved) : INITIAL_IDEAS;
  });
  const [prompts, setPrompts] = useState<Prompt[]>(() => {
    const saved = localStorage.getItem('neoflow_prompts');
    return saved ? JSON.parse(saved) : INITIAL_PROMPTS;
  });
  const [references, setReferences] = useState<Reference[]>(() => {
    const saved = localStorage.getItem('neoflow_references');
    return saved ? JSON.parse(saved) : INITIAL_REFERENCES;
  });

  // Persist data
  useEffect(() => {
    localStorage.setItem('neoflow_ideas', JSON.stringify(ideas));
  }, [ideas]);

  useEffect(() => {
    localStorage.setItem('neoflow_prompts', JSON.stringify(prompts));
  }, [prompts]);

  useEffect(() => {
    localStorage.setItem('neoflow_references', JSON.stringify(references));
  }, [references]);

  const navItems = [
    { id: 'dashboard', label: 'Dasbor', icon: LayoutDashboard },
    { id: 'visual-dna', label: 'Mesin DNA', icon: Fingerprint },
    { id: 'moodboard', label: 'Moodboard', icon: Scan },
    { id: 'capture', label: 'Tangkapan', icon: PlusCircle },
    { id: 'prompt-builder', label: 'Studio', icon: Terminal },
    { id: 'evolution', label: 'Evolusi', icon: History },
    { id: 'pipeline', label: 'Alur Kerja', icon: Trello },
    { id: 'vault', label: 'Brankas', icon: Database },
    { id: 'analytics', label: 'Wawasan', icon: BarChart3 },
    { id: 'captions', label: 'Keterangan', icon: Hash },
    { id: 'settings', label: 'Pengaturan', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-orange-500/30">
      {/* Sidebar for Desktop */}
      <aside className="fixed left-0 top-0 bottom-0 w-20 lg:w-64 bg-[#0a0a0a] border-r border-white/5 hidden md:flex flex-col z-50">
        <div className="p-8 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-tr from-orange-600 to-amber-400 rounded-lg shadow-lg shadow-orange-900/20 flex items-center justify-center font-bold text-black text-sm">
            NF
          </div>
          <span className="hidden lg:block font-display font-bold tracking-tighter text-xl">NeoFlow OS</span>
        </div>

        <nav className="flex-1 mt-4 px-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id as View)}
                className={cn(
                  "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group",
                  isActive 
                    ? "bg-white/10 text-orange-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "stroke-[2.5px]" : "stroke-[1.5px]")} />
                <span className="hidden lg:block text-sm font-medium">{item.label}</span>
                {isActive && <motion.div layoutId="active-pill" className="absolute left-0 w-1 h-6 bg-orange-500 rounded-r-full" />}
              </button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/5">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
              <User className="w-4 h-4 text-zinc-400" />
            </div>
            <div className="hidden lg:block">
              <div className="text-xs font-semibold">Direktur Kreatif</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Anggota Elite</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="md:ml-20 lg:ml-64 min-h-screen pb-24 md:pb-0">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-[#050505]/80 backdrop-blur-xl border-bottom border-white/5 px-6 md:px-12 py-4 flex items-center justify-between gap-4">
          <div className="flex-1 md:max-w-xl">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 transition-colors group-focus-within:text-orange-400" />
              <input 
                type="text" 
                placeholder="Cari ide, prompt, atau aset..." 
                className="w-full bg-zinc-900/50 border border-white/5 rounded-full pl-10 pr-4 py-2 text-sm text-zinc-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:bg-zinc-900 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-zinc-500 hover:text-zinc-300 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border border-black shadow-lg"></span>
            </button>
            <div className="h-4 w-px bg-white/10 hidden sm:block"></div>
            <div className="text-right hidden sm:block">
              <div className="text-[10px] uppercase tracking-tighter text-zinc-500 font-bold">Ruang Kerja</div>
              <div className="text-xs font-semibold">Studio Neo-Noire</div>
            </div>
          </div>
        </header>

        {/* View Content */}
        <div className="p-6 md:p-12 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {activeView === 'dashboard' && (
                <Dashboard 
                  ideas={ideas} 
                  prompts={prompts} 
                  setActiveView={setActiveView} 
                />
              )}
              {activeView === 'capture' && (
                <QuickCapture 
                  onSave={(idea) => setIdeas([idea, ...ideas])}
                  setActiveView={setActiveView}
                />
              )}
              {activeView === 'prompt-builder' && (
                <PromptBuilder 
                  onSave={(prompt) => setPrompts([prompt, ...prompts])}
                  ideas={ideas}
                />
              )}
              {activeView === 'pipeline' && (
                <ContentPipeline 
                  ideas={ideas}
                  setIdeas={setIdeas}
                />
              )}
              {activeView === 'vault' && (
                <ReferenceVault 
                  references={references}
                  setReferences={setReferences}
                />
              )}
              {activeView === 'analytics' && (
                <Analytics 
                  ideas={ideas}
                  prompts={prompts}
                />
              )}
              {activeView === 'captions' && (
                <CaptionGenerator />
              )}
              {activeView === 'visual-dna' && (
                <VisualDNA />
              )}
              {activeView === 'evolution' && (
                <PromptEvolution prompts={prompts} />
              )}
              {activeView === 'moodboard' && (
                <MoodboardIntelligence />
              )}
              {activeView === 'settings' && (
                <SettingsView />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Nav */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#0a0a0a]/90 backdrop-blur-2xl border-t border-white/5 md:hidden z-50 flex items-center justify-around px-2">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as View)}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors",
                isActive ? "text-orange-400" : "text-zinc-500"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] uppercase tracking-tighter font-bold">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
