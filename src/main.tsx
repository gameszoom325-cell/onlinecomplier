/**
 * =========================================================================
 * OUTPUT IMAGE CONFIGURATION
 * Change the output image URL below. You can use any valid image URL or
 * a local asset path such as "/assets/output.jpg".
 * =========================================================================
 */
export const OUTPUT_IMAGE = "https://res.cloudinary.com/lnalzoz5/image/upload/v1791958189/WhatsApp_Image_2026-10-14_at_11.39.16_AM.jpg";

import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
