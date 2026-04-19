'use client';

import { useTemplateStore } from '@/store/useTemplateStore';
import { Trash2 } from 'lucide-react';

export function PropertiesPanel() {
  const { elements, selectedId, updateElement, deleteElement, coverProps, updateCoverProps } = useTemplateStore();

  if (selectedId === 'cover') {
    return (
      <aside className="w-72 bg-white border-l h-full shadow-sm z-20 flex flex-col overflow-y-auto">
        <div className="p-4 border-b bg-slate-50 flex items-center justify-between">
          <h2 className="font-semibold text-sm text-slate-700 capitalize">
            Cover Image Properties
          </h2>
        </div>
        <div className="p-5 space-y-6">
          <p className="text-sm text-slate-500">Adjust the uploaded artwork so it sits correctly inside the case frame.</p>
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Position & Scale</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-500 mb-1">X</label>
                <input 
                  type="number" 
                  value={Math.round(coverProps.x)} 
                  onChange={(e) => updateCoverProps({ x: Number(e.target.value) })}
                  className="w-full px-2 py-1.5 text-sm border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Y</label>
                <input 
                  type="number" 
                  value={Math.round(coverProps.y)} 
                  onChange={(e) => updateCoverProps({ y: Number(e.target.value) })}
                  className="w-full px-2 py-1.5 text-sm border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Scale</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={Number(coverProps.scale.toFixed(2))} 
                  onChange={(e) => updateCoverProps({ scale: Number(e.target.value) })}
                  className="w-full px-2 py-1.5 text-sm border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Rotation</label>
                <input 
                  type="number" 
                  value={Math.round(coverProps.rotation)} 
                  onChange={(e) => updateCoverProps({ rotation: Number(e.target.value) })}
                  className="w-full px-2 py-1.5 text-sm border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  const selectedElement = elements.find((el) => el.id === selectedId);

  if (!selectedElement) {
    return (
      <aside className="w-72 bg-white border-l h-full shadow-sm z-20 p-6 flex flex-col items-center justify-center text-slate-400">
        <p className="text-sm text-center">Select a cover image or overlay to inspect and edit its properties.</p>
      </aside>
    );
  }

  const handleChange = (field: keyof typeof selectedElement, value: string | number) => {
    updateElement(selectedElement.id, { [field]: value });
  };

  return (
    <aside className="w-72 bg-white border-l h-full shadow-sm z-20 flex flex-col overflow-y-auto">
      <div className="p-4 border-b bg-slate-50 flex items-center justify-between">
        <h2 className="font-semibold text-sm text-slate-700 capitalize">
          {selectedElement.type.replace(/([A-Z])/g, ' $1').trim()} Properties
        </h2>
        <button 
          onClick={() => deleteElement(selectedElement.id)}
          className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
          title="Delete Element"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="p-5 space-y-6">
        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Position & Size</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-500 mb-1">X</label>
              <input 
                type="number" 
                value={Math.round(selectedElement.x)} 
                onChange={(e) => handleChange('x', Number(e.target.value))}
                className="w-full px-2 py-1.5 text-sm border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Y</label>
              <input 
                type="number" 
                value={Math.round(selectedElement.y)} 
                onChange={(e) => handleChange('y', Number(e.target.value))}
                className="w-full px-2 py-1.5 text-sm border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Width</label>
              <input 
                type="number" 
                value={Math.round(selectedElement.width)} 
                onChange={(e) => handleChange('width', Number(e.target.value))}
                className="w-full px-2 py-1.5 text-sm border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Height</label>
              <input 
                type="number" 
                value={Math.round(selectedElement.height)} 
                onChange={(e) => handleChange('height', Number(e.target.value))}
                className="w-full px-2 py-1.5 text-sm border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Appearance</h3>
          
          <div>
            <label className="block text-xs text-slate-500 mb-1 flex justify-between">
              <span>Opacity</span>
              <span>{Math.round(selectedElement.opacity * 100)}%</span>
            </label>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01"
              value={selectedElement.opacity} 
              onChange={(e) => handleChange('opacity', Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-500 mb-1">Fill Color</label>
            <div className="flex gap-2">
              <input 
                type="color" 
                value={selectedElement.fill} 
                onChange={(e) => handleChange('fill', e.target.value)}
                className="w-8 h-8 rounded cursor-pointer border-0 p-0"
              />
              <input 
                type="text" 
                value={selectedElement.fill} 
                onChange={(e) => handleChange('fill', e.target.value)}
                className="flex-1 px-2 py-1.5 text-sm border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none uppercase font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-500 mb-1">Stroke Color</label>
            <div className="flex gap-2">
              <input 
                type="color" 
                value={selectedElement.stroke} 
                onChange={(e) => handleChange('stroke', e.target.value)}
                className="w-8 h-8 rounded cursor-pointer border-0 p-0"
              />
              <input 
                type="text" 
                value={selectedElement.stroke} 
                onChange={(e) => handleChange('stroke', e.target.value)}
                className="flex-1 px-2 py-1.5 text-sm border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none uppercase font-mono"
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
