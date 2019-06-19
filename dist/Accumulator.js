"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Accumulator = /** @class */ (function () {
    function Accumulator(k, gate, dt) {
        this.dt = 0.01; //simulation time resolution [s]
        // Accumulator buffer
        this.A = 0;
        this.epsilon = 0;
        this.k = k;
        this.gate = gate;
        if (dt != undefined)
            this.dt = dt;
    }
    Accumulator.prototype.update = function (Pp, Pr) {
        // Accumulation
        var dA = this.k * (Pr - Pp) - this.gate;
        this.A = Math.max(0, this.A + dA * this.dt);
    };
    Accumulator.prototype.updateEpsilon = function (Pr, Pp) {
        this.epsilon = Pr - Pp;
    };
    Accumulator.prototype.resetActivity = function () {
        this.A = 0;
    };
    return Accumulator;
}());
exports.Accumulator = Accumulator;
