 'use client';

import { Toolbar } from '@/components/Toolbar';
import { CanvasEditor } from '@/components/CanvasEditor';
import { PropertiesPanel } from '@/components/PropertiesPanel';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTemplateStore } from '@/store/useTemplateStore';

export default function Page() {
  const isMobile = useIsMobile();
  const templateName = useTemplateStore((state) => state.templateName);

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans">
      <Toolbar />
      <div className="flex-1 flex flex-col relative">
        <header className="h-14 border-b bg-white flex items-center px-4 justify-between shadow-sm z-10">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">MockUpGen</p>
            <h1 className="font-semibold text-slate-800">Phone Case Template Builder</h1>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500">Build, preview, export</p>
            <p className="text-xs text-slate-400">{templateName}</p>
          </div>
        </header>
        {isMobile && (
          <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-700">
            Editing works best on a wider screen. Mobile is fine for quick previews and small adjustments.
          </div>
        )}
        <main className="flex-1 relative bg-slate-100 overflow-hidden">
          <CanvasEditor />
        </main>
      </div>
      <PropertiesPanel />
    </div>
  );
}
