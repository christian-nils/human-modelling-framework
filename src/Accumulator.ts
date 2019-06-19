export class Accumulator {
  // Parameters
  k: number;
  gate: number;
  dt: number = 0.01; //simulation time resolution [s]
  // Accumulator buffer
  A: number = 0;
  epsilon: number = 0;

  constructor(k: number, gate: number, dt?: number) {
    this.k = k;
    this.gate = gate;
    if (dt != undefined) this.dt = dt;
  }

  update(Pp: number, Pr: number) {
    // Accumulation
    let dA = this.k * (Pr - Pp) - this.gate;
    this.A = Math.max(0, this.A + dA * this.dt);
  }

  updateEpsilon(Pr: number, Pp: number) {
    this.epsilon = Pr - Pp;
  }

  resetActivity() {
    this.A = 0;
  }
}
