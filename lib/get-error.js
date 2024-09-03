import SemanticReleaseError from "@semantic-release/error";
import ERROR_DEFINITIONS from "./definitions/errors.js";

export const getError = (code, context) => {
    const function_ = ERROR_DEFINITIONS[code];
    const {message, details} = function_(context);
    return new SemanticReleaseError(message, code, details);
};
