'use client';

import { useTemplateStore } from '@/store/useTemplateStore';
import { ImagePlus, Square, Circle, Undo, Redo, Trash2, Download, RefreshCw, Smartphone, Eye, EyeOff } from 'lucide-react';
import { useRef } from 'react';
import { PREDEFINED_MOCKUPS } from '@/lib/mockups';

export function Toolbar() {
  const { 
    addElement, undo, redo, reset, historyStep, history, 
    setBackgroundImage, elements, backgroundWidth, backgroundHeight,
    loadMockup, setCoverImage, previewMode, setPreviewMode
  } = useTemplateStore();
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setBackgroundImage(event.target?.result as string, img.width, img.height);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCoverImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExport = () => {
    // Export logic
    const exportData = {
      frame: 'frame.png', // Ideally the filename
      mask: elements.filter(e => e.type === 'mask').map(e => ({
        x: e.x / backgroundWidth,
        y: e.y / backgroundHeight,
        width: e.width / backgroundWidth,
        height: e.height / backgroundHeight,
      })),
      safeArea: elements.filter(e => e.type === 'safeArea').map(e => ({
        x: e.x / backgroundWidth,
        y: e.y / backgroundHeight,
        width: e.width / backgroundWidth,
        height: e.height / backgroundHeight,
      })),
      cameraCutout: elements.filter(e => e.type === 'cameraCutout').map(e => ({
        x: e.x / backgroundWidth,
        y: e.y / backgroundHeight,
        width: e.width / backgroundWidth,
        height: e.height / backgroundHeight,
        shape: e.shape,
      })),
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "template.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <aside className="w-64 bg-white border-r flex flex-col h-full shadow-sm z-20 overflow-y-auto">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-sm text-slate-500 uppercase tracking-wider mb-4">Mockups</h2>
        <div className="space-y-2">
          <select 
            className="w-full px-3 py-2 bg-slate-50 border rounded-md text-sm text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => {
              const mockup = PREDEFINED_MOCKUPS.find(m => m.id === e.target.value);
              if (mockup) loadMockup(mockup);
            }}
            defaultValue=""
          >
            <option value="" disabled>Select a phone mockup...</option>
            {Array.from(new Set(PREDEFINED_MOCKUPS.map(m => m.brand))).map(brand => (
              <optgroup key={brand} label={brand}>
                {PREDEFINED_MOCKUPS.filter(m => m.brand === brand).map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      </div>

      <div className="p-4 border-b">
        <h2 className="font-semibold text-sm text-slate-500 uppercase tracking-wider mb-4">Design</h2>
        <div className="space-y-2">
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={coverInputRef} 
            onChange={handleCoverUpload} 
          />
          <button 
            onClick={() => coverInputRef.current?.click()}
            className="w-full flex items-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors text-sm font-medium"
          >
            <ImagePlus size={16} />
            Upload Cover Design
          </button>
          
          <button 
            onClick={() => setPreviewMode(!previewMode)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-sm font-medium ${previewMode ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
          >
            {previewMode ? <EyeOff size={16} /> : <Eye size={16} />}
            {previewMode ? 'Exit Preview Mode' : 'Preview Mode'}
          </button>
        </div>
      </div>

      <div className="p-4 border-b">
        <h2 className="font-semibold text-sm text-slate-500 uppercase tracking-wider mb-4">Custom Frame</h2>
        <div className="space-y-2">
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center gap-2 px-3 py-2 bg-slate-50 text-slate-700 rounded-md hover:bg-slate-100 transition-colors text-sm font-medium"
          >
            <Smartphone size={16} />
            Upload Custom Frame
          </button>
        </div>
      </div>

      <div className="p-4 border-b flex-1">
        <h2 className="font-semibold text-sm text-slate-500 uppercase tracking-wider mb-4">Overlays</h2>
        <div className="space-y-2">
          <button 
            onClick={() => addElement('mask', 'rect')}
            className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 rounded-md hover:bg-slate-100 transition-colors text-sm"
          >
            <Square size={16} className="text-green-500" />
            Add Mask Area
          </button>
          <button 
            onClick={() => addElement('safeArea', 'rect')}
            className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 rounded-md hover:bg-slate-100 transition-colors text-sm"
          >
            <Square size={16} className="text-blue-500" />
            Add Safe Area
          </button>
          <button 
            onClick={() => addElement('cameraCutout', 'rect')}
            className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 rounded-md hover:bg-slate-100 transition-colors text-sm"
          >
            <Square size={16} className="text-red-500" />
            Add Camera (Rect)
          </button>
          <button 
            onClick={() => addElement('cameraCutout', 'circle')}
            className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 rounded-md hover:bg-slate-100 transition-colors text-sm"
          >
            <Circle size={16} className="text-red-500" />
            Add Camera (Circle)
          </button>
        </div>
      </div>

      <div className="p-4 border-t bg-slate-50 mt-auto">
        <div className="flex gap-2 mb-4">
          <button 
            onClick={undo} 
            disabled={historyStep === 0}
            className="flex-1 flex justify-center items-center py-2 text-slate-600 hover:bg-slate-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            title="Undo"
          >
            <Undo size={16} />
          </button>
          <button 
            onClick={redo} 
            disabled={historyStep === history.length - 1}
            className="flex-1 flex justify-center items-center py-2 text-slate-600 hover:bg-slate-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            title="Redo"
          >
            <Redo size={16} />
          </button>
          <button 
            onClick={reset} 
            className="flex-1 flex justify-center items-center py-2 text-slate-600 hover:bg-slate-200 rounded"
            title="Reset Canvas"
          >
            <RefreshCw size={16} />
          </button>
        </div>
        <button 
          onClick={handleExport}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors text-sm font-medium shadow-sm"
        >
          <Download size={16} />
          Export Template
        </button>
      </div>
    </aside>
  );
}
