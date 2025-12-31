
const SOUND_URLS = {
  COIN: 'https://assets.mixkit.co/active_storage/sfx/1085/1085-preview.mp3',
  MOTOR: 'https://assets.mixkit.co/active_storage/sfx/214/214-preview.mp3',
  SHUTTER: 'https://assets.mixkit.co/active_storage/sfx/2281/2281-preview.mp3',
  BEEP: 'https://assets.mixkit.co/active_storage/sfx/1070/1070-preview.mp3',
  PROCESSING: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  DISPENSE: 'https://assets.mixkit.co/active_storage/sfx/1471/1471-preview.mp3'
};

const audioCache: Record<string, HTMLAudioElement> = {};

export const playSFX = (sound: keyof typeof SOUND_URLS, loop = false) => {
  try {
    const url = SOUND_URLS[sound];
    let audio = audioCache[url];
    
    if (!audio) {
      audio = new Audio(url);
      audioCache[url] = audio;
    }

    audio.currentTime = 0;
    audio.loop = loop;
    audio.volume = 0.5;
    audio.play().catch(e => console.warn("Audio playback failed:", e));
    
    return audio;
  } catch (e) {
    console.warn("Could not play sound:", e);
    return null;
  }
};

export const stopSFX = (sound: keyof typeof SOUND_URLS) => {
  const url = SOUND_URLS[sound];
  const audio = audioCache[url];
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
};
