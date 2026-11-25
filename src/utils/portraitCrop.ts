import { useEffect, useState } from 'react';

export const RAW_PORTRAIT_PATH =
  '/assets/aistudio/WhatsApp_Image_2026-11-25_at_4.14.22_PM_886cbe1f.jpeg';

export interface CroppedPortraitResult {
  dataUrl: string | null;
  ready: boolean;
}

let cachedDataUrl: string | null = null;
let pendingPromise: Promise<string> | null = null;

/**
 * Extracts Goud Aditya's real portrait cleanly from the uploaded WhatsApp profile screenshot
 * without altering his face or identity, removing only the phone UI chrome around it.
 */
export function loadCroppedPortrait(): Promise<string> {
  if (cachedDataUrl) return Promise.resolve(cachedDataUrl);
  if (pendingPromise) return pendingPromise;

  pendingPromise = new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const w = img.naturalWidth;
        const h = img.naturalHeight;

        const probeCanvas = document.createElement('canvas');
        probeCanvas.width = w;
        probeCanvas.height = h;
        const pCtx = probeCanvas.getContext('2d')!;
        pCtx.drawImage(img, 0, 0);

        const imgData = pCtx.getImageData(0, 0, w, h).data;

        const isDarkBg = (px: number, py: number) => {
          const i = (py * w + px) * 4;
          const r = imgData[i];
          const g = imgData[i + 1];
          const b = imgData[i + 2];
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          return max < 44 && max - min < 12;
        };

        const midX = Math.floor(w * 0.5);
        let topY = Math.floor(h * 0.275);
        let bottomY = Math.floor(h * 0.588);

        for (let y = Math.floor(h * 0.2); y < Math.floor(h * 0.5); y++) {
          if (!isDarkBg(midX, y)) {
            topY = y;
            break;
          }
        }
        for (let y = Math.floor(h * 0.68); y > Math.floor(h * 0.4); y--) {
          if (!isDarkBg(midX, y)) {
            bottomY = y;
            break;
          }
        }

        const centerY = Math.floor((topY + bottomY) / 2);
        let leftX = Math.floor(w * 0.16);
        let rightX = Math.floor(w * 0.84);

        for (let x = Math.floor(w * 0.05); x < midX; x++) {
          if (!isDarkBg(x, centerY)) {
            leftX = x;
            break;
          }
        }
        for (let x = Math.floor(w * 0.95); x > midX; x--) {
          if (!isDarkBg(x, centerY)) {
            rightX = x;
            break;
          }
        }

        const centerX = (leftX + rightX) / 2;
        const detectedRadius = Math.min((rightX - leftX) / 2, (bottomY - topY) / 2);
        const safeRadius = Math.max(detectedRadius - 4, w * 0.3);

        const outW = 800;
        const outH = 840;
        const outCanvas = document.createElement('canvas');
        outCanvas.width = outW;
        outCanvas.height = outH;
        const ctx = outCanvas.getContext('2d')!;

        // Deep obsidian-to-burgundy studio backdrop matching the real photo studio lighting
        const bgGrad = ctx.createRadialGradient(
          outW * 0.5,
          outH * 0.46,
          outW * 0.1,
          outW * 0.5,
          outH * 0.5,
          outH * 0.72
        );
        bgGrad.addColorStop(0, '#5a2b38');
        bgGrad.addColorStop(0.62, '#281117');
        bgGrad.addColorStop(1, '#070608');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, outW, outH);

        ctx.save();
        const targetRadius = outW * 0.48;
        ctx.beginPath();
        ctx.arc(outW * 0.5, outH * 0.5, targetRadius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();

        const srcSize = safeRadius * 2;
        ctx.drawImage(
          img,
          centerX - safeRadius,
          centerY - safeRadius,
          srcSize,
          srcSize,
          outW * 0.5 - targetRadius,
          outH * 0.5 - targetRadius,
          targetRadius * 2,
          targetRadius * 2
        );
        ctx.restore();

        // Subtle crimson rim vignette around perimeter
        const vig = ctx.createRadialGradient(
          outW * 0.5,
          outH * 0.46,
          outW * 0.34,
          outW * 0.5,
          outH * 0.5,
          outH * 0.58
        );
        vig.addColorStop(0, 'rgba(0,0,0,0)');
        vig.addColorStop(0.75, 'rgba(12,5,7,0.42)');
        vig.addColorStop(1, 'rgba(5,5,5,0.92)');
        ctx.fillStyle = vig;
        ctx.fillRect(0, 0, outW, outH);

        cachedDataUrl = outCanvas.toDataURL('image/jpeg', 0.94);
        resolve(cachedDataUrl);
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = (err) => reject(err);
    img.src = RAW_PORTRAIT_PATH;
  });

  return pendingPromise;
}

export function useCroppedPortrait(): CroppedPortraitResult {
  const [state, setState] = useState<CroppedPortraitResult>({
    dataUrl: cachedDataUrl,
    ready: Boolean(cachedDataUrl),
  });

  useEffect(() => {
    if (cachedDataUrl) return;
    let mounted = true;
    loadCroppedPortrait()
      .then((dataUrl) => {
        if (mounted) {
          setState({ dataUrl, ready: true });
        }
      })
      .catch(() => {
        if (mounted) {
          setState({ dataUrl: RAW_PORTRAIT_PATH, ready: true });
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  return state;
}
