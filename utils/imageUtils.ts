
import { FilterType } from '../types';

export const GET_FILTER_CSS = (type: FilterType): string => {
  switch (type) {
    case FilterType.BERLIN_BW:
      return 'grayscale(1) contrast(1.8) brightness(1.1)';
    case FilterType.SEPIA:
      return 'sepia(1) contrast(1.2) brightness(0.95)';
    case FilterType.CYANOTYPE:
      return 'grayscale(1) sepia(0.5) hue-rotate(180deg) brightness(1.1) contrast(1.4)';
    case FilterType.ANALOG_COLOR:
      return 'saturate(0.6) sepia(0.2) hue-rotate(-10deg) contrast(1.1) brightness(1.1)';
    case FilterType.NATURAL:
      return 'contrast(1.05) brightness(1.02) saturate(1.1)';
    case FilterType.FUJI_STYLE:
      // NC style foundation: lower saturation, specific contrast curve, and slight brightness boost
      return 'brightness(1.05) contrast(1.1) saturate(0.85) sepia(0.05)';
    default:
      return 'none';
  }
};

export const processWithFilter = (video: HTMLVideoElement, filterType: FilterType, mirrored: boolean = true): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const width = 480;
  const height = 360;
  canvas.width = width;
  canvas.height = height;

  // Handle Mirroring if enabled
  if (mirrored) {
    ctx.translate(width, 0);
    ctx.scale(-1, 1);
  }

  // Draw the video frame
  ctx.drawImage(video, 0, 0, width, height);
  
  // Reset transform for subsequent processing
  if (mirrored) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  // Apply Selected Base CSS Filter
  ctx.filter = GET_FILTER_CSS(filterType);
  ctx.drawImage(canvas, 0, 0);
  ctx.filter = 'none';

  const isFuji = filterType === FilterType.FUJI_STYLE;
  const noiseAmount = isFuji ? 18 : 30;
  
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    let r = data[i];
    let g = data[i+1];
    let b = data[i+2];

    // Calculate luminance for split toning (Rec. 709)
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // --- Fujifilm NC Split Toning Logic ---
    if (isFuji) {
      if (luminance < 100) {
        // Shadows: Shift toward Cyan-Blue
        r *= 0.92; // Reduce Red
        g *= 1.02; // Boost Green slightly
        b *= 1.08; // Boost Blue
      } else if (luminance > 160) {
        // Highlights: Shift toward Orange-Red
        r *= 1.10; // Boost Red
        g *= 1.02; // Boost Green slightly (creates amber)
        b *= 0.90; // Reduce Blue
      } else {
        // Midtones: Subtle contrast and slight warmth
        r *= 1.02;
        b *= 0.98;
      }
    }

    // Add Grain/Noise
    const noise = (Math.random() - 0.5) * noiseAmount;
    data[i] = Math.min(255, Math.max(0, r + noise));
    data[i+1] = Math.min(255, Math.max(0, g + noise));
    data[i+2] = Math.min(255, Math.max(0, b + noise));
  }
  
  ctx.putImageData(imageData, 0, 0);

  // Add slight vignette
  const vignetteAlpha = isFuji ? 0.25 : 0.4;
  const gradient = ctx.createRadialGradient(width/2, height/2, width/4, width/2, height/2, width/1.5);
  gradient.addColorStop(0, 'rgba(0,0,0,0)');
  gradient.addColorStop(1, `rgba(0,0,0,${vignetteAlpha})`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL('image/jpeg', 0.85);
};

export const createFinalStrip = (photos: string[]): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return resolve('');

    const frameWidth = 480;
    const frameHeight = 360;
    const margin = 30;
    const spacing = 15;
    const bottomPadding = 120;

    canvas.width = frameWidth + (margin * 2);
    canvas.height = (frameHeight * 4) + (spacing * 3) + margin + bottomPadding;

    // Background (White paper)
    ctx.fillStyle = '#fdfdfd';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let loadedCount = 0;
    photos.forEach((src, index) => {
      const img = new Image();
      img.onload = () => {
        const x = margin;
        const y = margin + (index * (frameHeight + spacing));
        ctx.drawImage(img, x, y, frameWidth, frameHeight);
        
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, frameWidth, frameHeight);

        loadedCount++;
        if (loadedCount === photos.length) {
          ctx.globalAlpha = 0.05;
          for (let i = 0; i < 10000; i++) {
            const px = Math.random() * canvas.width;
            const py = Math.random() * canvas.height;
            ctx.fillStyle = '#000';
            ctx.fillRect(px, py, 1, 1);
          }
          ctx.globalAlpha = 1.0;
          
          ctx.fillStyle = '#888';
          ctx.font = '16px "Share Tech Mono"';
          const dateStr = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
          ctx.fillText('PHOTOAUTOMAT // ' + dateStr, margin, canvas.height - 40);

          resolve(canvas.toDataURL('image/png'));
        }
      };
      img.src = src;
    });
  });
};
