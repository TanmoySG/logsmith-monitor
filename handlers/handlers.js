import { checkLogHasValidSchema } from "./contexts/validate.js";

console.log(checkLogHasValidSchema({
    "kind" : {
        "logs" : ["timestamp", "status", "colm"],
        "metrics" : [""]
    }
}))