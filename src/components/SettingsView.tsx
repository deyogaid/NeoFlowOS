import { Settings, Shield, Sliders, Hash, Download, Trash2, Cpu } from 'lucide-react';
import { cn } from '../lib/utils';

export default function SettingsView() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-2">Konfigurasi Inti</h2>
          <h1 className="text-4xl font-display font-bold tracking-tight">Pengaturan Sistem</h1>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <aside className="space-y-1">
          <SettingNav icon={<Sliders className="w-4 h-4" />} label="Studio Umum" active />
          <SettingNav icon={<Hash className="w-4 h-4" />} label="Niche & Tag" />
          <SettingNav icon={<Cpu className="w-4 h-4" />} label="API Mesin AI" />
          <SettingNav icon={<Shield className="w-4 h-4" />} label="Keamanan" />
          <SettingNav icon={<Download className="w-4 h-4" />} label="Manajemen Data" />
        </aside>

        <div className="md:col-span-2 space-y-8">
          <section className="p-8 rounded-[3rem] bg-zinc-900/40 border border-white/5 space-y-8">
            <h3 className="text-xl font-bold tracking-tight border-b border-white/5 pb-4">Personalisasi</h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-zinc-500 ml-2">Identitas Studio</label>
                <input 
                  type="text" 
                  defaultValue="Studio Neo-Noire" 
                  className="w-full bg-zinc-800/50 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-all border border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-zinc-500 ml-2">Preset Pilihan</label>
                <select className="w-full bg-zinc-800/50 rounded-2xl px-6 py-4 text-sm focus:outline-none appearance-none cursor-pointer">
                  <option>Cinematic</option>
                  <option>Editorial</option>
                  <option>Minimal</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-6 bg-orange-600/10 rounded-[2rem] border border-orange-500/20">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-orange-400 uppercase tracking-widest leading-none">Sinkron Otomatis</div>
                  <div className="text-sm font-medium text-zinc-300">Sinkronisasi cadangan cloud setiap 5 menit.</div>
                </div>
                <div className="w-12 h-6 bg-orange-600 rounded-full relative flex items-center px-1">
                  <div className="w-4 h-4 bg-black rounded-full ml-auto" />
                </div>
              </div>
            </div>
          </section>

          <section className="p-8 rounded-[3rem] bg-zinc-900/40 border border-white/5 space-y-8">
             <h3 className="text-xl font-bold tracking-tight border-b border-white/5 pb-4">Persistensi Data</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="p-6 rounded-[2rem] bg-zinc-800/50 border border-white/5 text-left hover:bg-zinc-800 transition-all space-y-2 group">
                   <Download className="w-6 h-6 text-orange-500" />
                   <div className="text-sm font-bold">Ekspor JSON</div>
                   <div className="text-[10px] text-zinc-500 uppercase font-bold">Cadangkan semua data sistem</div>
                </button>
                <button className="p-6 rounded-[2rem] bg-red-950/20 border border-red-500/10 text-left hover:bg-red-950/40 transition-all space-y-2 group">
                   <Trash2 className="w-6 h-6 text-red-500" />
                   <div className="text-sm font-bold text-red-400">Hapus Data</div>
                   <div className="text-[10px] text-zinc-700 uppercase font-bold">Bersihkan cache penyimpanan lokal</div>
                </button>
             </div>
          </section>

          <div className="text-center">
            <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-700">NeoFlow OS &copy; 2026 // Production Grade Build v1.0.4</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingNav({ icon, label, active }: { icon: any, label: string, active?: boolean }) {
  return (
    <button className={cn(
      "w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all",
      active ? "bg-white text-black" : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
    )}>
      {icon}
      {label}
    </button>
  );
}
