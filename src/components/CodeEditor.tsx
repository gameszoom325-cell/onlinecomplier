import React, { useRef, useState } from "react";
import Editor, { OnMount, BeforeMount } from "@monaco-editor/react";
import { 
  Play, 
  RotateCw, 
  RotateCcw, 
  Copy, 
  Check, 
  X,
  FileCode2
} from "lucide-react";
import { LanguageConfig } from "../languages";

// Type for Monaco editor instance
type MonacoEditorInstance = Parameters<OnMount>[0];

interface CodeEditorProps {
  language: LanguageConfig;
  code: string;
  onChange: (value: string) => void;
  onRun: () => void;
  onReset: () => void;
  isRunning: boolean;
  onCursorChange: (line: number, column: number) => void;
  showRestoreToast: boolean;
  onRestorePreviousCode: () => void;
  onDismissRestoreToast: () => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  code,
  onChange,
  onRun,
  onReset,
  isRunning,
  onCursorChange,
  showRestoreToast,
  onRestorePreviousCode,
  onDismissRestoreToast,
}) => {
  const [copied, setCopied] = useState(false);
  const editorRef = useRef<MonacoEditorInstance | null>(null);

  const handleBeforeMount: BeforeMount = (monaco) => {
    // Custom clean light IDE theme matching the specification
    monaco.editor.defineTheme("clean-light-ide", {
      base: "vs",
      inherit: true,
      rules: [
        { token: "keyword", foreground: "8250DF", fontStyle: "bold" },
        { token: "string", foreground: "9A4600" },
        { token: "comment", foreground: "6E7781", fontStyle: "italic" },
        { token: "number", foreground: "098658" },
        { token: "type", foreground: "0B4DF0" },
        { token: "delimiter", foreground: "334155" },
        { token: "preprocessor", foreground: "057A77", fontStyle: "bold" }, // Teal for #include
      ],
      colors: {
        "editor.background": "#FAFAFA",
        "editor.foreground": "#1E293B",
        "editor.lineHighlightBackground": "#F1F5F9",
        "editorLineNumber.foreground": "#94A3B8",
        "editorLineNumber.activeForeground": "#0B4DF0",
        "editorGutter.background": "#FAFAFA",
        "editorCursor.foreground": "#0B4DF0",
        "editorIndentGuide.background": "#E2E8F0",
        "editorIndentGuide.activeBackground": "#CBD5E1",
        "scrollbarSlider.background": "#CBD5E144",
        "scrollbarSlider.hoverBackground": "#94A3B866",
      },
    });
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Track cursor movement
    editor.onDidChangeCursorPosition((e) => {
      onCursorChange(e.position.lineNumber, e.position.column);
    });

    // Ctrl+Enter / Cmd+Enter to Run
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      onRun();
    });

    const pos = editor.getPosition();
    if (pos) {
      onCursorChange(pos.lineNumber, pos.column);
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#FAFAFA] border-r border-[#E2E8F0] overflow-hidden relative select-none">
      {/* Top bar with file tab on left and solid blue Run button on right */}
      <div className="h-11 bg-white border-b border-[#E2E8F0] px-3.5 flex items-center justify-between shrink-0">
        {/* Left: File Tab */}
        <div className="flex items-center">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#FAFAFA] border-b-2 border-[#0B4DF0] text-xs font-semibold text-[#1E293B] tracking-tight">
            <FileCode2 className="w-3.5 h-3.5 text-[#0B4DF0]" />
            <span className="font-mono">{language.fileName}</span>
          </div>
        </div>

        {/* Right: Actions and Solid Blue Run ▶ Button */}
        <div className="flex items-center gap-2">
          {/* Subtle Reset button */}
          <button
            onClick={onReset}
            title="Reset to starter template"
            className="flex items-center gap-1 px-2 py-1 text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Copy code button */}
          <button
            onClick={handleCopyCode}
            title="Copy code"
            className="flex items-center gap-1 px-2 py-1 text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
          </button>

          {/* Solid blue Run ▶ button */}
          <button
            onClick={onRun}
            disabled={isRunning}
            aria-label={isRunning ? "Code is running" : "Run code"}
            className={`flex items-center gap-2 px-4 py-1.5 rounded text-xs font-bold text-white transition-all shadow-xs cursor-pointer ${
              isRunning
                ? "bg-[#0B4DF0]/70 cursor-wait"
                : "bg-[#0B4DF0] hover:bg-[#0940CA] active:scale-95"
            }`}
          >
            {isRunning ? (
              <>
                <RotateCw className="w-3.5 h-3.5 animate-spin" />
                <span>Running...</span>
              </>
            ) : (
              <>
                <span>Run</span>
                <Play className="w-3 h-3 fill-white text-white" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Monaco Editor Container */}
      <div className="relative flex-1 w-full h-[calc(100%-2.75rem)] bg-[#FAFAFA]">
        <Editor
          height="100%"
          language={language.monacoLang}
          value={code}
          theme="clean-light-ide"
          beforeMount={handleBeforeMount}
          onChange={(val) => onChange(val || "")}
          onMount={handleEditorDidMount}
          loading={
            <div className="flex flex-col items-center justify-center h-full gap-2 text-slate-400">
              <RotateCw className="w-6 h-6 animate-spin text-[#0B4DF0]" />
              <span className="text-xs font-mono">Loading Monaco Editor...</span>
            </div>
          }
          options={{
            fontSize: 13.5,
            fontFamily: "'JetBrains Mono', 'Fira Code', ui-monospace, monospace",
            fontLigatures: true,
            tabSize: 4,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            lineNumbers: "on",
            lineNumbersMinChars: 3,
            roundedSelection: false,
            padding: { top: 14, bottom: 14 },
            renderLineHighlight: "line",
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            smoothScrolling: true,
            folding: true,
            showFoldingControls: "always",
            bracketPairColorization: { enabled: true },
          }}
        />

        {/* 5. TOAST (bottom-left of editor pane) */}
        {showRestoreToast && (
          <div 
            role="status"
            className="absolute bottom-4 left-4 z-20 bg-white border border-[#E2E8F0] shadow-lg rounded-xl px-3.5 py-2.5 flex items-center gap-3 text-xs text-slate-700 animate-fadeIn"
          >
            <span>Previous code was kept.</span>
            <button
              onClick={onRestorePreviousCode}
              className="text-[#0B4DF0] hover:text-[#0940CA] font-semibold underline underline-offset-2 cursor-pointer"
            >
              Restore previous code
            </button>
            <button
              onClick={onDismissRestoreToast}
              aria-label="Dismiss notification"
              className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors ml-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
