import { MotorPrimitives } from "./MotorPrimitives";

export class Pp {
  value: number;
  prevValue: number = 0;
  dt: number; // simulation time step
  G: number[];
  tau_p: number; // perceptual delay [s]
  tau_m: number; //motoristic delay [s]

  constructor(dt?: number, tau_p?: number, tau_m?: number) {
    if (dt != undefined) {
      this.dt = dt;
    } else {
      this.dt = 0.01;
    }
    if (tau_p != undefined) {
      this.tau_p = tau_p;
    } else {
      this.tau_p = 0.05;
    }
    if (tau_m != undefined) {
      this.tau_m = tau_m;
    } else {
      this.tau_m = 0.1; //[s]
    }

    this.value = 0;
    let G = new MotorPrimitives(1);
    G.duration = 30; // Generate a G profile 30-s long and store it
    G.solve();
    this.G = G.getValues(); // note that the first index corresponds to the initial condition step (i.e. t=0)
  }

  update(epsilon: number, t: number) {
    if (!isFinite(epsilon)) {
      this.value = 0;
    } else {
      this.value = epsilon * this.H(t) + this.prevValue;
    }
  }

  H(t: number) {
    let h: number;
    if (t < this.tau_m + this.tau_p) {
      h = 1;
    } else {
      h = 1 - this.G[Math.round((t - (this.tau_m + this.tau_p)) / this.dt)];
    }
    return h;
  }

  getValue() {
    return this.value;
  }

  reset() {
    this.value = 0;
  }
}
