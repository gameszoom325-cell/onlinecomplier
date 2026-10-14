import React, { useState, useRef, useEffect } from "react";
import { 
  Share2, 
  MoreVertical, 
  Trash2, 
  Copy, 
  Download, 
  Check, 
  Link,
  RotateCw
} from "lucide-react";
import { ExecutionResult } from "../utils/piston";

export type OutputStage = "idle" | "compiling" | "linking" | "executing" | "output_done" | "real_done" | "error";

interface OutputPaneProps {
  stage: OutputStage;
  stageLogs: string[];
  outputImage: string;
  outputCaption: string;
  realResult: ExecutionResult | null;
  onClear: () => void;
  onRetryImage?: () => void;
}

export const OutputPane: React.FC<OutputPaneProps> = ({
  stage,
  stageLogs,
  outputImage,
  outputCaption,
  realResult,
  onClear,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedOutput, setCopiedOutput] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [imageReloadKey, setImageReloadKey] = useState(0);

  const menuRef = useRef<HTMLDivElement>(null);
  const shareRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
        setShowShare(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset image failure state when image changes or run replays
  useEffect(() => {
    setImageFailed(false);
  }, [stage, outputImage]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleCopyOutput = async () => {
    let text = "";
    if (stage === "real_done" && realResult) {
      text = (realResult.stdout || "") + (realResult.stderr || "");
    } else if (stage === "output_done") {
      text = outputCaption;
    } else {
      text = stageLogs.join("\n");
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedOutput(true);
      setShowMenu(false);
      setTimeout(() => setCopiedOutput(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleDownloadOutput = () => {
    let content = "";
    if (stage === "real_done" && realResult) {
      content = (realResult.stdout || "") + (realResult.stderr || "");
    } else if (stage === "output_done") {
      content = outputCaption;
    } else {
      content = stageLogs.join("\n");
    }

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "output.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setShowMenu(false);
  };

  const handleRetryImageLoad = () => {
    setImageFailed(false);
    setImageReloadKey((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#F5F5F5] overflow-hidden select-none relative">
      {/* Top bar with label 'Output' on left, Share & Three-dot menu on right */}
      <div className="h-11 bg-white border-b border-[#E2E8F0] px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-800 tracking-tight">
            Output
          </span>
          {(stage === "compiling" || stage === "linking" || stage === "executing") && (
            <span className="inline-block w-2 h-2 rounded-full bg-[#0B4DF0] animate-ping" />
          )}
        </div>

        {/* Right action icons */}
        <div className="flex items-center gap-1.5 relative">
          {/* Share icon & popover */}
          <div className="relative" ref={shareRef}>
            <button
              onClick={() => setShowShare((prev) => !prev)}
              title="Share compiler"
              aria-label="Share"
              className="p-1.5 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {showShare && (
              <div className="absolute right-0 top-9 w-60 bg-white border border-[#E2E8F0] rounded-xl shadow-xl p-3 z-30 animate-fadeIn">
                <p className="text-[11px] text-slate-500 mb-2">
                  Share this code runner with friends or colleagues:
                </p>
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg bg-[#0B4DF0] hover:bg-[#0940CA] text-white text-xs font-medium transition-colors shadow-xs cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Link className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? "Link Copied!" : "Copy URL Link"}</span>
                </button>
              </div>
            )}
          </div>

          {/* Three-dot menu icon with a small orange notification dot */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowMenu((prev) => !prev)}
              title="More options"
              aria-label="More options"
              className="p-1.5 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors relative cursor-pointer"
            >
              <MoreVertical className="w-4 h-4" />
              {/* Small orange notification dot */}
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F97316] ring-2 ring-white" />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-9 w-44 bg-white border border-[#E2E8F0] rounded-xl shadow-xl py-1 z-30 animate-fadeIn text-xs">
                <button
                  onClick={() => {
                    onClear();
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700 hover:text-slate-900 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Clear output</span>
                </button>

                <button
                  onClick={handleCopyOutput}
                  className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700 hover:text-slate-900 cursor-pointer"
                >
                  {copiedOutput ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span>Copy output</span>
                </button>

                <button
                  onClick={handleDownloadOutput}
                  className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700 hover:text-slate-900 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                  <span>Download output</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Output Content Area */}
      <div className="flex-1 overflow-hidden p-4 flex flex-col items-center justify-center font-mono text-xs select-text relative">
        {/* Empty by default */}
        {stage === "idle" && (
          <div className="h-full w-full flex items-center justify-center text-slate-400 select-none">
            {/* Empty by default */}
          </div>
        )}

        {/* 1. Fake sequence line by line: "Compiling...", "Linking...", "Executing..." */}
        {(stage === "compiling" || stage === "linking" || stage === "executing") && (
          <div className="h-full w-full flex flex-col justify-start p-2 space-y-2 text-slate-700">
            {stageLogs.map((log, idx) => (
              <div key={idx} className="flex items-center gap-2 animate-fadeIn">
                <span className="text-[#0B4DF0] font-bold">&gt;</span>
                <span className="font-semibold">{log}</span>
              </div>
            ))}
          </div>
        )}

        {/* 2. OUTPUT IMAGE: Centered in the Output pane, object-fit: contain, max-width: 100%, max-height: 100%, rounded corners (8px), soft shadow on light grey background */}
        {stage === "output_done" && (
          <div className="h-full w-full flex flex-col items-center justify-center p-2 animate-output-reveal overflow-hidden">
            <div className="relative max-w-full max-h-full flex flex-col items-center justify-center overflow-hidden">
              {!imageFailed ? (
                <div className="flex flex-col items-center justify-center max-w-full max-h-[calc(100%-2rem)]">
                  <img
                    key={imageReloadKey}
                    src={outputImage}
                    alt="Program output"
                    onError={() => setImageFailed(true)}
                    referrerPolicy="no-referrer"
                    className="max-w-full max-h-[75vh] object-contain rounded-[8px] shadow-md border border-[#E2E8F0]"
                  />
                  {outputCaption && (
                    <div className="mt-2 text-center text-xs font-medium text-slate-600 select-none">
                      {outputCaption}
                    </div>
                  )}
                </div>
              ) : (
                /* 6. Fallback if image fails to load: "Output could not be loaded" with a Retry button */
                <div className="flex flex-col items-center justify-center p-6 bg-white border border-[#E2E8F0] rounded-xl shadow-xs text-center gap-3 animate-fadeIn">
                  <p className="text-sm font-semibold text-slate-800">
                    Output could not be loaded
                  </p>
                  <button
                    onClick={handleRetryImageLoad}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-[#0B4DF0] hover:bg-[#0940CA] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Retry</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Real execution output */}
        {stage === "real_done" && realResult && (
          <div className="h-full w-full overflow-auto space-y-3 p-2">
            <div className="flex items-center justify-between text-[11px] pb-1 border-b border-[#E2E8F0] text-slate-500">
              <span>Exit code: {realResult.exitCode}</span>
              <span>Time: {realResult.durationMs}ms</span>
            </div>
            {realResult.stdout && (
              <pre className="whitespace-pre-wrap text-slate-800 leading-relaxed font-mono">
                {realResult.stdout}
              </pre>
            )}
            {realResult.stderr && (
              <pre className="whitespace-pre-wrap text-rose-600 leading-relaxed font-mono">
                {realResult.stderr}
              </pre>
            )}
            {!realResult.stdout && !realResult.stderr && (
              <span className="text-slate-400 italic">(No output)</span>
            )}
          </div>
        )}

        {stage === "error" && (
          <div className="h-full w-full p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs">
            {realResult?.error || "Execution failed."}
          </div>
        )}
      </div>
    </div>
  );
};
