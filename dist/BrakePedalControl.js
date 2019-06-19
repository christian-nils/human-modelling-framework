"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MotorPrimitives_1 = require("./MotorPrimitives");
var BrakePedalControl = /** @class */ (function () {
    function BrakePedalControl(dt, tau_m) {
        this.dt = 0.01;
        this.TAU_M = 10; // Motor delay in term of indices (i.e. TAU_M = tau_m/dt)
        if (dt != undefined)
            this.dt = dt;
        if (tau_m != undefined)
            this.TAU_M = Math.floor(tau_m / this.dt);
        this.value = new Array(this.TAU_M).fill(0);
        this.motorPrimitive = new MotorPrimitives_1.MotorPrimitives(0);
        this.motorPrimitive.duration = this.dt; // set a stepwise simulation
    }
    BrakePedalControl.prototype.reset = function () {
        this.motorPrimitive = new MotorPrimitives_1.MotorPrimitives(0);
        this.motorPrimitive.duration = this.dt; // set a stepwise simulation
        this.value = new Array(this.TAU_M).fill(0);
    };
    BrakePedalControl.prototype.update = function (bp) {
        if (bp != undefined) {
            this.motorPrimitive.setTarget(bp);
        }
        this.motorPrimitive.solve();
        this.value.shift();
        var val = this.motorPrimitive.getValues();
        this.value.push(val[val.length - 1]);
    };
    BrakePedalControl.prototype.getValue = function () {
        return this.value[0];
    };
    return BrakePedalControl;
}());
exports.BrakePedalControl = BrakePedalControl;
