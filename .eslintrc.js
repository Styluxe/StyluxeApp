module.exports = {
  root: true,
  extends: ["universe/native"],
  rules: {
    // Ensures props and state inside functions are always up-to-date
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
