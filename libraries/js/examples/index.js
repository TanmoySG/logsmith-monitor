import Logsmith from "../logsmith/logsmith.js";

const logg = new Logsmith({})
console.log(logg)

logg.fetchConfigFromFile("/workspaces/logsmith-monitor/libraries/js/examples/configs/jsonConfig.json")

console.log(logg)

// console.log(logg.log({ level: "INFO", body: { col1: "val1", col2: "val2" } }))