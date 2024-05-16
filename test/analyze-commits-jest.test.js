import {jest, expect, test, beforeEach, afterEach} from '@jest/globals';

const mockDebugDefault = jest.fn(() => jest.fn()); // Default implementation

const mockDebugEnable = jest.fn(() => jest.fn()); // Default implementation

jest.unstable_mockModule('debug', () => {
  const object = {default: mockDebugDefault};
  object.default.enable = mockDebugEnable;
  return object;
});

const mockLoadDefault = jest.fn().mockResolvedValue({
  parserPreset: undefined,
  rules: {'type-enum': [2, 'always', ['fix']]},
});

jest.unstable_mockModule('@commitlint/load', () => ({
  default: mockLoadDefault,
}));

const {default: defaultLintOriginal} = await import(`@commitlint/lint`);
const mockLint = jest.fn(defaultLintOriginal);
jest.unstable_mockModule('@commitlint/lint', () => ({
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
    commits: [{message: ''}],
  };
});

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

test('Empty commits', async () => {
  context.commits = undefined;

  const {analyzeCommits} = await import(`../lib/analyze-commits.js`);

  await analyzeCommits(undefined, context);

  expect(context.logger.warn).toHaveBeenCalledWith(
    'You don`t have commits. Skip plugin.',
  );
});

test("Enable 'debug'", async () => {
  context.options.debug = true;

  const {analyzeCommits} = await import(`../lib/analyze-commits.js`);

  await analyzeCommits(undefined, context);

  expect(mockDebugEnable).toHaveBeenCalledTimes(1);
});

test("Can be call module '@commitlint/load'", async () => {
  const {analyzeCommits} = await import(`../lib/analyze-commits.js`);

  await analyzeCommits(undefined, context);

  expect(mockLoadDefault).toHaveBeenCalled();
});

test('Rules`s commitlint configuration is empty', async () => {
  mockLoadDefault.mockResolvedValueOnce({
    parserPreset: undefined,
    rules: undefined,
  });

  const {analyzeCommits} = await import(`../lib/analyze-commits.js`);

  await analyzeCommits(undefined, context);

  expect(context.logger.warn).toHaveBeenCalledWith(
    'Rules`s commitlint configuration is empty.',
    expect.anything(),
  );
});

test('Can be call module @commitlint/lint', async () => {
  const {analyzeCommits} = await import(`../lib/analyze-commits.js`);

  await analyzeCommits(undefined, context);

  expect(mockLint).toHaveBeenCalled();
});

test('Valid comment', async () => {
  context.commits = [{message: 'fix: first commit message'}];

  const {analyzeCommits} = await import(`../lib/analyze-commits.js`);

  await analyzeCommits(undefined, context);

  expect(context.logger.success).toHaveBeenCalledWith(
    'Commits validated successfully!',
  );
});

test('fail comment', async () => {
  context.commits = [{message: 'anything: Fail comment'}];

  const {analyzeCommits} = await import(`../lib/analyze-commits.js`);

  try {
    await analyzeCommits(undefined, context);
  } catch {
  } finally {
    expect(context.logger.error).toHaveBeenCalledWith(
      'Commits validated failed!',
    );
  }
});
