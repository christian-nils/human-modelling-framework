import { MotorPrimitives } from "./MotorPrimitives";

export class BrakePedalControl {
  motorPrimitive: MotorPrimitives;
  dt: number = 0.01;
  TAU_M: number = 10; // Motor delay in term of indices (i.e. TAU_M = tau_m/dt)
  value: number[];

  constructor(dt?: number, tau_m?: number) {
    if (dt != undefined) this.dt = dt;
    if (tau_m != undefined) this.TAU_M = Math.floor(tau_m / this.dt);
    this.value = new Array(this.TAU_M).fill(0);
    this.motorPrimitive = new MotorPrimitives(0);
    this.motorPrimitive.duration = this.dt; // set a stepwise simulation
  }

  reset() {
    this.motorPrimitive = new MotorPrimitives(0);
    this.motorPrimitive.duration = this.dt; // set a stepwise simulation
    this.value = new Array(this.TAU_M).fill(0);
  }

  update(bp?: number) {
    if (bp != undefined) {
      this.motorPrimitive.setTarget(bp);
    }
    this.motorPrimitive.solve();
    this.value.shift();
    let val = this.motorPrimitive.getValues();
    this.value.push(val[val.length - 1]);
  }

  getValue() {
    return this.value[0];
  }
}
