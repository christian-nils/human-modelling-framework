"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MotorPrimitives_1 = require("./MotorPrimitives");
var Pp = /** @class */ (function () {
    function Pp(dt, tau_p, tau_m) {
        this.prevValue = 0;
        if (dt != undefined) {
            this.dt = dt;
        }
        else {
            this.dt = 0.01;
        }
        if (tau_p != undefined) {
            this.tau_p = tau_p;
        }
        else {
            this.tau_p = 0.05;
        }
        if (tau_m != undefined) {
            this.tau_m = tau_m;
        }
        else {
            this.tau_m = 0.1; //[s]
        }
        this.value = 0;
        var G = new MotorPrimitives_1.MotorPrimitives(1);
        G.duration = 30; // Generate a G profile 30-s long and store it
        G.solve();
        this.G = G.getValues(); // note that the first index corresponds to the initial condition step (i.e. t=0)
    }
    Pp.prototype.update = function (epsilon, t) {
        if (!isFinite(epsilon)) {
            this.value = 0;
        }
        else {
            this.value = epsilon * this.H(t) + this.prevValue;
        }
    };
    Pp.prototype.H = function (t) {
        var h;
        if (t < this.tau_m + this.tau_p) {
            h = 1;
        }
        else {
            h = 1 - this.G[Math.round((t - (this.tau_m + this.tau_p)) / this.dt)];
        }
        return h;
    };
    Pp.prototype.getValue = function () {
        return this.value;
    };
    Pp.prototype.reset = function () {
        this.value = 0;
    };
    return Pp;
}());
exports.Pp = Pp;
