import Logsmith from "../logsmith/logsmith.js";

const logg = new Logsmith({})
console.log(logg.log({ level: "INFO", body: { col1: "val1", col2: "val2" } }))