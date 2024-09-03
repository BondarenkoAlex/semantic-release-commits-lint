import lint from "@commitlint/lint";
import load from "@commitlint/load";
import format from "@commitlint/format";
import isEmpty from "lodash.isempty";
import debugFactory from "debug";

const packageName = "semantic-release-commits-lint";
const debug = debugFactory(packageName);

export const analyzeCommits = async (pluginConfig, context) => {
    const {commits, logger, options} = context;

    if (isEmpty(commits)) {
        logger.warn("You don`t have commits. Skip plugin.");
        return;
    }

    if (options.debug) {
        // Set enable
        debugFactory.enable(packageName);
    }

    const {commitlintFile, commitlintConfig} = pluginConfig;

    let loadOptions;
    if (commitlintFile) {
        loadOptions = {file: commitlintFile};
    }

    let seed;
    if (commitlintConfig) {
        seed = commitlintConfig;
    }

    const {parserPreset, rules} = await load(seed, loadOptions);

    if (isEmpty(rules)) {
        logger.warn(
            "Rules`s commitlint configuration is empty.",
            "See the https://github.com/BondarenkoAlex/semantic-release-commits-lint?tab=readme-ov-file#configuration for more details.",
        );
    }

    debug("Use rules: %0", rules);

    const parserOptions = parserPreset
        ? {parserOpts: parserPreset.parserOpts}
        : {};

    debug("Use parserOpts: %0", parserOptions);

    const resultLintPromises = commits.map(({message}) =>
        lint(message, rules, parserOptions),
    );

    const reports = await Promise.all(resultLintPromises);

    const valid = reports.every((report) => report.valid);

    if (valid) {
        logger.success("Commits validated successfully!");
    } else {
        logger.error(format({results: reports}));
        logger.error("Commits validated failed!");

        throw new Error();
    }
};
