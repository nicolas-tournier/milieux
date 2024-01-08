import { isWebGL2 } from "@luma.gl/core";

export const WebGLInitializer = (gl) => {
  if (!isWebGL2(gl)) {
    window.alert("GPU aggregation is not supported");
  }
};