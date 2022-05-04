import { JSONWriterGeneric } from '../utilities/jsonWriter';

export function createMetricRegistry(contextNamespacePath, metricTemplate, callback) {
    const metricNamespace = contextNamespacePath + "/" + "metrics.json"
    JSONWriterGeneric(metricNamespace, metricTemplate, function (err) {
        callback(err);
    })
}