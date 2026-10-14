/**
 * Client for Piston Sandboxed Execution API
 * Used when OUTPUT_MODE is false to execute real user code.
 */

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  output: string;
  exitCode: number;
  durationMs: number;
  error?: string;
  language: string;
  version?: string;
}

const PISTON_ENDPOINT = "https://emkc.org/api/v2/piston/execute";

export async function executeRealCode(
  pistonLang: string,
  fileName: string,
  content: string,
  stdin: string = ""
): Promise<ExecutionResult> {
  const startTime = performance.now();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(PISTON_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({
        language: pistonLang,
        version: "*",
        files: [
          {
            name: fileName,
            content: content,
          },
        ],
        stdin: stdin,
        args: [],
        compile_timeout: 10000,
        run_timeout: 5000,
      }),
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("Execution rate limit reached. Please wait a few seconds and try again.");
      }
      const errText = await response.text().catch(() => "");
      throw new Error(`Execution service returned status ${response.status}: ${errText || response.statusText}`);
    }

    const data = await response.json();
    const durationMs = Math.round(performance.now() - startTime);

    const run = data.run || {};
    const compile = data.compile || {};

    let stderr = (compile.stderr || "") + (run.stderr || "");
    let stdout = run.stdout || "";
    let output = (compile.output || "") + (run.output || "");
    let exitCode = typeof run.code === "number" ? run.code : (compile.code || 0);

    return {
      stdout,
      stderr,
      output,
      exitCode,
      durationMs,
      language: data.language || pistonLang,
      version: data.version,
    };
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    const durationMs = Math.round(performance.now() - startTime);

    if (err instanceof DOMException && err.name === "AbortError") {
      return {
        stdout: "",
        stderr: "Execution timed out (exceeded 12 seconds). Check for infinite loops or network delays.",
        output: "Execution timed out.",
        exitCode: 124,
        durationMs,
        error: "Timeout",
        language: pistonLang,
      };
    }

    const message = err instanceof Error ? err.message : "Failed to execute code via remote runner.";
    return {
      stdout: "",
      stderr: message,
      output: `[Error: ${message}]`,
      exitCode: 1,
      durationMs,
      error: message,
      language: pistonLang,
    };
  }
}
