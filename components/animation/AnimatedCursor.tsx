import { useState, useEffect, useRef } from 'react';

type TrailItem = { x: number; y: number; id: number };
type CursorVariant = 'default' | 'hover' | 'click' | 'text';

const cursorVariants = {
  default: { size: 'w-8 h-8', bg: 'bg-white', border: 'border-2 border-white', scale: 'scale-100', opacity: 'opacity-80' },
  hover: { size: 'w-16 h-16', bg: 'bg-purple-500', border: 'border-2 border-purple-400', scale: 'scale-110', opacity: 'opacity-60' },
  click: { size: 'w-6 h-6', bg: 'bg-red-500', border: 'border-2 border-red-400', scale: 'scale-75', opacity: 'opacity-90' },
  text: { size: 'w-1 h-8', bg: 'bg-blue-500', border: 'border-2 border-blue-400', scale: 'scale-100', opacity: 'opacity-80' },
};

const AnimatedCursor = () => {
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<TrailItem[]>([]);

  const cursorRef = useRef<HTMLDivElement | null>(null);
  const currentMousePos = useRef({ x: 0, y: 0 });
  const currentCursorPos = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number | null>(null);
  const lastTrailUpdateTime = useRef(0);

  // Hide the default cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  // Main animation loop and event listeners
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      currentMousePos.current = { x: e.clientX, y: e.clientY };
      
      // Determine cursor variant based on the hovered element
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element) {
        const tag = element.tagName.toUpperCase();
        if (tag === 'A' || tag === 'BUTTON' || element.classList.contains('hoverable')) {
          setCursorVariant('hover');
        } else if (tag.match(/^(P|SPAN|H[1-6]|LI|TD|DIV)$/)) {
          setCursorVariant('text');
        } else {
          setCursorVariant('default');
        }
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const animateCursor = (timestamp: number) => {
      // Smoothly interpolate the cursor's position
      const lerpFactor = 0.15;
      currentCursorPos.current.x += (currentMousePos.current.x - currentCursorPos.current.x) * lerpFactor;
      currentCursorPos.current.y += (currentMousePos.current.y - currentCursorPos.current.y) * lerpFactor;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${currentCursorPos.current.x - (cursorRef.current.offsetWidth / 2)}px, ${currentCursorPos.current.y - (cursorRef.current.offsetHeight / 2)}px)`;
      }

      // Add a new trail item at a throttled rate (e.g., every 16ms for ~60fps)
      if (timestamp - lastTrailUpdateTime.current > 16) {
        setTrail(prevTrail => {
          const newTrail = [...prevTrail, { x: currentMousePos.current.x, y: currentMousePos.current.y, id: Date.now() }];
          return newTrail.slice(-20); // Keep only the last 20 items
        });
        lastTrailUpdateTime.current = timestamp;
      }
      
      requestRef.current = requestAnimationFrame(animateCursor);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    requestRef.current = requestAnimationFrame(animateCursor);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  const currentVariant = isClicking ? 'click' : cursorVariant;
  const variant = cursorVariants[currentVariant as keyof typeof cursorVariants];

  return (
    <>
      {/* Trail items */}
      {trail.map((pos, index) => (
        <div
          key={pos.id}
          className="fixed pointer-events-none z-40 w-2 h-2 bg-white rounded-full transition-opacity duration-300"
          style={{
            left: pos.x,
            top: pos.y,
            transform: 'translate(-50%, -50%)',
            opacity: ((trail.length - index) / trail.length) * 0.5,
          }}
        />
      ))}
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-50 transition-all duration-200 ease-in-out rounded-full ${variant.size} ${variant.bg} ${variant.border} ${variant.scale} ${variant.opacity}`}
        style={{
          transform: `translate(-50%, -50%)`,
        }}
      />
    </>
  );
};

export default AnimatedCursor;