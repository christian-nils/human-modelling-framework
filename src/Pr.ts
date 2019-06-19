export interface PerceptualFunction {
  // function transforming the perceptual cues into a perceptual quantity
  (
    x: number | number[] // input perceptual cues value
  ): number; // output perceptual quantity value
}
export class Pr {
  perceptualFunction: PerceptualFunction;
  TAU_P: number; //perceptual delay in index value (i.e. if dt=0.01s, and tau_p=0.05s, then TAU_P = 5)
  value: number[];
  dt: number = 0.01;

  constructor(
    perceptualFunction: PerceptualFunction,
    dt?: number,
    tau_p?: number
  ) {
    this.perceptualFunction = perceptualFunction;
    if (dt != undefined) {
      this.dt = dt;
    } else {
      this.dt = 0.01;
    }
    if (tau_p != undefined) {
      this.TAU_P = Math.floor(tau_p / this.dt);
    } else {
      this.TAU_P = 5;
    }

    this.value = new Array(this.TAU_P).fill(0);
  }

  update(perceptualCue: number | number[]) {
    this.value.shift(); // take away the first value, and append the new value
    this.value.push(this.perceptualFunction(perceptualCue));
  }

  getValue() {
    // return the first index, that corresponds to the value received tau_p before the current time
    return this.value[0];
  }

  reset() {
    this.value = new Array(this.TAU_P).fill(0);
  }
}
