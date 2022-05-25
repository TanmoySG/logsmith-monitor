import * as filesystem from 'fs';
import { nanoid } from "nanoid";
import { JSONWriterGeneric } from '../utilities/jsonWriter.js';
import { StandardizeIdentifier } from '../utilities/identifierUtility.js';
import { validateNewPublisher, validateExistingPublisher } from "./validate.js";
import { createContextRegistry } from '../contexts/context.js';

const PublisherRegistryFilePath = "logfiles/PublisherRegistry.json";

export function getPublishersRegistry() {
    const PublisherRegistry = JSON.parse(
        filesystem.readFileSync(PublisherRegistryFilePath)
    );
    return PublisherRegistry;
}

export function verifyPublisherExistence(publisher, callback) {
    const PublisherRegistry = getPublishersRegistry();
    if (validateExistingPublisher(publisher, PublisherRegistry)) {
        callback({
            status: "success",
            scope: "publisher.exists",
            message: "Publisher Exists"
        })
    }else{
        callback({
            status: "failed",
            scope: "publisher.missing",
            message: "Publisher Missing"
        })
    }
}

export function addToPublisherRegistry(newPublisher, callback) {
    const PublisherRegistry = getPublishersRegistry();
    if (validateExistingPublisher(newPublisher["publisher"], PublisherRegistry)) {
        callback({
            status: "failed",
            scope: "publisher.exists",
            message: "Publisher Exists"
        })
    }
    if (validateNewPublisher(newPublisher, PublisherRegistry)) {
        const StandardizedPublisherIdentifier = StandardizeIdentifier(newPublisher["publisher"]);
        const publisherNamespacePath = "logfiles/" + StandardizedPublisherIdentifier;

        // To-do : Enclose within Try-Catch Block
        filesystem.mkdirSync(publisherNamespacePath);

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
                    publisher: StandardizedPublisherIdentifier,
                    scope: "publisher.success"
                });
            });
        });

    } else {
        callback({
            status: "failed",
            scope: "publisher.invalid",
            message: "Error in Publisher Profile."
        });
    }
}