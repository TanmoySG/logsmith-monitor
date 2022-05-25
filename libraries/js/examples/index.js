// import { PROTOCOLS } from "../logsmith/lib/specs.js";
import Logsmith from "../logsmith/logsmith.js";

const SampleLog = {
    status: "running",
    component: "logger",
    message: "The Test is Fine"
}

const logg = new Logsmith({})
logg.fetchConfigFromFile("./examples/configs/jsonConfig.json")

// console.log(logg)

logg.WARN({ "trial": "W" })
logg.INFO({ "trial": "I" })
logg.SUCCESS({ "trial": "S" })
logg.FAILURE({ "tiral": "F" })
logg.CRITICAL({ "trial": "C" })
logg.LOG("TRAILING", { "trial": "T" })

// console.log()

// logg.WARN(SampleLog)
// logg.INFO(SampleLog)
// logg.SUCCESS(SampleLog)
// logg.FAILURE(SampleLog)
// logg.CRITICAL(SampleLog)
// logg.LOG("TRAILING", SampleLog)


// logg.WARN(SampleLog)
// logg.INFO(SampleLog)
// logg.SUCCESS(SampleLog)
// logg.FAILURE(SampleLog)
// logg.CRITICAL(SampleLog)
// logg.LOG("TRAILING", SampleLog)
// logg.WARN(SampleLog)
// logg.INFO(SampleLog)
// logg.SUCCESS(SampleLog)
// logg.FAILURE(SampleLog)
// logg.CRITICAL(SampleLog)
// logg.LOG("TRAILING", SampleLog)
// logg.WARN(SampleLog)
// logg.INFO(SampleLog)
// logg.SUCCESS(SampleLog)
// logg.FAILURE(SampleLog)
// logg.CRITICAL(SampleLog)
// logg.LOG("TRAILING", SampleLog)
// logg.WARN(SampleLog)
// logg.INFO(SampleLog)
// logg.SUCCESS(SampleLog)
// logg.FAILURE(SampleLog)
// logg.CRITICAL(SampleLog)
// logg.LOG("TRAILING", SampleLog)
// logg.WARN(SampleLog)
// logg.INFO(SampleLog)
// logg.SUCCESS(SampleLog)
// logg.FAILURE(SampleLog)
// logg.CRITICAL(SampleLog)
// logg.LOG("TRAILING", SampleLog)
// logg.WARN(SampleLog)
// logg.INFO(SampleLog)
// logg.SUCCESS(SampleLog)
// logg.FAILURE(SampleLog)
// logg.CRITICAL(SampleLog)
// logg.LOG("TRAILING", SampleLog)

// const logg1 = new Logsmith({
//     "logFormat": "statement"
// })


// logg1.CRITICAL("test")