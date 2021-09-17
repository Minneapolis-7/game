import SoundSample from '@/game/entities/SoundSample';

type DecodedSoundSample = {
  buffer: Promise<AudioBuffer>;
  isLooped: boolean;
  lastNode: AudioBufferSourceNode | null;
};

export default class SoundController {
  ctx: AudioContext;
  decodedSamples: Record<number | string, DecodedSoundSample>;

  constructor() {
    this.ctx = new AudioContext();
    this.decodedSamples = {};
  }

  async add(soundSample: SoundSample): Promise<void> {
    this.decodedSamples[soundSample.id] = {
      buffer: this.ctx.decodeAudioData(soundSample.buffer),
      isLooped: soundSample.isLooped,
      lastNode: null,
    };
  }

  async play(id: string): Promise<void> {
    if (!this.decodedSamples[id]) {
      return;
    }

    const sample = this.decodedSamples[id];
    const sourceNode = this.ctx.createBufferSource();

    sample.lastNode = sourceNode;

    sourceNode.buffer = await sample.buffer;
    sourceNode.loop = sample.isLooped || false;
    sourceNode.connect(this.ctx.destination);
    sourceNode.start();
  }

  async stop(id: string): Promise<void> {
    if (!this.decodedSamples[id]) {
      return;
    }

    const sample = this.decodedSamples[id];

    sample.lastNode?.stop();
  }

  destroy(): void {
    this.decodedSamples = {};
    this.ctx.close();
  }
}
