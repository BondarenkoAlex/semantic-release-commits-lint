export const isNil = (value) => {
    return value == null;
};

export const isString = (value) => {
    const type = typeof value;
    return (
        type === "string" ||
        (type === "object" &&
            value != null &&
            !Array.isArray(value) &&
            getTag(value) === "[object String]")
    );
};

export const isObject = (value) => {
    const type = typeof value;
    return value != null && (type === "object" || type === "function");
};

export const isNonEmptyString = (value) => isString(value) && value.trim();
