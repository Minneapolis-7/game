import { SoundSample } from '@/game/types';

export default class SoundController {
  ctx: AudioContext;
  samples: Record<string, SoundSample>;

  constructor() {
    this.ctx = new AudioContext();
    this.samples = {};
  }

  async add(id: string, src: string, isLooped: boolean): Promise<void> {
    const response = await fetch(src);
    const arrayBuffer = await response.arrayBuffer();

    this.samples[id] = {
      buffer: this.ctx.decodeAudioData(arrayBuffer),
      isLooped,
    };
  }

  async play(id: string): Promise<void> {
    if (!this.samples[id]) {
      return;
    }

    const sample = this.samples[id];
    const sourceNode = this.ctx.createBufferSource();

    sourceNode.buffer = await sample.buffer;
    sourceNode.loop = sample.isLooped || false;
    sourceNode.connect(this.ctx.destination);
    sourceNode.start();
  }

  destroy(): void {
    this.samples = {};
    setTimeout(() => {
      this.ctx.close();
    }, 1000);
  }
}
