<div align="center">

# 🎨 MockUpGen

**An interactive phone case template builder for mockups, print-safe areas, and export-ready layout data.**

🖼️ Upload a frame • 📐 Define mask and safe zones • 🎯 Place cover art • 👀 Preview the result • 📦 Export clean JSON

</div>

## ✨ What This Project Does

MockUpGen is a visual editor for building phone case templates in the browser. It helps you line up a device frame, printable mask area, safe area, and camera cutout, then export the result as normalized JSON for downstream production or automation workflows.

This project is useful when you need a fast way to create repeatable phone case layout templates without manually measuring everything in design software.

## 🧩 Core Features

- 📱 Load predefined phone mockups grouped by brand.
- 🖼️ Upload a custom frame image if you want to work from your own asset.
- 🎨 Upload cover artwork and move, scale, or rotate it inside the case area.
- 📐 Add and edit mask, safe area, and camera cutout overlays.
- 🎛️ Fine-tune element properties from the side panel.
- ↩️ Undo, redo, and reset editor actions.
- 👀 Toggle preview mode to inspect the design without editing guides.
- 🔍 Zoom and pan the canvas for more precise adjustments.
- 📦 Export template data as JSON with coordinates normalized to the frame size.

## 🧭 How The Editor Works

1. Choose a preset phone mockup or upload a custom frame.
2. Upload the cover design you want to preview on the case.
3. Adjust the mask area, safe area, and camera cutout overlays.
4. Use the properties panel to tweak position, size, color, opacity, and rotation.
5. Switch to preview mode to see the artwork without editing controls.
6. Export the finished template as JSON.

## 📤 Export Output

The export is designed to be machine-friendly. Values are normalized against the current frame dimensions so the output can be reused consistently across workflows.

```json
{
   "frame": "frame.png",
   "mask": [
      {
         "x": 0.03,
         "y": 0.03,
         "width": 0.92,
         "height": 0.96
      }
   ],
   "safeArea": [
      {
         "x": 0.07,
         "y": 0.07,
         "width": 0.86,
         "height": 0.9
      }
   ],
   "cameraCutout": [
      {
         "x": 0.08,
         "y": 0.04,
         "width": 0.24,
         "height": 0.12,
         "shape": "rect"
      }
   ]
}
```

The numbers above are example values. Actual output depends on the template you build in the editor.

## 🛠️ Tech Stack

| Layer | Tools |
| --- | --- |
| Framework | Next.js 15, React 19, TypeScript |
| Canvas Editing | Konva, React Konva, use-image |
| State Management | Zustand |
| UI Styling | Tailwind CSS 4 |
| Icons and Motion | lucide-react, motion |

## 🚀 Run Locally

Run the commands from the `MockUpGen` folder that contains `package.json`.

### Prerequisites

- Node.js
- npm

### Start The App

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## 📜 Available Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the local development server |
| `npm run lint` | Runs ESLint across the project |
| `npm run build` | Creates a production build |
| `npm run start` | Starts the production server |
| `npm run clean` | Clears Next.js build artifacts |

## 🗂️ Project Structure

```text
app/                  Next.js app shell, layout, page entry, global styles
components/           Toolbar, canvas editor, and properties panel
hooks/                Shared hooks
lib/mockups.ts        Device presets and default overlay templates
store/                Zustand store for editor state and actions
```

## 🔐 Environment

No external API keys or backend services are required for the current version of the app.

## 🎯 In One Line

MockUpGen turns phone case template setup into a visual workflow instead of a manual coordinate-editing task.
