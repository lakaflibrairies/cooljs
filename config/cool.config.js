const path = require("path");
const fs = require("fs");

const projectFolder = process.cwd();

var serverConfig = {};

const configExists = ["cool.config.js", "cool.config.json"].map((item) =>
  fs.existsSync(process.cwd() + "/" + item)
);

if (!configExists.includes(false)) {
  console.info(
    "Multiple configurations of project founded. Default configuration will applied. To use your configuration, make sure that you added a cool.config.js or cool.config.json at the root of your project folder, not both."
  );
}

if (!configExists.includes(true)) {
  console.info(
    "No configuration of project founded. Default configuration will applied. To use your configuration, make sure that you added a cool.config.js or cool.config.json at the root of your project folder, not both."
  );
}

if (configExists[1]) {
  serverConfig = require(projectFolder + "/cool.config.json");
} else {
  try {
    serverConfig = require(projectFolder + "/cool.config.js");
  } catch (error) {
    console.error(
      "No configuration exported on your cool.config.js. Default configuration will applied."
    );
  }
}

const defaultConfig = {
  port: 3030,
  host: "localhost",
  maintenance: "disabled",
  adjustPort: false,
  mode: "production",
  config: {
    authorizationTokenPrefix: "lakaf-token",
    useRealtime: false,
    corsConfig: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    },
    storagePath: path.resolve(projectFolder, "public"),
    storeFolders: {
      css: "css",
      js: "js",
      libs: "libs",
      imgs: "imgs",
      icons: "icons",
      fonts: "fonts",
      audios: "audios",
      videos: "videos",
    },
    viewConfig: {
      engine: "ejs", // Only ejs is supported.
      folder: "views",
    },
    notFoundControllerPath: null,
    session: {
      secret: "+LF1P.S6s#n(J0lTrn*G0oNJ[AtO1TX_",
      resave: false,
      saveUninitialized: true,
    },
  },
  dbConfig: {
    database: "localdb",
    host: "localhost",
    user: "root",
    password: "root",
    type: "cooldb",
    multipleStatements: false,
  },
  mailConfig: {
    emailSender: "no-config",
    emailPassword: "no-config",
    emailService: "no-config",
    emailPort: 0,
    emailHost: "no-config",
  },
  jwtKey: "*€$/sfgfrsfs~super_salt~45646846",
  clientUrl: "no-config",
  logConfig: {
    extension: "txt",
    logsFolder: path.resolve(projectFolder, "logs"), // logsFolder: path.resolve(__dirname, "logs") This is an example value. In this case, __dirname represents a folder that to use for save logs
    showInConsole: false,
  },
  storageConfig: {
    archive: {
      folder: path.resolve(projectFolder, "storage", "archives"), // path.resolve(__dirname, "storage", "archives") for example, with __dirname corresponding to folder to use
      middleware: [],
    },
    audio: {
      folder: path.resolve(projectFolder, "storage", "audios"), // path.resolve(__dirname, "storage", "audios") for example, with __dirname corresponding to folder to use
      middleware: [],
    },
    captcha_image: {
      folder: path.resolve(projectFolder, "storage", "captcha_images"), // path.resolve(__dirname, "storage", "captcha_images") for example, with __dirname corresponding to folder to use
      middleware: [],
    },
    css: {
      folder: path.resolve(projectFolder, "storage", "css"), // path.resolve(__dirname, "storage", "css") for example, with __dirname corresponding to folder to use
      middleware: [],
    },
    document: {
      folder: path.resolve(projectFolder, "storage", "documents"), // path.resolve(__dirname, "storage", "documents") for example, with __dirname corresponding to folder to use
      middleware: [],
    },
    i18n: {
      folder: path.resolve(projectFolder, "storage", "i18n"), // path.resolve(__dirname, "storage", "i18nFiles") for example, with __dirname corresponding to folder to use
      middleware: [],
    },
    image: {
      folder: path.resolve(projectFolder, "storage", "images"), // path.resolve(__dirname, "storage", "images") for example, with __dirname corresponding to folder to use
      middleware: [],
    },
    javascript: {
      folder: path.resolve(projectFolder, "storage", "javascript"), // path.resolve(__dirname, "storage", "javascript") for example, with __dirname corresponding to folder to use
      middleware: [],
    },
    other: {
      folder: path.resolve(projectFolder, "storage", "archives"), // path.resolve(__dirname, "storage", "archives") for example, with __dirname corresponding to folder to use
      middleware: [],
    },
    text: {
      folder: path.resolve(projectFolder, "storage", "texts"), // path.resolve(__dirname, "storage", "texts") for example, with __dirname corresponding to folder to use
      middleware: [],
    },
    video: {
      folder: path.resolve(projectFolder, "storage", "videos"), // path.resolve(__dirname, "storage", "videos") for example, with __dirname corresponding to folder to use
      middleware: [],
    },
    voice: {
      folder: path.resolve(projectFolder, "storage", "voices"), // path.resolve(__dirname, "storage", "voices") for example, with __dirname corresponding to folder to use
      middleware: [],
    },
  },
  uploadConfig: {
    limits: {
      // 1048576 = 1 Mo
      audio: 1048576,
      image: 1048576,
      document: 1048576,
      video: 1048576,
      other: 1048576,
    },
  },
};

exports.defaultConfig = defaultConfig;
exports.serverConfig = serverConfig;
