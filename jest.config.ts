module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    globalTeardown: './scripts/jest.globalTeardown.js',
};