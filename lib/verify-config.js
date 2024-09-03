import {getError} from "./get-error.js";
import {isNonEmptyString, isObject, isNil} from "./utils.js";

const VALIDATORS = {
    commitlintFile: isNonEmptyString,
    commitlintConfig: isObject,
};

export const verifyConfig = (pluginConfig) => {
    const filtredPluginConfig = filterConfig(pluginConfig);
    const errors = Object.entries(filtredPluginConfig).reduce(
        reduceFunction,
        [],
    );

    if (errors.length > 0) {
        throw new AggregateError(errors, "Verifying config is fail");
    }
};

function reduceFunction(errors, [option, value]) {
    const isError = !isNil(value) && !VALIDATORS[option](value);
    if (!isError) {
        return errors;
    }

    const error = getError(`EINVALID${option.toUpperCase()}`, {
        [option]: value,
    });
    return [...errors, error];
}

function filterConfig(pluginConfig) {
    const validKeys = Object.keys(VALIDATORS);

    const result = {};
    for (const key of validKeys) {
        const value = pluginConfig[key];
        if (value) {
            result[key] = value;
        }
    }

    return result;
}
