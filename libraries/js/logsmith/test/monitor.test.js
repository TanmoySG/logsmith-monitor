import { checkConnection } from "../monitor/monitor.js";

checkConnection("http://localhost:8080", function (smth) {
    console.log(smth)
})