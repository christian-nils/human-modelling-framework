import { Pr } from "./Pr";

export interface LinkOutput {
  reset: boolean[];
  outVal: number;
}

export interface LinkFunction {
  // function transforming the perceptual cues into a perceptual quantity
  (
    activity: number | number[],
    Pr: Pr | Pr[] // input perceptual cues value
  ): LinkOutput; // output perceptual quantity value
}
