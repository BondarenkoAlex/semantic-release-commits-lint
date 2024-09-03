import {analyzeCommits as analyzeCommitsLibrary} from "./lib/analyze-commits.js";
import {verifyConfig} from "./lib/verify-config.js";

async function analyzeCommits(pluginConfig = {}, context) {
    await verifyConfig(pluginConfig, context);
    await analyzeCommitsLibrary(pluginConfig, context);
}

export {analyzeCommits};
