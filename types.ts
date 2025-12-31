
export enum BoothState {
  EXTERIOR = 'EXTERIOR',
  ENTERING = 'ENTERING',
  READY = 'READY',
  COUNTDOWN = 'COUNTDOWN',
  SHUTTER = 'SHUTTER',
  DEVELOPING = 'DEVELOPING',
  RESULT = 'RESULT'
}

export enum FilterType {
  BERLIN_BW = 'BERLIN_BW',
  SEPIA = 'SEPIA',
  CYANOTYPE = 'CYANOTYPE',
  ANALOG_COLOR = 'ANALOG_COLOR',
  NATURAL = 'NATURAL',
  FUJI_STYLE = 'FUJI_STYLE'
}

export interface PhotoData {
  id: number;
  dataUrl: string;
}
