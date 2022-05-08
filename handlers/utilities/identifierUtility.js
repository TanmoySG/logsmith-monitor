export function StandardizeIdentifier(identifier) {

    // Thanks to this Gist - https://gist.github.com/jacks0n/e0bfb71a48c64fbbd71e5c6e956b17d7
    String.prototype.toPascalCase = function() {
        const words = this.match(/[a-zA-Z0-9]+/gi);
        if (!words) return "";
        return words
            .map(function(word) {
                return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
            })
            .join("");
    };

    var StandardizedIdentifier = identifier.toPascalCase()
    return StandardizedIdentifier;
}