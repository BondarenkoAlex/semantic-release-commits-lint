import {createRequire} from "node:module";

const require = createRequire(import.meta.url);
const pkg = require("../../package.json");

const [homepage] = pkg.homepage.split("#");
const linkify = (file) => `${homepage}/blob/master/${file}`;

export default {
    EINVALIDCOMMITLINTCONFIG: ({commitlintConfig}) => ({
        message: "Invalid `commitlintConfig` option.",
        details: `The [commitlintConfig option](${linkify("README.md#configuration-by-commitlintconfig-option")}) option, if defined, must be a non empty \`Object\`. Your configuration for the \`commitlintConfig\` option is \`${JSON.stringify(commitlintConfig)}\`.`,
    }),
    EINVALIDCOMMITLINTFILE: ({commitlintFile}) => ({
        message: "Invalid `commitlintFile` option.",
        details: `The [commitlintFile option](${linkify("README.md#configuration-by-commitlintfile-option-commitlintfile")}) option, if defined, must be a non empty \`String\`. Your configuration for the \`commitlintFile\` option is \`${commitlintFile}\`.`,
    }),
};
