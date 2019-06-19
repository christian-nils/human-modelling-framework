"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Accumulator_1 = require("./Accumulator");
var Pp_1 = require("./Pp");
var Pr_1 = require("./Pr");
var AccumulatorBranch = /** @class */ (function () {
    // methods
    function AccumulatorBranch(perceptualFunction, k, gate, dt, tau_p, tau_m) {
        this.dt = 0.01;
        this.tau_p = 0.05;
        this.tau_m = 0.1;
        // accumulator value
        this.value = 0;
        if (dt != undefined)
            this.dt = dt;
        if (tau_p != undefined)
            this.tau_p = tau_p;
        if (tau_m != undefined)
            this.tau_m = tau_m;
        this.Pr = new Pr_1.Pr(perceptualFunction, this.dt, this.tau_p);
        this.Pp = new Pp_1.Pp(this.dt, this.tau_p, this.tau_m);
        this.accumulator = new Accumulator_1.Accumulator(k, gate, dt);
    }
    AccumulatorBranch.prototype.update = function (t, perceptualCue) {
        this.Pr.update(perceptualCue);
        if (this.tadj != undefined) {
            this.Pp.update(this.accumulator.epsilon, t - this.tadj);
        }
        this.accumulator.update(this.Pp.getValue(), this.Pr.getValue());
        this.value = this.accumulator.A;
    };
    AccumulatorBranch.prototype.getValue = function () {
        return this.value;
    };
    AccumulatorBranch.prototype.reset = function () {
        this.accumulator.resetActivity();
        this.value = 0;
    };
    return AccumulatorBranch;
}());
exports.AccumulatorBranch = AccumulatorBranch;
