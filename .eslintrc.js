module.exports = {
  extends: ["@geolonia/eslint-config/typescript"],
  env: {
    node: true,
  },
  parserOptions: {
    project: ["tsconfig.json"],
  },
};
