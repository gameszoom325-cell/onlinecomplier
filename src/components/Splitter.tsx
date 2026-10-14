import React, { useCallback, useEffect, useState } from "react";

interface SplitterProps {
  onResize: (newLeftPercent: number) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const Splitter: React.FC<SplitterProps> = ({ onResize, containerRef }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const offset = clientX - rect.left;
      let percent = (offset / rect.width) * 100;
      // Clamp between 25% and 75%
      percent = Math.max(25, Math.min(75, percent));
      onResize(percent);
    },
    [isDragging, containerRef, onResize]
  );

  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    const onEnd = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onEnd);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, [isDragging, handleMove]);

  return (
    <div
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      role="separator"
      aria-orientation="vertical"
      aria-label="Resize editor and output panels"
      className={`hidden md:flex relative w-1.5 hover:w-2 bg-[#E2E8F0] hover:bg-[#CBD5E1] cursor-col-resize items-center justify-center transition-all z-20 shrink-0 select-none ${
        isDragging ? "bg-[#0B4DF0] w-2" : ""
      }`}
    >
      {/* Pill handle with faint dotted grip */}
      <div className="absolute top-1/2 -translate-y-1/2 w-3.5 h-7 bg-white border border-[#CBD5E1] shadow-xs rounded-full flex items-center justify-center pointer-events-none">
        <div className="flex flex-col gap-0.5 items-center">
          <span className="w-0.5 h-0.5 rounded-full bg-slate-400"></span>
          <span className="w-0.5 h-0.5 rounded-full bg-slate-400"></span>
          <span className="w-0.5 h-0.5 rounded-full bg-slate-400"></span>
        </div>
      </div>
    </div>
  );
};
