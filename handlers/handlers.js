import { validateLogHasSchema } from "./contexts/validate.js";

console.log(validateLogHasSchema({
    "kind" : {
        "logs" : ["timestamp", "scope", "colm"],
        "metrics" : [""]
    }
}))