import path from "node:path";
import {writeFile} from "node:fs/promises";
import {jest, expect, test, beforeEach, afterEach} from "@jest/globals";
import {temporaryDirectory} from "tempy";

const mockDebugDefault = jest.fn(() => jest.fn()); // Default implementation

const mockDebugEnable = jest.fn(() => jest.fn()); // Default implementation

jest.unstable_mockModule("debug", () => {
    const object = {default: mockDebugDefault};
    object.default.enable = mockDebugEnable;
    return object;
});

const mockLoadDefault = jest.fn().mockResolvedValue({
    parserPreset: undefined,
    rules: {"type-enum": [2, "always", ["fix"]]},
});
const {default: defaultLoadOriginal} = await import(`@commitlint/load`);
jest.unstable_mockModule("@commitlint/load", () => ({
    default: mockLoadDefault,
}));

const {default: defaultLintOriginal} = await import(`@commitlint/lint`);
const mockLint = jest.fn(defaultLintOriginal);
jest.unstable_mockModule("@commitlint/lint", () => ({
    default: mockLint,
}));

let context;
beforeEach(() => {
    context = {
        logger: {
            warn: jest.fn(),
            error: jest.fn(),
            success: jest.fn(),
        },
        options: {debug: false},
        commits: [{message: ""}],
    };
});

afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
});

test("Empty commits", async () => {
    context.commits = undefined;

    const {analyzeCommits} = await import(`../lib/analyze-commits.js`);

    await analyzeCommits({}, context);

    expect(context.logger.warn).toHaveBeenCalledWith(
        "You don`t have commits. Skip plugin.",
    );
});

test("Enable 'debug'", async () => {
    context.options.debug = true;

    const {analyzeCommits} = await import(`../lib/analyze-commits.js`);

    await analyzeCommits({}, context);

    expect(mockDebugEnable).toHaveBeenCalledTimes(1);
});

test("Can be call module '@commitlint/load'", async () => {
    const {analyzeCommits} = await import(`../lib/analyze-commits.js`);

    await analyzeCommits({}, context);

    expect(mockLoadDefault).toHaveBeenCalled();
});

test("Rules`s commitlint configuration is empty", async () => {
    mockLoadDefault.mockResolvedValueOnce({
        parserPreset: undefined,
        rules: undefined,
    });

    const {analyzeCommits} = await import(`../lib/analyze-commits.js`);

    await analyzeCommits({}, context);

    expect(context.logger.warn).toHaveBeenCalledWith(
        "Rules`s commitlint configuration is empty.",
        expect.anything(),
    );
});

test("Can be call module @commitlint/lint", async () => {
    const {analyzeCommits} = await import(`../lib/analyze-commits.js`);

    await analyzeCommits({}, context);

    expect(mockLint).toHaveBeenCalled();
});

test("Valid comment", async () => {
    context.commits = [{message: "fix: first commit message"}];

    const {analyzeCommits} = await import(`../lib/analyze-commits.js`);

    await analyzeCommits({}, context);

    expect(context.logger.success).toHaveBeenCalledWith(
        "Commits validated successfully!",
    );
});

test("fail comment", async () => {
    context.commits = [{message: "anything: Fail comment"}];

    const {analyzeCommits} = await import(`../lib/analyze-commits.js`);

    try {
        await analyzeCommits({}, context);
    } catch {
    } finally {
        expect(context.logger.error).toHaveBeenCalledWith(
            "Commits validated failed!",
        );
    }
});

test("Must be pass with config", async () => {
    mockLoadDefault.mockImplementationOnce(defaultLoadOriginal);

    const commitlintConfig = {
        rules: {
            "type-enum": [2, "always", ["fix"]],
        },
    };

    context.commits = [{message: "anything: Fail comment"}];

    const {analyzeCommits} = await import(`../lib/analyze-commits.js`);

    try {
        await analyzeCommits({commitlintConfig}, context);
    } catch {
    } finally {
        expect(context.logger.error).toHaveBeenCalledWith(
            "Commits validated failed!",
        );
    }
});

test("Must be pass with config file", async () => {
    mockLoadDefault.mockImplementationOnce(defaultLoadOriginal);

    const cwd = temporaryDirectory();
    const commitlintFile = ".commitlintrc.json";
    const commitlintPath = path.resolve(cwd, commitlintFile);

    const commitlintFileContent = `{
        "rules": {
          "type-enum": [2, "always", ["fix"]]
        }
    }`;
    await writeFile(commitlintPath, commitlintFileContent);

    context.commits = [{message: "anything: Fail comment"}];

    const {analyzeCommits} = await import(`../lib/analyze-commits.js`);

    try {
        await analyzeCommits({commitlintFile: commitlintPath}, context);
    } catch {
    } finally {
        expect(context.logger.error).toHaveBeenCalledWith(
            "Commits validated failed!",
        );
    }
});
