/**
 * CodeRunner Configuration
 * 
 * Edit these constants to configure the image output runner.
 * OUTPUT_IMAGE: URL or path to the image displayed in the output pane.
 * OUTPUT_MODE: true = displays OUTPUT_IMAGE after compile sequence; false = sandboxed Piston runner.
 * OUTPUT_CAPTION: caption displayed beneath the output image.
 * FAKE_RUN_DELAY_MS: delay for the compilation sequence in milliseconds.
 */

export const OUTPUT_IMAGE = "https://res.cloudinary.com/lnalzoz5/image/upload/v1791958189/WhatsApp_Image_2026-10-14_at_11.39.16_AM.jpg";
export const OUTPUT_MODE = true;
export const OUTPUT_CAPTION = "Output: nice try";
export const FAKE_RUN_DELAY_MS = 2000;

export interface AppConfig {
  outputMode: boolean;
  outputImage: string;
  outputCaption: string;
  fakeRunDelayMs: number;
}

const STORAGE_KEY = "coderunner_output_config_v1";

export function getInitialConfig(): AppConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        outputMode: typeof parsed.outputMode === "boolean" ? parsed.outputMode : OUTPUT_MODE,
        outputImage: parsed.outputImage || OUTPUT_IMAGE,
        outputCaption: parsed.outputCaption || OUTPUT_CAPTION,
        fakeRunDelayMs: typeof parsed.fakeRunDelayMs === "number" ? parsed.fakeRunDelayMs : FAKE_RUN_DELAY_MS,
      };
    }
  } catch {
    // ignore
  }

  return {
    outputMode: OUTPUT_MODE,
    outputImage: OUTPUT_IMAGE,
    outputCaption: OUTPUT_CAPTION,
    fakeRunDelayMs: FAKE_RUN_DELAY_MS,
  };
}

export function saveConfig(config: AppConfig) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    // ignore
  }
}
