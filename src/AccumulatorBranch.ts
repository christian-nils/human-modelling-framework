import { Accumulator } from "./Accumulator";
import { Pp } from "./Pp";
import { Pr, PerceptualFunction } from "./Pr";

export class AccumulatorBranch {
  dt: number = 0.01;
  tau_p: number = 0.05;
  tau_m: number = 0.1;
  tadj: number; // time when the last adjustment occurred
  // properties
  accumulator: Accumulator;
  Pp: Pp;
  Pr: Pr;

  // accumulator value
  value: number = 0;

  // methods
  constructor(
    perceptualFunction: PerceptualFunction,
    k: number,
    gate: number,
    dt?: number,
    tau_p?: number,
    tau_m?: number
  ) {
    if (dt != undefined) this.dt = dt;
    if (tau_p != undefined) this.tau_p = tau_p;
    if (tau_m != undefined) this.tau_m = tau_m;

    this.Pr = new Pr(perceptualFunction, this.dt, this.tau_p);
    this.Pp = new Pp(this.dt, this.tau_p, this.tau_m);
    this.accumulator = new Accumulator(k, gate, dt);
  }

  update(t: number, perceptualCue: number | number[]) {
    this.Pr.update(perceptualCue);
    if (this.tadj != undefined) {
      this.Pp.update(this.accumulator.epsilon, t - this.tadj);
    }
    this.accumulator.update(this.Pp.getValue(), this.Pr.getValue());
    this.value = this.accumulator.A;
  }

  getValue() {
    return this.value;
  }

  reset() {
    this.accumulator.resetActivity();
    this.value = 0;
  }
}
