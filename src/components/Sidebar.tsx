import React from "react";
import { LanguageConfig, LANGUAGES } from "../languages";
import { LanguageIcon } from "./LanguageIcons";

interface SidebarProps {
  currentLanguage: LanguageConfig;
  onSelectLanguage: (lang: LanguageConfig) => void;
  isRunning: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentLanguage,
  onSelectLanguage,
  isRunning,
}) => {
  return (
    <aside 
      aria-label="Programming Languages"
      className="w-[70px] bg-[#EEF2F6] border-r border-[#E2E8F0] flex flex-col items-center py-3 overflow-y-auto shrink-0 select-none z-10"
    >
      <div className="flex flex-col items-center gap-2.5 w-full px-2.5">
        {LANGUAGES.map((lang) => {
          const isActive = lang.id === currentLanguage.id;

          return (
            <button
              key={lang.id}
              onClick={() => onSelectLanguage(lang)}
              disabled={isRunning}
              title={`${lang.name} (${lang.fileName})`}
              aria-label={`Select ${lang.name}`}
              aria-pressed={isActive}
              className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center transition-all duration-150 cursor-pointer group relative ${
                isActive
                  ? "bg-[#0B4DF0] text-white shadow-md shadow-[#0B4DF0]/25 scale-105"
                  : "bg-white/70 hover:bg-white text-slate-500 hover:text-slate-800 hover:-translate-y-0.5 border border-slate-200/80 shadow-xs"
              } ${isRunning ? "opacity-60 cursor-not-allowed pointer-events-none" : ""}`}
            >
              <LanguageIcon id={lang.id} className="w-5 h-5" />
              <span className={`text-[9px] font-bold tracking-tight mt-0.5 leading-none ${isActive ? "text-white/90" : "text-slate-500 group-hover:text-slate-700"}`}>
                {lang.shortLabel}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
