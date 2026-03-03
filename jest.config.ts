import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1",
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    testMatch: ["<rootDir>/tests/**/*.test.ts"],
    collectCoverageFrom: [
        "lib/**/*.ts",
        "app/api/**/*.ts",
        "!**/*.d.ts",
    ],
};

export default config;
