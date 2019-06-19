"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var odex_1 = require("odex");
var MotorPrimitives = /** @class */ (function () {
    function MotorPrimitives(t, y) {
        // parameters
        this.T = NaN;
        // simulation parameters
        this.t0 = NaN; //initial time value
        // current ODE values
        this.y = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.outVal = new Array();
        // Implementation of Schaal algorithm
        this.schaal = function (T, a_v, a_x, a_y, a_r, a_z, a_p, b, c_0) { return function (x, y) {
            // Equations adapted from Degallier's thesis
            var dy = new Array();
            var DeltaW = [Math.max(0, T - y[0]), Math.max(0, -T - y[1])];
            dy[2] = a_v * (-y[2] + DeltaW[0]);
            dy[3] = a_v * (-y[3] + DeltaW[1]);
            dy[4] = -a_x * y[4] + (y[2] - y[4]) * c_0;
            dy[5] = -a_x * y[5] + (y[3] - y[5]) * c_0;
            dy[6] = -a_y * y[6] + (y[4] - y[6]) * c_0;
            dy[7] = -a_y * y[7] + (y[5] - y[7]) * c_0;
            dy[8] = a_r * (-y[8] + (1 - y[8]) * b * y[2]);
            dy[9] = a_r * (-y[9] + (1 - y[9]) * b * y[3]);
            dy[10] = -a_z * y[10] + (y[6] - y[10]) * (1 - y[8]) * c_0;
            dy[11] = -a_z * y[11] + (y[7] - y[11]) * (1 - y[9]) * c_0;
            dy[0] = a_p * (Math.max(0, dy[10]) - Math.max(0, dy[11])) * c_0;
            dy[1] = a_p * (Math.max(0, dy[11]) - Math.max(0, dy[10])) * c_0;
            return dy;
        }; };
        if (y != undefined) {
            this.y = y;
            this.outVal.push({ x: this.t0, y: y[0] - y[1] });
        }
        else {
            this.outVal.push({ x: 0, y: 0 });
        }
        this.setTarget(t);
        this.a_v = 50;
        this.a_x = 1;
        this.a_y = 1;
        this.a_r = 50;
        this.a_z = 0.01;
        this.a_p = 0.285;
        this.b = 10;
        this.c_0 = 10;
        this.solver = new odex_1.Solver(this.y.length);
        this.solver.denseOutput = true;
        this.t0 = 0;
        this.dt = 0.01;
        this.duration = this.dt;
    }
    MotorPrimitives.prototype.setTarget = function (t) {
        this.T = t / 2;
    };
    MotorPrimitives.prototype.solve = function () {
        var _this = this;
        var solveOut = this.solver.solve(this.schaal(this.T, this.a_v, this.a_x, this.a_y, this.a_r, this.a_z, this.a_p, this.b, this.c_0), this.t0, this.y, this.t0 + this.duration, this.solver.grid(this.dt, function (x, y) {
            if (x != _this.t0)
                _this.outVal.push({ x: x, y: y[0] - y[1] });
        }));
        this.y = solveOut.y;
        this.t0 = solveOut.xEnd;
    };
    MotorPrimitives.prototype.get2DValues = function () {
        return this.outVal;
    };
    MotorPrimitives.prototype.getValues = function () {
        var y = [];
        this.outVal.forEach(function (element) {
            y.push(element.y);
        });
        return y;
    };
    return MotorPrimitives;
}());
exports.MotorPrimitives = MotorPrimitives;
