import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { PhoneMockup } from '@/lib/mockups';

export type ElementType = 'mask' | 'safeArea' | 'cameraCutout';
export type ShapeType = 'rect' | 'circle';

export interface TemplateElement {
  id: string;
  type: ElementType;
  shape: ShapeType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  fill: string;
  stroke: string;
  opacity: number;
  radius?: number; // for circle
}

export interface CoverProps {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

export interface TemplateState {
  backgroundImage: string | null;
  backgroundWidth: number;
  backgroundHeight: number;
  elements: TemplateElement[];
  selectedId: string | null;
  zoom: number;
  history: TemplateElement[][];
  historyStep: number;
  
  coverImage: string | null;
  coverProps: CoverProps;
  previewMode: boolean;

  // Actions
  setBackgroundImage: (url: string | null, width?: number, height?: number) => void;
  addElement: (type: ElementType, shape: ShapeType) => void;
  updateElement: (id: string, updates: Partial<TemplateElement>) => void;
  deleteElement: (id: string) => void;
  selectElement: (id: string | null) => void;
  setZoom: (zoom: number) => void;
  undo: () => void;
  redo: () => void;
  reset: () => void;
  
  setCoverImage: (url: string | null) => void;
  updateCoverProps: (props: Partial<CoverProps>) => void;
  setPreviewMode: (val: boolean) => void;
  loadMockup: (mockup: PhoneMockup) => void;
}

const getDefaultElementProps = (type: ElementType, shape: ShapeType): Partial<TemplateElement> => {
  const base = {
    x: 100,
    y: 100,
    width: 150,
    height: 300,
    rotation: 0,
    opacity: 0.5,
  };

  switch (type) {
    case 'mask':
      return { ...base, fill: '#22c55e', stroke: '#16a34a', width: 200, height: 400 }; // green
    case 'safeArea':
      return { ...base, fill: '#3b82f6', stroke: '#2563eb', width: 180, height: 380 }; // blue
    case 'cameraCutout':
      return { 
        ...base, 
        fill: '#ef4444', 
        stroke: '#dc2626', 
        width: 50, 
        height: shape === 'circle' ? 50 : 80,
        radius: shape === 'circle' ? 25 : undefined
      }; // red
    default:
      return base;
  }
};

export const useTemplateStore = create<TemplateState>((set, get) => ({
  backgroundImage: null,
  backgroundWidth: 0,
  backgroundHeight: 0,
  elements: [],
  selectedId: null,
  zoom: 1,
  history: [[]],
  historyStep: 0,
  
  coverImage: null,
  coverProps: { x: 0, y: 0, scale: 1, rotation: 0 },
  previewMode: false,

  setBackgroundImage: (url, width = 0, height = 0) => set({ 
    backgroundImage: url, 
    backgroundWidth: width, 
    backgroundHeight: height 
  }),

  addElement: (type, shape) => {
    const { elements, history, historyStep } = get();
    const newElement: TemplateElement = {
      id: uuidv4(),
      type,
      shape,
      ...getDefaultElementProps(type, shape),
    } as TemplateElement;

    const newElements = [...elements, newElement];
    const newHistory = history.slice(0, historyStep + 1);
    
    set({
      elements: newElements,
      selectedId: newElement.id,
      history: [...newHistory, newElements],
      historyStep: historyStep + 1,
    });
  },

  updateElement: (id, updates) => {
    const { elements, history, historyStep } = get();
    const newElements = elements.map((el) => (el.id === id ? { ...el, ...updates } : el));
    
    // Only save to history if it's a "final" update (e.g., drag end), 
    // but for simplicity we'll save every update here. 
    // In a real app, we might debounce or explicitly call saveHistory.
    const newHistory = history.slice(0, historyStep + 1);
    
    set({
      elements: newElements,
      history: [...newHistory, newElements],
      historyStep: historyStep + 1,
    });
  },

  deleteElement: (id) => {
    const { elements, history, historyStep } = get();
    const newElements = elements.filter((el) => el.id !== id);
    const newHistory = history.slice(0, historyStep + 1);
    
    set({
      elements: newElements,
      selectedId: null,
      history: [...newHistory, newElements],
      historyStep: historyStep + 1,
    });
  },

  selectElement: (id) => set({ selectedId: id }),
  
  setZoom: (zoom) => set({ zoom }),

  undo: () => {
    const { historyStep, history } = get();
    if (historyStep > 0) {
      set({
        historyStep: historyStep - 1,
        elements: history[historyStep - 1],
        selectedId: null,
      });
    }
  },

  redo: () => {
    const { historyStep, history } = get();
    if (historyStep < history.length - 1) {
      set({
        historyStep: historyStep + 1,
        elements: history[historyStep + 1],
        selectedId: null,
      });
    }
  },

  reset: () => set({
    backgroundImage: null,
    backgroundWidth: 0,
    backgroundHeight: 0,
    elements: [],
    selectedId: null,
    zoom: 1,
    history: [[]],
    historyStep: 0,
    coverImage: null,
    coverProps: { x: 0, y: 0, scale: 1, rotation: 0 },
    previewMode: false,
  }),
  
  setCoverImage: (url) => set({ coverImage: url, selectedId: 'cover' }),
  
  updateCoverProps: (props) => set((state) => ({ coverProps: { ...state.coverProps, ...props } })),
  
  setPreviewMode: (val) => set({ previewMode: val, selectedId: null }),
  
  loadMockup: (mockup) => set({
    backgroundImage: mockup.getSvg(),
    backgroundWidth: mockup.width,
    backgroundHeight: mockup.height,
    elements: mockup.getElements(),
    selectedId: null,
    history: [mockup.getElements()],
    historyStep: 0,
    coverProps: { x: 0, y: 0, scale: 1, rotation: 0 }
  }),
}));
