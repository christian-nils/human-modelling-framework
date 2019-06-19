# Introduction

_human-modelling-framework_ is a JavaScript/TypeScript library based on the human sensorimotor control modelling framework described in [[1](https://doi.org/10.1007/s00422-017-0743-9)].
The driver model can be created by using the different classes implemented in the library. The most simple case would implement a single accumulator branch where the input would be a perceptual cue. You will have to tune the perceptual quantity received and predicted by assigning a _Pp_ and a _Pr_ object to the accumulator branch.

One example can be found on [[2](https://christian-nils.github.io/drivermodel-app)]. In the example, two accumulator branches are implemented and a linking function (see _Link_ class) manages the interface between both branches.

# Installation

To use the library directly in your application, you can use the NPM registry.

```
npm i human-modelling-framework
```

# Final notes

You are welcome to fork the GitHub repository if you would like to extend this library.
