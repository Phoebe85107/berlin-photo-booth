
/**
 * 播放音效工具函式
 * @param url 音效檔案的網址
 * @param volume 音量 (0.0 到 1.0)
 */
export const playSFX = (url: string, volume: number = 0.5) => {
  try {
    const audio = new Audio(url);
    audio.volume = volume;
    audio.play().catch(e => console.warn("Audio playback failed (interaction required):", e));
    return audio;
  } catch (error) {
    console.error("Failed to play sound:", error);
    return null;
  }
};

export const stopSFX = (audio: HTMLAudioElement | null) => {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
};
