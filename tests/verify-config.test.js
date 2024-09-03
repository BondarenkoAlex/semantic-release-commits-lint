import {expect, test} from "@jest/globals";
import {verifyConfig} from "../lib/verify-config.js";

test('Throw Error if "commitlintFile" option is not a String', async () => {
    const commitlintFile = 42;

    let error;
    try {
        verifyConfig({commitlintFile});
    } catch (error_) {
        error = error_.errors[0].code;
    } finally {
        expect(error).toBe("EINVALIDCOMMITLINTFILE");
    }
});

test('Throw Error if "commitlintConfig" option is not a object', async () => {
    const commitlintConfig = 42;

    let error;
    try {
        verifyConfig({commitlintConfig});
    } catch (error_) {
        error = error_.errors[0].code;
    } finally {
        expect(error).toBe("EINVALIDCOMMITLINTCONFIG");
    }
});

test('Verify undefined "commitlintFile" and "commitlintConfig"', async () => {
    expect(() => verifyConfig({})).not.toThrow();
});
