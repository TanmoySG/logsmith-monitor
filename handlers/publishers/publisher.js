import * as filesystem from 'fs';
import { nanoid } from "nanoid";
import { JSONWriterGeneric } from '../utilities/jsonWriter.js';
import { validatePublisher } from "./validate.js";

const PublisherRegistryFilePath = "logfiles/PublisherRegistry.json";

export function getPublishersRegistry() {
    const PublisherRegistry = JSON.parse(
        filesystem.readFileSync(PublisherRegistryFilePath)
    );
    return PublisherRegistry;
}

export function addToPublisherRegistry(newPublisher) {
    const PublisherRegistry = getPublishersRegistry();
    console.log(PublisherRegistry)
    if (validatePublisher(newPublisher, PublisherRegistry)) {
        const publisherNamespacePath = "logfiles/" + newPublisher["publisher"];
        filesystem.mkdir(publisherNamespacePath, function (err) {
            if (err) throw err;
            const newPublisherProfile = {
                "id": nanoid(8),
                "timestamp": Date.now(),
                "description": newPublisher["description"],
                "path": publisherNamespacePath
            }
            PublisherRegistry[newPublisher["publisher"]] = newPublisherProfile;
            JSONWriterGeneric(PublisherRegistryFilePath, PublisherRegistry, function (err) {
                console.log(err);
                return "success";
            })
        })
    }else{
        return "user Already Exist"
    }
}