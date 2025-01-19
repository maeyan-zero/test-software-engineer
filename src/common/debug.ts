import process from "process";

export function ifDebug(cb: () => void) {
  if (process.env.ENV === "dev") {
    cb();
  }
}
