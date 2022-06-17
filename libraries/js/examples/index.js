import Logsmith from "../logsmith/logsmith.js";

const logg = new Logsmith({})


logg.WARN({ name: "tanmoy" })

logg.INFO({ name: "tanmoy" })

logg.SUCCESS({ name: "tanmoy" })

logg.fetchConfigFromFile("./libraries/js/examples/configs/jsonConfig.json")

logg.FAILURE({ name: "tanmoy" })

logg.CRITICAL({ name: "tanmoy" })