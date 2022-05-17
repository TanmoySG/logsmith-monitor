import Logsmith from "../logsmith/logsmith.js";

const logg = new Logsmith({})

const SampleLog = {
    status: "running",
    component : "logger",
    message: "The Test is Fine"
}

logg.WARN(SampleLog)
logg.INFO(SampleLog)
logg.SUCCESS(SampleLog)
logg.FAILURE(SampleLog)
logg.CRITICAL(SampleLog)
logg.LOG("TRAILING", SampleLog)

console.log()

logg.fetchConfigFromFile("./libraries/js/examples/configs/jsonConfig.json")
logg.WARN(SampleLog)
logg.INFO(SampleLog)
logg.SUCCESS(SampleLog)
logg.FAILURE(SampleLog)
logg.CRITICAL(SampleLog)
logg.LOG("TRAILING", SampleLog)