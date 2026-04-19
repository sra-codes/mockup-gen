'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Stage, Layer, Image as KonvaImage, Rect, Circle, Transformer, Group } from 'react-konva';
import useImage from 'use-image';
import { useTemplateStore, TemplateElement } from '@/store/useTemplateStore';

interface ElementProps {
  shapeProps: TemplateElement;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: Partial<TemplateElement>) => void;
  isInteractive?: boolean;
}

const Element = ({ shapeProps, isSelected, onSelect, onChange, isInteractive = true }: ElementProps) => {
  const shapeRef = useRef<any>(null);
  const trRef = useRef<any>(null);

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current && isInteractive) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected, isInteractive]);

  const handleDragEnd = (e: any) => {
    if (!isInteractive) return;
    onChange({
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleTransformEnd = (e: any) => {
    if (!isInteractive) return;
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    node.scaleX(1);
    node.scaleY(1);

    if (shapeProps.shape === 'rect') {
      onChange({
        x: node.x(),
        y: node.y(),
        width: Math.max(5, node.width() * scaleX),
        height: Math.max(5, node.height() * scaleY),
        rotation: node.rotation(),
      });
    } else {
      // Circle
      onChange({
        x: node.x(),
        y: node.y(),
        radius: Math.max(5, (node.radius() * scaleX)),
        width: Math.max(5, (node.radius() * scaleX) * 2),
        height: Math.max(5, (node.radius() * scaleX) * 2),
        rotation: node.rotation(),
      });
    }
  };

  const commonProps = {
    ...shapeProps,
    onClick: isInteractive ? onSelect : undefined,
    onTap: isInteractive ? onSelect : undefined,
    draggable: isInteractive,
    onDragEnd: handleDragEnd,
    onTransformEnd: handleTransformEnd,
    strokeWidth: 2,
    dash: isInteractive ? [5, 5] : undefined,
  };

  return (
    <>
      {shapeProps.shape === 'rect' ? (
        <Rect ref={shapeRef} {...commonProps} />
      ) : (
        <Circle 
          ref={shapeRef} 
          {...commonProps} 
          radius={shapeProps.radius || shapeProps.width / 2} 
          width={undefined} 
          height={undefined} 
        />
      )}
      {isSelected && isInteractive && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
          rotateEnabled={true}
          borderStroke="#6366f1"
          anchorStroke="#6366f1"
          anchorFill="#fff"
          anchorSize={8}
          borderDash={[3, 3]}
        />
      )}
    </>
  );
};

export function CanvasEditor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { 
    backgroundImage, 
    backgroundWidth,
    backgroundHeight,
    elements, 
    selectedId, 
    selectElement, 
    updateElement, 
    zoom, 
    setZoom,
    coverImage,
    coverProps,
    updateCoverProps,
    previewMode
  } = useTemplateStore();
  
  const [image] = useImage(backgroundImage || '');
  const [coverImg] = useImage(coverImage || '');

  const coverRef = useRef<any>(null);
  const coverTrRef = useRef<any>(null);
  const hasScene = Boolean(backgroundImage || coverImage);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (selectedId === 'cover' && coverTrRef.current && coverRef.current && !previewMode) {
      coverTrRef.current.nodes([coverRef.current]);
      coverTrRef.current.getLayer().batchDraw();
    }
  }, [selectedId, coverImage, previewMode]);

  const checkDeselect = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage() || e.target.hasName('backgroundImage');
    if (clickedOnEmpty) {
      selectElement(null);
    }
  };

  const handleWheel = (e: any) => {
    e.evt.preventDefault();
    const scaleBy = 1.05;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;
    
    if (newScale < 0.1 || newScale > 5) return;

    setZoom(newScale);

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    stage.position(newPos);
    stage.batchDraw();
  };

  const maskElement = elements.find(e => e.type === 'mask');

  const clipFunc = useCallback((ctx: any) => {
    if (!maskElement) return;
    ctx.beginPath();
    const { x, y, width, height, radius } = maskElement;
    if (radius) {
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
    } else {
      ctx.rect(x, y, width, height);
    }
    ctx.closePath();
  }, [maskElement]);

  const groupX = dimensions.width / 2 - (backgroundWidth || (image?.width || 0)) / 2;
  const groupY = dimensions.height / 2 - (backgroundHeight || (image?.height || 0)) / 2;

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full bg-slate-100 flex items-center justify-center overflow-hidden relative"
    >
      {!hasScene && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="text-center text-slate-400">
            <p className="text-lg font-medium">Start a new template</p>
            <p className="text-sm">Pick a preset mockup or upload a custom frame from the left panel.</p>
          </div>
        </div>
      )}

      {previewMode && hasScene && (
        <div className="absolute left-4 top-4 rounded-full bg-slate-900/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white z-10">
          Preview mode
        </div>
      )}

      {dimensions.width > 0 && dimensions.height > 0 && (
        <Stage
          width={dimensions.width}
          height={dimensions.height}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
          onWheel={handleWheel}
          draggable
          scaleX={zoom}
          scaleY={zoom}
          className="cursor-grab active:cursor-grabbing"
        >
          <Layer>
            <Group x={groupX} y={groupY}>
              {/* Cover Image (Clipped by Mask) */}
              {coverImg && maskElement && (
                <Group clipFunc={clipFunc}>
                  <KonvaImage
                    ref={coverRef}
                    image={coverImg}
                    x={coverProps.x}
                    y={coverProps.y}
                    scaleX={coverProps.scale}
                    scaleY={coverProps.scale}
                    rotation={coverProps.rotation}
                    draggable={!previewMode}
                    onClick={() => !previewMode && selectElement('cover')}
                    onTap={() => !previewMode && selectElement('cover')}
                    onDragEnd={(e) => {
                      updateCoverProps({
                        x: e.target.x(),
                        y: e.target.y(),
                      });
                    }}
                    onTransformEnd={(e) => {
                      const node = coverRef.current;
                      const scaleX = node.scaleX();
                      node.scaleX(scaleX);
                      node.scaleY(scaleX); // keep aspect ratio
                      updateCoverProps({
                        x: node.x(),
                        y: node.y(),
                        scale: scaleX,
                        rotation: node.rotation(),
                      });
                    }}
                  />
                </Group>
              )}

              {/* Background Frame */}
              {image && (
                <KonvaImage
                  image={image}
                  name="backgroundImage"
                  width={backgroundWidth || image.width}
                  height={backgroundHeight || image.height}
                />
              )}

              {/* Elements (Mask, Safe Area, Camera Cutout) */}
              {elements.map((el) => {
                if (previewMode) {
                  if (el.type === 'cameraCutout') {
                    return (
                      <Element
                        key={el.id}
                        shapeProps={{...el, fill: '#1e293b', stroke: 'transparent', opacity: 1}}
                        isSelected={false}
                        onSelect={() => {}}
                        onChange={() => {}}
                        isInteractive={false}
                      />
                    );
                  }
                  return null;
                }

                return (
                  <Element
                    key={el.id}
                    shapeProps={el}
                    isSelected={el.id === selectedId}
                    onSelect={() => selectElement(el.id)}
                    onChange={(newAttrs) => updateElement(el.id, newAttrs)}
                    isInteractive={true}
                  />
                );
              })}

              {/* Transformers */}
              {selectedId === 'cover' && !previewMode && coverImg && (
                <Transformer
                  ref={coverTrRef}
                  rotateEnabled={true}
                  enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
                  boundBoxFunc={(oldBox, newBox) => newBox}
                />
              )}
            </Group>
          </Layer>
        </Stage>
      )}

      {/* Zoom Controls Overlay */}
      <div className="absolute bottom-4 right-4 bg-white rounded-md shadow-md flex items-center p-1 z-10 border">
        <button 
          onClick={() => setZoom(Math.max(0.1, zoom - 0.1))}
          aria-label="Zoom out"
          className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded"
        >
          -
        </button>
        <span className="text-xs font-mono w-12 text-center">{Math.round(zoom * 100)}%</span>
        <button 
          onClick={() => setZoom(Math.min(5, zoom + 0.1))}
          aria-label="Zoom in"
          className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded"
        >
          +
        </button>
      </div>
    </div>
  );
}
