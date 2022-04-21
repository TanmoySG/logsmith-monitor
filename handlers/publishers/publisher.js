import * as filesystem from 'fs';
import { nanoid } from "nanoid";
import { JSONWriterGeneric } from '../utilities/jsonWriter.js';
import { validateNewPublisher } from "./validate.js";

const PublisherRegistryFilePath = "logfiles/PublisherRegistry.json";

export function getPublishersRegistry() {
    const PublisherRegistry = JSON.parse(
        filesystem.readFileSync(PublisherRegistryFilePath)
    );
    return PublisherRegistry;
}

export function addToPublisherRegistry(newPublisher, callback) {
    console.log(newPublisher);
    const PublisherRegistry = getPublishersRegistry();
    if (validateNewPublisher(newPublisher, PublisherRegistry)) {
        const publisherNamespacePath = "logfiles/" + newPublisher["publisher"];
        filesystem.mkdir(publisherNamespacePath, function (err) {
            if (err) throw err;
            const newPublisherProfile = {
                "id": nanoid(8),
                "path": publisherNamespacePath,
                "origin": newPublisher["origin"],
                "namespace": newPublisher["publisher"],
                "timestamp": Date.now(),
                "description": newPublisher["description"]
            };
            console.log(newPublisherProfile);
            PublisherRegistry[newPublisher["publisher"]] = newPublisherProfile;
            JSONWriterGeneric(PublisherRegistryFilePath, PublisherRegistry, function (err) {
                console.log(err);
                callback({
                    status: "success",
                    message: "Publisher Created!"
                });
            });
        })
    } else {
        callback({
            status: "failed",
            message: "Error in Publisher Profile."
        });
    }
}