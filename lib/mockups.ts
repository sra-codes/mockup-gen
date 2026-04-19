import { v4 as uuidv4 } from 'uuid';
import { TemplateElement } from '@/store/useTemplateStore';

export interface PhoneMockup {
  id: string;
  name: string;
  brand: string;
  width: number;
  height: number;
  getSvg: () => string;
  getElements: () => TemplateElement[];
}

export const PREDEFINED_MOCKUPS: PhoneMockup[] = [
  // APPLE
  {
    id: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    width: 340,
    height: 700,
    getSvg: () => `data:image/svg+xml;utf8,<svg width="340" height="700" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="332" height="692" rx="50" fill="none" stroke="%231e293b" stroke-width="8"/><rect x="10" y="10" width="320" height="680" rx="45" fill="none" stroke="%23cbd5e1" stroke-width="2"/></svg>`,
    getElements: (): TemplateElement[] => [
      { id: uuidv4(), type: 'mask', shape: 'rect', x: 12, y: 12, width: 316, height: 676, radius: 43, rotation: 0, fill: 'rgba(34, 197, 94, 0.2)', stroke: '#16a34a', opacity: 1 },
      { id: uuidv4(), type: 'safeArea', shape: 'rect', x: 24, y: 24, width: 292, height: 652, radius: 31, rotation: 0, fill: 'rgba(59, 130, 246, 0.2)', stroke: '#2563eb', opacity: 1 },
      { id: uuidv4(), type: 'cameraCutout', shape: 'rect', x: 24, y: 24, width: 100, height: 110, radius: 26, rotation: 0, fill: '#1e293b', stroke: '#0f172a', opacity: 0.9 }
    ]
  },
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    width: 320,
    height: 650,
    getSvg: () => `data:image/svg+xml;utf8,<svg width="320" height="650" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="312" height="642" rx="45" fill="none" stroke="%231e293b" stroke-width="8"/><rect x="10" y="10" width="300" height="630" rx="40" fill="none" stroke="%23cbd5e1" stroke-width="2"/></svg>`,
    getElements: (): TemplateElement[] => [
      { id: uuidv4(), type: 'mask', shape: 'rect', x: 12, y: 12, width: 296, height: 626, radius: 38, rotation: 0, fill: 'rgba(34, 197, 94, 0.2)', stroke: '#16a34a', opacity: 1 },
      { id: uuidv4(), type: 'safeArea', shape: 'rect', x: 24, y: 24, width: 272, height: 602, radius: 26, rotation: 0, fill: 'rgba(59, 130, 246, 0.2)', stroke: '#2563eb', opacity: 1 },
      { id: uuidv4(), type: 'cameraCutout', shape: 'rect', x: 24, y: 24, width: 90, height: 100, radius: 24, rotation: 0, fill: '#1e293b', stroke: '#0f172a', opacity: 0.9 }
    ]
  },
  {
    id: 'iphone-15',
    name: 'iPhone 15',
    brand: 'Apple',
    width: 320,
    height: 650,
    getSvg: () => `data:image/svg+xml;utf8,<svg width="320" height="650" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="312" height="642" rx="45" fill="none" stroke="%231e293b" stroke-width="8"/><rect x="10" y="10" width="300" height="630" rx="40" fill="none" stroke="%23cbd5e1" stroke-width="2"/></svg>`,
    getElements: (): TemplateElement[] => [
      { id: uuidv4(), type: 'mask', shape: 'rect', x: 12, y: 12, width: 296, height: 626, radius: 38, rotation: 0, fill: 'rgba(34, 197, 94, 0.2)', stroke: '#16a34a', opacity: 1 },
      { id: uuidv4(), type: 'safeArea', shape: 'rect', x: 24, y: 24, width: 272, height: 602, radius: 26, rotation: 0, fill: 'rgba(59, 130, 246, 0.2)', stroke: '#2563eb', opacity: 1 },
      { id: uuidv4(), type: 'cameraCutout', shape: 'rect', x: 24, y: 24, width: 80, height: 80, radius: 20, rotation: 0, fill: '#1e293b', stroke: '#0f172a', opacity: 0.9 }
    ]
  },
  {
    id: 'iphone-14-pro-max',
    name: 'iPhone 14 Pro Max',
    brand: 'Apple',
    width: 340,
    height: 700,
    getSvg: () => `data:image/svg+xml;utf8,<svg width="340" height="700" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="332" height="692" rx="50" fill="none" stroke="%231e293b" stroke-width="8"/><rect x="10" y="10" width="320" height="680" rx="45" fill="none" stroke="%23cbd5e1" stroke-width="2"/></svg>`,
    getElements: (): TemplateElement[] => [
      { id: uuidv4(), type: 'mask', shape: 'rect', x: 12, y: 12, width: 316, height: 676, radius: 43, rotation: 0, fill: 'rgba(34, 197, 94, 0.2)', stroke: '#16a34a', opacity: 1 },
      { id: uuidv4(), type: 'safeArea', shape: 'rect', x: 24, y: 24, width: 292, height: 652, radius: 31, rotation: 0, fill: 'rgba(59, 130, 246, 0.2)', stroke: '#2563eb', opacity: 1 },
      { id: uuidv4(), type: 'cameraCutout', shape: 'rect', x: 24, y: 24, width: 105, height: 115, radius: 26, rotation: 0, fill: '#1e293b', stroke: '#0f172a', opacity: 0.9 }
    ]
  },
  {
    id: 'iphone-14',
    name: 'iPhone 14',
    brand: 'Apple',
    width: 320,
    height: 650,
    getSvg: () => `data:image/svg+xml;utf8,<svg width="320" height="650" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="312" height="642" rx="45" fill="none" stroke="%231e293b" stroke-width="8"/><rect x="10" y="10" width="300" height="630" rx="40" fill="none" stroke="%23cbd5e1" stroke-width="2"/></svg>`,
    getElements: (): TemplateElement[] => [
      { id: uuidv4(), type: 'mask', shape: 'rect', x: 12, y: 12, width: 296, height: 626, radius: 38, rotation: 0, fill: 'rgba(34, 197, 94, 0.2)', stroke: '#16a34a', opacity: 1 },
      { id: uuidv4(), type: 'safeArea', shape: 'rect', x: 24, y: 24, width: 272, height: 602, radius: 26, rotation: 0, fill: 'rgba(59, 130, 246, 0.2)', stroke: '#2563eb', opacity: 1 },
      { id: uuidv4(), type: 'cameraCutout', shape: 'rect', x: 24, y: 24, width: 80, height: 80, radius: 20, rotation: 0, fill: '#1e293b', stroke: '#0f172a', opacity: 0.9 }
    ]
  },
  {
    id: 'iphone-13',
    name: 'iPhone 13',
    brand: 'Apple',
    width: 320,
    height: 650,
    getSvg: () => `data:image/svg+xml;utf8,<svg width="320" height="650" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="312" height="642" rx="45" fill="none" stroke="%231e293b" stroke-width="8"/><rect x="10" y="10" width="300" height="630" rx="40" fill="none" stroke="%23cbd5e1" stroke-width="2"/></svg>`,
    getElements: (): TemplateElement[] => [
      { id: uuidv4(), type: 'mask', shape: 'rect', x: 12, y: 12, width: 296, height: 626, radius: 38, rotation: 0, fill: 'rgba(34, 197, 94, 0.2)', stroke: '#16a34a', opacity: 1 },
      { id: uuidv4(), type: 'safeArea', shape: 'rect', x: 24, y: 24, width: 272, height: 602, radius: 26, rotation: 0, fill: 'rgba(59, 130, 246, 0.2)', stroke: '#2563eb', opacity: 1 },
      { id: uuidv4(), type: 'cameraCutout', shape: 'rect', x: 24, y: 24, width: 75, height: 75, radius: 18, rotation: 0, fill: '#1e293b', stroke: '#0f172a', opacity: 0.9 }
    ]
  },

  // SAMSUNG
  {
    id: 'galaxy-s24-ultra',
    name: 'Galaxy S24 Ultra',
    brand: 'Samsung',
    width: 330,
    height: 680,
    getSvg: () => `data:image/svg+xml;utf8,<svg width="330" height="680" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="322" height="672" rx="8" fill="none" stroke="%231e293b" stroke-width="8"/></svg>`,
    getElements: (): TemplateElement[] => [
      { id: uuidv4(), type: 'mask', shape: 'rect', x: 8, y: 8, width: 314, height: 664, radius: 4, rotation: 0, fill: 'rgba(34, 197, 94, 0.2)', stroke: '#16a34a', opacity: 1 },
      { id: uuidv4(), type: 'safeArea', shape: 'rect', x: 20, y: 20, width: 290, height: 640, radius: 4, rotation: 0, fill: 'rgba(59, 130, 246, 0.2)', stroke: '#2563eb', opacity: 1 },
      { id: uuidv4(), type: 'cameraCutout', shape: 'rect', x: 24, y: 24, width: 45, height: 130, radius: 22, rotation: 0, fill: '#1e293b', stroke: '#0f172a', opacity: 0.9 }
    ]
  },
  {
    id: 'galaxy-s24-plus',
    name: 'Galaxy S24+',
    brand: 'Samsung',
    width: 320,
    height: 660,
    getSvg: () => `data:image/svg+xml;utf8,<svg width="320" height="660" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="312" height="652" rx="35" fill="none" stroke="%231e293b" stroke-width="8"/></svg>`,
    getElements: (): TemplateElement[] => [
      { id: uuidv4(), type: 'mask', shape: 'rect', x: 10, y: 10, width: 300, height: 640, radius: 30, rotation: 0, fill: 'rgba(34, 197, 94, 0.2)', stroke: '#16a34a', opacity: 1 },
      { id: uuidv4(), type: 'safeArea', shape: 'rect', x: 24, y: 24, width: 272, height: 612, radius: 20, rotation: 0, fill: 'rgba(59, 130, 246, 0.2)', stroke: '#2563eb', opacity: 1 },
      { id: uuidv4(), type: 'cameraCutout', shape: 'rect', x: 24, y: 24, width: 40, height: 110, radius: 20, rotation: 0, fill: '#1e293b', stroke: '#0f172a', opacity: 0.9 }
    ]
  },
  {
    id: 'galaxy-s23-ultra',
    name: 'Galaxy S23 Ultra',
    brand: 'Samsung',
    width: 330,
    height: 680,
    getSvg: () => `data:image/svg+xml;utf8,<svg width="330" height="680" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="322" height="672" rx="8" fill="none" stroke="%231e293b" stroke-width="8"/></svg>`,
    getElements: (): TemplateElement[] => [
      { id: uuidv4(), type: 'mask', shape: 'rect', x: 8, y: 8, width: 314, height: 664, radius: 4, rotation: 0, fill: 'rgba(34, 197, 94, 0.2)', stroke: '#16a34a', opacity: 1 },
      { id: uuidv4(), type: 'safeArea', shape: 'rect', x: 20, y: 20, width: 290, height: 640, radius: 4, rotation: 0, fill: 'rgba(59, 130, 246, 0.2)', stroke: '#2563eb', opacity: 1 },
      { id: uuidv4(), type: 'cameraCutout', shape: 'rect', x: 24, y: 24, width: 45, height: 130, radius: 22, rotation: 0, fill: '#1e293b', stroke: '#0f172a', opacity: 0.9 }
    ]
  },
  {
    id: 'galaxy-z-flip-5',
    name: 'Galaxy Z Flip 5',
    brand: 'Samsung',
    width: 300,
    height: 680,
    getSvg: () => `data:image/svg+xml;utf8,<svg width="300" height="680" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="292" height="672" rx="30" fill="none" stroke="%231e293b" stroke-width="8"/><line x1="4" y1="340" x2="296" y2="340" stroke="%231e293b" stroke-width="4" stroke-dasharray="8 4"/></svg>`,
    getElements: (): TemplateElement[] => [
      { id: uuidv4(), type: 'mask', shape: 'rect', x: 10, y: 10, width: 280, height: 660, radius: 25, rotation: 0, fill: 'rgba(34, 197, 94, 0.2)', stroke: '#16a34a', opacity: 1 },
      { id: uuidv4(), type: 'safeArea', shape: 'rect', x: 24, y: 24, width: 252, height: 632, radius: 15, rotation: 0, fill: 'rgba(59, 130, 246, 0.2)', stroke: '#2563eb', opacity: 1 },
      { id: uuidv4(), type: 'cameraCutout', shape: 'rect', x: 24, y: 24, width: 100, height: 50, radius: 25, rotation: 0, fill: '#1e293b', stroke: '#0f172a', opacity: 0.9 }
    ]
  },

  // PIXEL
  {
    id: 'pixel-8-pro',
    name: 'Pixel 8 Pro',
    brand: 'Pixel',
    width: 320,
    height: 660,
    getSvg: () => `data:image/svg+xml;utf8,<svg width="320" height="660" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="312" height="652" rx="35" fill="none" stroke="%231e293b" stroke-width="8"/></svg>`,
    getElements: (): TemplateElement[] => [
      { id: uuidv4(), type: 'mask', shape: 'rect', x: 10, y: 10, width: 300, height: 640, radius: 30, rotation: 0, fill: 'rgba(34, 197, 94, 0.2)', stroke: '#16a34a', opacity: 1 },
      { id: uuidv4(), type: 'safeArea', shape: 'rect', x: 24, y: 24, width: 272, height: 612, radius: 20, rotation: 0, fill: 'rgba(59, 130, 246, 0.2)', stroke: '#2563eb', opacity: 1 },
      { id: uuidv4(), type: 'cameraCutout', shape: 'rect', x: 10, y: 60, width: 300, height: 55, radius: 10, rotation: 0, fill: '#1e293b', stroke: '#0f172a', opacity: 0.9 }
    ]
  },
  {
    id: 'pixel-8',
    name: 'Pixel 8',
    brand: 'Pixel',
    width: 310,
    height: 640,
    getSvg: () => `data:image/svg+xml;utf8,<svg width="310" height="640" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="302" height="632" rx="35" fill="none" stroke="%231e293b" stroke-width="8"/></svg>`,
    getElements: (): TemplateElement[] => [
      { id: uuidv4(), type: 'mask', shape: 'rect', x: 10, y: 10, width: 290, height: 620, radius: 30, rotation: 0, fill: 'rgba(34, 197, 94, 0.2)', stroke: '#16a34a', opacity: 1 },
      { id: uuidv4(), type: 'safeArea', shape: 'rect', x: 24, y: 24, width: 262, height: 592, radius: 20, rotation: 0, fill: 'rgba(59, 130, 246, 0.2)', stroke: '#2563eb', opacity: 1 },
      { id: uuidv4(), type: 'cameraCutout', shape: 'rect', x: 10, y: 60, width: 290, height: 50, radius: 10, rotation: 0, fill: '#1e293b', stroke: '#0f172a', opacity: 0.9 }
    ]
  },
  {
    id: 'pixel-7a',
    name: 'Pixel 7a',
    brand: 'Pixel',
    width: 310,
    height: 640,
    getSvg: () => `data:image/svg+xml;utf8,<svg width="310" height="640" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="302" height="632" rx="30" fill="none" stroke="%231e293b" stroke-width="8"/></svg>`,
    getElements: (): TemplateElement[] => [
      { id: uuidv4(), type: 'mask', shape: 'rect', x: 10, y: 10, width: 290, height: 620, radius: 25, rotation: 0, fill: 'rgba(34, 197, 94, 0.2)', stroke: '#16a34a', opacity: 1 },
      { id: uuidv4(), type: 'safeArea', shape: 'rect', x: 24, y: 24, width: 262, height: 592, radius: 15, rotation: 0, fill: 'rgba(59, 130, 246, 0.2)', stroke: '#2563eb', opacity: 1 },
      { id: uuidv4(), type: 'cameraCutout', shape: 'rect', x: 10, y: 60, width: 290, height: 45, radius: 8, rotation: 0, fill: '#1e293b', stroke: '#0f172a', opacity: 0.9 }
    ]
  },

  // OTHERS
  {
    id: 'oneplus-12',
    name: 'OnePlus 12',
    brand: 'OnePlus',
    width: 330,
    height: 680,
    getSvg: () => `data:image/svg+xml;utf8,<svg width="330" height="680" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="322" height="672" rx="35" fill="none" stroke="%231e293b" stroke-width="8"/></svg>`,
    getElements: (): TemplateElement[] => [
      { id: uuidv4(), type: 'mask', shape: 'rect', x: 10, y: 10, width: 310, height: 660, radius: 30, rotation: 0, fill: 'rgba(34, 197, 94, 0.2)', stroke: '#16a34a', opacity: 1 },
      { id: uuidv4(), type: 'safeArea', shape: 'rect', x: 24, y: 24, width: 282, height: 632, radius: 20, rotation: 0, fill: 'rgba(59, 130, 246, 0.2)', stroke: '#2563eb', opacity: 1 },
      { id: uuidv4(), type: 'cameraCutout', shape: 'circle', x: 70, y: 120, width: 120, height: 120, radius: 60, rotation: 0, fill: '#1e293b', stroke: '#0f172a', opacity: 0.9 }
    ]
  },
  {
    id: 'xiaomi-14-pro',
    name: 'Xiaomi 14 Pro',
    brand: 'Xiaomi',
    width: 330,
    height: 670,
    getSvg: () => `data:image/svg+xml;utf8,<svg width="330" height="670" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="322" height="662" rx="30" fill="none" stroke="%231e293b" stroke-width="8"/></svg>`,
    getElements: (): TemplateElement[] => [
      { id: uuidv4(), type: 'mask', shape: 'rect', x: 10, y: 10, width: 310, height: 650, radius: 25, rotation: 0, fill: 'rgba(34, 197, 94, 0.2)', stroke: '#16a34a', opacity: 1 },
      { id: uuidv4(), type: 'safeArea', shape: 'rect', x: 24, y: 24, width: 282, height: 622, radius: 15, rotation: 0, fill: 'rgba(59, 130, 246, 0.2)', stroke: '#2563eb', opacity: 1 },
      { id: uuidv4(), type: 'cameraCutout', shape: 'rect', x: 24, y: 24, width: 130, height: 130, radius: 20, rotation: 0, fill: '#1e293b', stroke: '#0f172a', opacity: 0.9 }
    ]
  }
];
