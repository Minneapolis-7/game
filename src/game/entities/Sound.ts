import { SoundSample } from 'game/types';

export default class Sound {
  ctx: AudioContext;
  samples: Record<string, SoundSample>;

  constructor() {
    this.ctx = new AudioContext();
    this.samples = {};
  }

  async add(id: string, src: string, isLoop: boolean): Promise<void> {
    const response = await fetch(src);
    const arrayBuffer = await response.arrayBuffer();

    this.samples[id] = {
      buffer: this.ctx.decodeAudioData(arrayBuffer),
      isLoop,
    };
  }

  play(id: string): void {
    if (!this.samples[id]) {
      return;
    }

    const sample = this.samples[id];
    const sourceNode = this.ctx.createBufferSource();

    sample.buffer.then((buffer) => {
      sourceNode.buffer = buffer;
      sourceNode.loop = sample.isLoop || false;
      sourceNode.connect(this.ctx.destination);
      sourceNode.start();
    });
  }

  destroy(): void {
    this.samples = {};
    setTimeout(() => {
      this.ctx.close();
    }, 1000);
  }
}
