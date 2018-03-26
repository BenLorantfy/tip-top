module.exports = {
  "collectCoverageFrom": [
    "src/**/*.{js,jsx}",
    "!src/**/*.test.{js,jsx}"
  ],
  "moduleDirectories": [
    "node_modules"
  ],
  "setupTestFrameworkScriptFile": "<rootDir>/testing/setup.js",
  "testRegex": "src/?.*/?__tests__/.*\\.test\\.js$"
}
