function makeAnimation(
  target: (frame: number) => void,
  frames: number[],
  frameInterval: number
): void {
  let step = 0;
  const srt = setInterval(() => {
    if (step >= frames.length) {
      clearInterval(srt);
    } else {
      target(frames[step]);
      step += 1;
    }
  }, frameInterval || 1000 / 60);
}

export default makeAnimation;
