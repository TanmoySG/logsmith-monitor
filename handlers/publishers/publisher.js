import * as filesystem from 'fs';
import { nanoid } from "nanoid";
import { JSONWriterGeneric } from '../utilities/jsonWriter.js';
import { StandardizeIdentifier } from '../utilities/identifierUtility.js';
import { validateNewPublisher } from "./validate.js";
import { createContextRegistry } from '../contexts/context.js';

const PublisherRegistryFilePath = "logfiles/PublisherRegistry.json";

export function getPublishersRegistry() {
    const PublisherRegistry = JSON.parse(
        filesystem.readFileSync(PublisherRegistryFilePath)
    );
    return PublisherRegistry;
}

export function addToPublisherRegistry(newPublisher, callback) {
    const PublisherRegistry = getPublishersRegistry();
    if (validateNewPublisher(newPublisher, PublisherRegistry)) {
        const StandardizedPublisherIdentifier = StandardizeIdentifier(newPublisher["publisher"]);
        const publisherNamespacePath = "logfiles/" + StandardizedPublisherIdentifier;
        filesystem.mkdir(publisherNamespacePath, function (err) {
            if (err) throw err;
            const newPublisherProfile = {
                "id": nanoid(8),
                "path": publisherNamespacePath,
                "origin": newPublisher["origin"],
                "namespace": StandardizedPublisherIdentifier,
                "timestamp": Date.now(),
                "description": newPublisher["description"]
            };
            createContextRegistry(publisherNamespacePath, function (err) {
                PublisherRegistry[StandardizedPublisherIdentifier] = newPublisherProfile;
                JSONWriterGeneric(PublisherRegistryFilePath, PublisherRegistry, function (err) {
                    if (err) { console.log(err); }
                    callback({
                        status: "success",
                        message: "Publisher Created!",
                        publisher : StandardizedPublisherIdentifier
                    });
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