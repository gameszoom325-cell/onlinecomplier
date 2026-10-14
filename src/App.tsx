import { useState, useEffect, useRef, useCallback } from "react";
import { Sidebar } from "./components/Sidebar";
import { CodeEditor } from "./components/CodeEditor";
import { OutputPane, OutputStage } from "./components/OutputPane";
import { Splitter } from "./components/Splitter";
import { LANGUAGES, LanguageConfig, DEFAULT_LANGUAGE } from "./languages";
import { 
  OUTPUT_MODE, 
  OUTPUT_IMAGE, 
  OUTPUT_CAPTION, 
  FAKE_RUN_DELAY_MS 
} from "./config";
import { executeRealCode, ExecutionResult } from "./utils/piston";
import { Play, RotateCw, Terminal } from "lucide-react";
import { LanguageIcon } from "./components/LanguageIcons";

export default function App() {
  // Current active language
  const [currentLanguage, setCurrentLanguage] = useState<LanguageConfig>(() => {
    try {
      const savedLangId = localStorage.getItem("coderunner_active_lang");
      if (savedLangId) {
        const found = LANGUAGES.find((l) => l.id === savedLangId);
        if (found) return found;
      }
    } catch {
      // ignore
    }
    return DEFAULT_LANGUAGE;
  });

  // Code state
  const [code, setCode] = useState<string>(() => {
    return currentLanguage.starterCode;
  });

  // Previous saved code for restore toast
  const [savedPreviousCode, setSavedPreviousCode] = useState<string | null>(null);
  const [showRestoreToast, setShowRestoreToast] = useState<boolean>(false);

  // Preload output image on page load for instantaneous rendering
  useEffect(() => {
    if (typeof window !== "undefined" && OUTPUT_IMAGE) {
      const img = new Image();
      img.src = OUTPUT_IMAGE;
    }
  }, []);

  // Check on initial load if localStorage has previous code
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`coderunner_code_${currentLanguage.id}`);
      if (saved && saved.trim() !== currentLanguage.starterCode.trim()) {
        setSavedPreviousCode(saved);
        setShowRestoreToast(true);
      }
    } catch {
      // ignore
    }
  }, [currentLanguage.id, currentLanguage.starterCode]);

  // Layout splitter width (percentage of editor pane width)
  const [editorWidthPercent, setEditorWidthPercent] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);

  // Output execution states
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [stage, setStage] = useState<OutputStage>("idle");
  const [stageLogs, setStageLogs] = useState<string[]>([]);
  const [realResult, setRealResult] = useState<ExecutionResult | null>(null);

  // Editor cursor tracker
  const [, setCursorPos] = useState({ line: 1, col: 1 });

  // Timeouts reference for cancelling
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  };

  useEffect(() => {
    return () => clearAllTimeouts();
  }, []);

  // Save current code to localStorage on edit
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    try {
      localStorage.setItem(`coderunner_code_${currentLanguage.id}`, newCode);
    } catch {
      // ignore
    }
  };

  // Switch language
  const handleSelectLanguage = (lang: LanguageConfig) => {
    if (lang.id === currentLanguage.id) return;
    setCurrentLanguage(lang);
    try {
      localStorage.setItem("coderunner_active_lang", lang.id);
      const saved = localStorage.getItem(`coderunner_code_${lang.id}`);
      if (saved && saved.trim() !== lang.starterCode.trim()) {
        setCode(lang.starterCode);
        setSavedPreviousCode(saved);
        setShowRestoreToast(true);
      } else {
        setCode(saved || lang.starterCode);
        setShowRestoreToast(false);
      }
    } catch {
      setCode(lang.starterCode);
      setShowRestoreToast(false);
    }
    // Reset output to clean state
    setStage("idle");
    setStageLogs([]);
    setRealResult(null);
  };

  // Restore previous code action
  const handleRestorePreviousCode = () => {
    if (savedPreviousCode) {
      setCode(savedPreviousCode);
    }
    setShowRestoreToast(false);
  };

  // Reset to starter template
  const handleResetCode = () => {
    setCode(currentLanguage.starterCode);
    try {
      localStorage.removeItem(`coderunner_code_${currentLanguage.id}`);
    } catch {
      // ignore
    }
    setShowRestoreToast(false);
  };

  // Clear output pane (from three-dot menu)
  const handleClearOutput = () => {
    clearAllTimeouts();
    setIsRunning(false);
    setStage("idle");
    setStageLogs([]);
    setRealResult(null);
  };

  // Run execution
  const handleRun = useCallback(async () => {
    if (isRunning) return;

    // Running again clears previous output first, then replays the sequence
    clearAllTimeouts();
    setIsRunning(true);
    setStage("idle");
    setStageLogs([]);
    setRealResult(null);

    if (OUTPUT_MODE) {
      // Sequence: "Compiling...", "Linking...", "Executing..." line by line (~2 seconds total)
      setStage("compiling");
      setStageLogs(["Compiling..."]);

      const totalDelay = Math.max(1600, FAKE_RUN_DELAY_MS + (Math.random() * 400 - 200));
      const step1Time = Math.round(totalDelay * 0.35);
      const step2Time = Math.round(totalDelay * 0.70);
      const step3Time = Math.round(totalDelay);

      // Step 2: Linking...
      const t1 = setTimeout(() => {
        setStage("linking");
        setStageLogs(["Compiling...", "Linking..."]);
      }, step1Time);
      timeoutsRef.current.push(t1);

      // Step 3: Executing...
      const t2 = setTimeout(() => {
        setStage("executing");
        setStageLogs(["Compiling...", "Linking...", "Executing..."]);
      }, step2Time);
      timeoutsRef.current.push(t2);

      // Step 4: The lines fade out and the image fades in
      const t3 = setTimeout(() => {
        setStage("output_done");
        setIsRunning(false);
      }, step3Time);
      timeoutsRef.current.push(t3);
    } else {
      // Real execution mode via Piston API
      setStage("compiling");
      setStageLogs(["Compiling...", "Executing..."]);

      try {
        const result = await executeRealCode(
          currentLanguage.pistonLang,
          currentLanguage.fileName,
          code,
          ""
        );
        setRealResult(result);
        setStage("real_done");
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Remote execution failed.";
        setRealResult({
          stdout: "",
          stderr: msg,
          output: msg,
          exitCode: 1,
          durationMs: 0,
          error: msg,
          language: currentLanguage.pistonLang,
        });
        setStage("error");
      } finally {
        setIsRunning(false);
      }
    }
  }, [isRunning, currentLanguage, code]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#FAFAFA] text-[#1E293B] font-sans antialiased">
      {/* Mobile Top Bar with Branding & Language horizontal scroll */}
      <div className="md:hidden flex flex-col bg-[#EEF2F6] border-b border-[#E2E8F0] select-none shrink-0">
        <div className="px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#0B4DF0] flex items-center justify-center text-white">
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-xs tracking-tight text-slate-800">
              Online Compiler
            </span>
          </div>
          <span className="text-[11px] font-mono font-medium text-slate-600 bg-white/70 px-2 py-0.5 rounded border border-slate-200">
            {currentLanguage.fileName}
          </span>
        </div>

        {/* Mobile Horizontal Language Icon Strip */}
        <div className="flex items-center gap-1.5 px-2 py-1.5 overflow-x-auto no-scrollbar border-t border-slate-200/60">
          {LANGUAGES.map((lang) => {
            const isActive = lang.id === currentLanguage.id;
            return (
              <button
                key={lang.id}
                onClick={() => handleSelectLanguage(lang)}
                disabled={isRunning}
                className={`min-w-[44px] h-[44px] rounded-lg flex flex-col items-center justify-center transition-all shrink-0 ${
                  isActive
                    ? "bg-[#0B4DF0] text-white shadow-xs"
                    : "bg-white/80 text-slate-600 border border-slate-200"
                }`}
              >
                <LanguageIcon id={lang.id} className="w-4 h-4" />
                <span className="text-[9px] font-bold mt-0.5 leading-none">
                  {lang.shortLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Desktop Container: Sidebar + Split Panes */}
      <div 
        ref={containerRef}
        className="flex-1 flex flex-col md:flex-row overflow-hidden relative"
      >
        {/* 1. LEFT SIDEBAR (about 70px wide, light grey background) */}
        <div className="hidden md:flex h-full shrink-0">
          <Sidebar
            currentLanguage={currentLanguage}
            onSelectLanguage={handleSelectLanguage}
            isRunning={isRunning}
          />
        </div>

        {/* 2. MAIN EDITOR PANE (resizable, default 50%) */}
        <section
          style={{ width: `${editorWidthPercent}%` }}
          aria-label="Code Editor"
          className="h-1/2 md:h-full flex flex-col shrink-0 overflow-hidden relative"
        >
          <CodeEditor
            language={currentLanguage}
            code={code}
            onChange={handleCodeChange}
            onRun={handleRun}
            onReset={handleResetCode}
            isRunning={isRunning}
            onCursorChange={(line, col) => setCursorPos({ line, col })}
            showRestoreToast={showRestoreToast}
            onRestorePreviousCode={handleRestorePreviousCode}
            onDismissRestoreToast={() => setShowRestoreToast(false)}
          />
        </section>

        {/* 3. SPLITTER between the panes */}
        <Splitter
          onResize={setEditorWidthPercent}
          containerRef={containerRef}
        />

        {/* 4. OUTPUT PANE (right half) */}
        <section
          style={{ width: `${100 - editorWidthPercent}%` }}
          aria-label="Program Output"
          className="h-1/2 md:h-full flex flex-col shrink-0 overflow-hidden"
        >
          <OutputPane
            stage={stage}
            stageLogs={stageLogs}
            outputImage={OUTPUT_IMAGE}
            outputCaption={OUTPUT_CAPTION}
            realResult={realResult}
            onClear={handleClearOutput}
          />
        </section>
      </div>

      {/* Mobile Sticky RUN Button at bottom (44px min touch target) */}
      <div className="md:hidden fixed bottom-4 right-4 z-40">
        <button
          onClick={handleRun}
          disabled={isRunning}
          aria-label="Run Code"
          className={`flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm text-white shadow-xl active:scale-95 transition-all min-h-[44px] min-w-[44px] cursor-pointer ${
            isRunning
              ? "bg-[#0B4DF0]/80 cursor-wait"
              : "bg-[#0B4DF0] hover:bg-[#0940CA]"
          }`}
        >
          {isRunning ? (
            <>
              <RotateCw className="w-4 h-4 animate-spin" />
              <span>Running...</span>
            </>
          ) : (
            <>
              <span>Run</span>
              <Play className="w-3.5 h-3.5 fill-white" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
