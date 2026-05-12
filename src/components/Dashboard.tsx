import { Idea, Prompt } from '../types';
import { 
  ArrowUpRight, 
  Lightbulb, 
  Terminal, 
  Clock, 
  CheckCircle2, 
  TrendingUp,
  Zap,
  BarChart3,
  Fingerprint,
  Scan
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface DashboardProps {
  ideas: Idea[];
  prompts: Prompt[];
  setActiveView: (view: any) => void;
}

export default function Dashboard({ ideas, prompts, setActiveView }: DashboardProps) {
  const stats = [
    { label: 'Ide Ditangkap', value: ideas.length, icon: Lightbulb, color: 'text-amber-400' },
    { label: 'Prompt Dibuat', value: prompts.length, icon: Terminal, color: 'text-blue-400' },
    { label: 'Dalam Proses', value: ideas.filter(i => i.status !== 'Terbit' && i.status !== 'Ide').length, icon: Clock, color: 'text-orange-400' },
    { label: 'Diterbitkan', value: ideas.filter(i => i.status === 'Terbit').length, icon: CheckCircle2, color: 'text-emerald-400' },
  ];

  const recentIdeas = ideas.slice(0, 3);

  return (
    <div className="space-y-12">
      {/* Hero Welcome */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-2">Sistem Aktif</h2>
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Selamat datang kembali, <span className="text-orange-500 italic">Kreator</span>.</h1>
          <p className="mt-4 text-zinc-400 max-w-lg leading-relaxed">
            Mesin kreatif Anda berada pada kapasitas 94%. Anda memiliki 3 suntingan tertunda dan struktur prompt baru yang menunggu ulasan.
          </p>
        </div>
        <button 
          onClick={() => setActiveView('capture')}
          className="group relative px-8 py-3 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:pr-10"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Zap className="w-4 h-4 fill-black" />
            Tangkapan Cepat
          </span>
          <ArrowUpRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
        </button>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, idx) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-colors group cursor-default"
          >
            <div className={cn("p-2 rounded-xl bg-white/5 w-fit mb-4 group-hover:scale-110 transition-transform", stat.color)}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
            <div className="text-xs text-zinc-500 font-medium uppercase tracking-wider mt-1">{stat.label}</div>
          </motion.div>
        ))}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={() => setActiveView('visual-dna')}
          className="p-6 rounded-3xl bg-orange-500/10 border border-orange-500/20 hover:border-orange-500/40 transition-all group cursor-pointer"
        >
          <div className="p-2 rounded-xl bg-orange-500/10 w-fit mb-4 group-hover:scale-110 transition-transform text-orange-500">
            <Fingerprint className="w-5 h-5" />
          </div>
          <div className="text-lg font-bold tracking-tight text-orange-200">Kunci DNA</div>
          <div className="text-[10px] text-orange-500/70 font-bold uppercase tracking-wider mt-1">Integritas Inti</div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={() => setActiveView('moodboard')}
          className="p-6 rounded-3xl bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all group cursor-pointer"
        >
          <div className="p-2 rounded-xl bg-blue-500/10 w-fit mb-4 group-hover:scale-110 transition-transform text-blue-500">
            <Scan className="w-5 h-5" />
          </div>
          <div className="text-lg font-bold tracking-tight text-blue-200">Moodboard</div>
          <div className="text-[10px] text-blue-500/70 font-bold uppercase tracking-wider mt-1">Pemindaian Cerdas</div>
        </motion.div>
      </section>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Ideas */}
        <section className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-orange-500" />
              Umpan Terbaru
            </h3>
            <button 
              onClick={() => setActiveView('pipeline')}
              className="text-xs text-zinc-500 hover:text-white transition-colors"
            >
              Lihat Semua
            </button>
          </div>
          
          <div className="space-y-4">
            {recentIdeas.map((idea) => (
              <div 
                key={idea.id}
                className="group p-6 rounded-[2rem] bg-[#0a0a0a] border border-white/5 hover:border-orange-500/30 transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-[10px] uppercase font-bold text-zinc-400">
                      {idea.niche}
                    </span>
                    <span className="text-[10px] text-zinc-600 font-mono">
                      {new Date(idea.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold group-hover:text-orange-400 transition-colors">{idea.title}</h4>
                  <p className="text-sm text-zinc-500 line-clamp-1 max-w-md">{idea.description}</p>
                </div>
                <div className="flex flex-col items-end gap-3 text-right">
                  <div className={cn(
                    "px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest",
                    idea.status === 'Ide' ? "bg-amber-500/10 text-amber-500" :
                    idea.status === 'Terbit' ? "bg-emerald-500/10 text-emerald-500" :
                    "bg-orange-500/10 text-orange-500"
                  )}>
                    {idea.status}
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-zinc-700 group-hover:text-orange-500 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Weekly Productivity */}
        <section className="space-y-6">
          <h3 className="font-bold flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-orange-500" />
            Kemajuan Vibe
          </h3>
          <div className="p-8 rounded-[2rem] bg-zinc-900/40 border border-white/5 relative overflow-hidden group">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Alur Kreatif</span>
                <span className="text-xl font-bold font-mono">84%</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '84%' }}
                  className="h-full bg-gradient-to-r from-orange-600 to-amber-400 shadow-[0_0_15px_rgba(249,115,22,0.5)]"
                />
              </div>
              <ul className="space-y-4 text-xs font-mono uppercase tracking-widest text-zinc-500">
                <li className="flex justify-between items-center group/item cursor-default">
                  <span className="group-hover/item:text-orange-400 transition-colors">Laju Ideasi</span>
                  <span className="text-zinc-300">+12%</span>
                </li>
                <li className="flex justify-between items-center group/item cursor-default">
                  <span className="group-hover/item:text-orange-400 transition-colors">Presisi Prompt</span>
                  <span className="text-zinc-300">92%</span>
                </li>
                <li className="flex justify-between items-center group/item cursor-default">
                  <span className="group-hover/item:text-orange-400 transition-colors">Rasio Publikasi</span>
                  <span className="text-zinc-300">1:4</span>
                </li>
              </ul>
            </div>
            
            {/* Background Accent */}
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-orange-600/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-orange-600/20 transition-colors" />
          </div>

          <div className="p-6 rounded-[2rem] bg-orange-600 text-black font-bold flex items-center justify-between group cursor-pointer hover:bg-orange-500 transition-colors">
            <div className="space-y-1">
              <div className="text-xs uppercase tracking-widest opacity-80">Tips Studio</div>
              <div className="text-sm">Coba preset 'Cinematic Haze' dengan pencahayaan blue hour untuk pemotretan Anda berikutnya.</div>
            </div>
            <Zap className="w-6 h-6 shrink-0 fill-black" />
          </div>
        </section>
      </div>
    </div>
  );
}
