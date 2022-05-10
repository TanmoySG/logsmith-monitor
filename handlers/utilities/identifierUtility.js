export function StandardizeIdentifier(identifier) {
    var StandardizedIdentifier =  identifier.replace(/[^a-zA-Z0-9 ]/g, " ").replace(/[ ]+/g, ".").toLowerCase();
    return StandardizedIdentifier;
}