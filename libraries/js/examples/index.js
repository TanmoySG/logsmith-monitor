// import { PROTOCOLS } from "../logsmith/lib/specs.js";
import Logsmith from "../logsmith/logsmith.js";

const logg = new Logsmith({
    monitor: {
        port: "8080",
        server: "localhost",
        publisher: {
            publisher: "test"
        },
        context: {
            context: "testcon"
        }
    }
})

// const SampleLog = {
//     status: "running",
//     component: "logger",
//     message: "The Test is Fine"
// }

console.log(logg)

// logg.WARN(SampleLog)
// logg.INFO(SampleLog)
// logg.SUCCESS(SampleLog)
// logg.FAILURE(SampleLog)
// logg.CRITICAL(SampleLog)
// logg.LOG("TRAILING", SampleLog)

// console.log()

// logg.fetchConfigFromFile("./examples/configs/jsonConfig.json")
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