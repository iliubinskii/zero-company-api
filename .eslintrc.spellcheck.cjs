/**
 * @type {import("eslint").Linter.Config }
 */
const config = {
  rules: {
    "spellcheck/spell-checker": [
      "warn",
      {
        comments: true,
        identifiers: true,
        lang: "en_US",
        minLength: 3,
        // @sort
        skipWords: [
          "accessor",
          "autofix",
          "bool",
          "builtins",
          "camelcase",
          "cjs",
          "cloudinary",
          "commonjs",
          "consts",
          "cors",
          "declarator",
          "defs",
          "destructure",
          "docu",
          "docuseal",
          "ecma",
          "enum",
          "envalid",
          "escompat",
          "eslintrc",
          "etag",
          "filenames",
          "formatter",
          "fullsetup",
          "globals",
          "gmail",
          "goto",
          "ico",
          "jpg",
          "jsdoc",
          "jsx",
          "lang",
          "langs",
          "lcfirst",
          "localhost",
          "logform",
          "matchers",
          "mjs",
          "mongodb",
          "multer",
          "namespace",
          "nonnegative",
          "nullable",
          "num",
          "oid",
          "openapi",
          "openid",
          "originalname",
          "parens",
          "pdf",
          "pem",
          "picsum",
          "printf",
          "readonly",
          "reconnectfailed",
          "redeclare",
          "redis",
          "req",
          "resave",
          "schemas",
          "serverless",
          "smacss",
          "sonarjs",
          "str",
          "stylelint",
          "stylelintrc",
          "submitters",
          "tagline",
          "tsconfig",
          "tsx",
          "ttl",
          "txt",
          "ucfirst",
          "undef",
          "unlink",
          "uploader",
          "upsert",
          "uri",
          "urls",
          "utf8",
          "uuidv4",
          "validators",
          "ver",
          "vercel",
          "webhooks",
          "winston",
          "yaml",
          "zod"
        ]
      }
    ]
  }
};

module.exports = config;
