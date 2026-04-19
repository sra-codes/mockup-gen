import { Toolbar } from '@/components/Toolbar';
import { CanvasEditor } from '@/components/CanvasEditor';
import { PropertiesPanel } from '@/components/PropertiesPanel';

export default function Page() {
  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans">
      <Toolbar />
      <div className="flex-1 flex flex-col relative">
        <header className="h-14 border-b bg-white flex items-center px-4 justify-between shadow-sm z-10">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">MockUpGen</p>
            <h1 className="font-semibold text-slate-800">Phone Case Template Builder</h1>
          </div>
          <p className="text-sm text-slate-500">Build, preview, export</p>
        </header>
        <main className="flex-1 relative bg-slate-100 overflow-hidden">
          <CanvasEditor />
        </main>
      </div>
      <PropertiesPanel />
    </div>
  );
}
