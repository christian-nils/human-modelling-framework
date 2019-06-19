"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pr = /** @class */ (function () {
    function Pr(perceptualFunction, dt, tau_p) {
        this.dt = 0.01;
        this.perceptualFunction = perceptualFunction;
        if (dt != undefined) {
            this.dt = dt;
        }
        else {
            this.dt = 0.01;
        }
        if (tau_p != undefined) {
            this.TAU_P = Math.floor(tau_p / this.dt);
        }
        else {
            this.TAU_P = 5;
        }
        this.value = new Array(this.TAU_P).fill(0);
    }
    Pr.prototype.update = function (perceptualCue) {
        this.value.shift(); // take away the first value, and append the new value
        this.value.push(this.perceptualFunction(perceptualCue));
    };
    Pr.prototype.getValue = function () {
        // return the first index, that corresponds to the value received tau_p before the current time
        return this.value[0];
    };
    Pr.prototype.reset = function () {
        this.value = new Array(this.TAU_P).fill(0);
    };
    return Pr;
}());
exports.Pr = Pr;
