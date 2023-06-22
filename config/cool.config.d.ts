import e from "express";

export type Config = {
  authorizationTokenPrefix?: string;
  /**
   * @key useRealtime: @type boolean
   *
   * Specify if application is realtime
   */
  useRealtime?: boolean;
  /**
   * @key corsConfig: @type Json
   *
   * Specify cors configuration about application
   */
  corsConfig?: Json;
  /**
   * @key storagePath: @type string
   *
   * Specify absolute path of folder to use as storage
   */
  storagePath?: string;
  /**
   * @key storeFolders: @type Json
   *
   * Contains an objet which have all folder names to use in the storage application
   */
  storeFolders?: Json;
  /**
   * @key viewConfig: @type Json
   *
   * Contains two keys such as engine and folder.
   * ** @key engine
   * ** specify which engine template will used in tha application.
   * ** @key folder
   * ** specify which folder will contain all templates files.
   */
  viewConfig?: {
    engine: string;
    folder: string;
  };
};

export type DbConfig = {
  /**
   * @key type: "mysql" | "postgresql" | "sqlite" | "mongodb" | "oracle" | "maria" | "casandra" | "other"
   *
   * Only "mysql" is supported actually
   *
   * Specify database type.
   */
  type: "cooldb";
  /**
   * @key host: @type string
   *
   * Specify name of host which contains database.
   */
  host: string;
  /**
   * @key user: @type string
   *
   * Specify user who connect to the database.
   */
  user: string;
  /**
   * @key password: @type string
   *
   * Specify password of user who connect to the database.
   */
  password: string;
  /**
   * @key database: @type string
   *
   * Specify database name.
   */
  database: string;
  /**
   * @key storeFolders: @type boolean
   *
   * Specify multiple statements status.
   */
  multipleStatements?: boolean;
};

export type MailConfig = {
  emailSender: string;
  emailPassword: string;
  emailService: string;
  emailHost: string;
  emailPort: number;
};

export type LogConfig = {
  logsFolder: string;
  showInConsole: boolean;
  extension: "json" | "txt";
};

export type StorageConfig = {
  image?: { folder: string; middleware?: LakafMiddlewareAction[] };
  document?: { folder: string; middleware?: LakafMiddlewareAction[] };
  video?: { folder: string; middleware?: LakafMiddlewareAction[] };
  audio?: { folder: string; middleware?: LakafMiddlewareAction[] };
  archive?: { folder: string; middleware?: LakafMiddlewareAction[] };
  other?: { folder: string; middleware?: LakafMiddlewareAction[] };
  css?: { folder: string; middleware?: LakafMiddlewareAction[] };
  captcha_image?: { folder: string; middleware?: LakafMiddlewareAction[] };
  i18n?: { folder: string; middleware?: LakafMiddlewareAction[] };
  javascript?: { folder: string; middleware?: LakafMiddlewareAction[] };
  text?: { folder: string; middleware?: LakafMiddlewareAction[] };
  voice?: { folder: string; middleware?: LakafMiddlewareAction[] };
};

export type UploadConfig = {
  limits: {
    archive?: number | "infinite";
    audio?: number | "infinite";
    captcha_image?: number | "infinite";
    css?: number | "infinite";
    document?: number | "infinite";
    i18n?: number | "infinite";
    image?: number | "infinite";
    javascript?: number | "infinite";
    other?: number | "infinite";
    text?: number | "infinite";
    video?: number | "infinite";
    voice?: number | "infinite";
  };
};

export type ConfigType = {
  /**
   *@key PORT : @type number
   * Specify a port where the application will started.
   */
  PORT?: number;
  /**
   *@key HOST : @type string
   * Specify a host name where the application will started, usually, localhost has used.
   */
  HOST?: string;
  /**
   *@key maintenance : "enabled" | "disabled"
   * Specify if application is in maintenance mode, ie every request will resolve with response text associated to this mode.
   */
  maintenance?: "enabled" | "disabled";
  /**
   *@key mode : "development" | "production"
   * Specify if application is in development or production mode.
   */
  mode?: "development" | "production";
  /**
   *@key config : @type Config
   * Contains all configuration about application. Let's see config documentation.
   */
  config?: Config;
  /**
   *@key dbConfig : @type DbConfig
   * Contains all configuration about database. Let's see dbConfig documentation.
   */
  dbConfig?: DbConfig;
  /**
   *@key mailConfig : @type MailConfig
   * Contains all configuration about sending mail.
   */
  mailConfig?: MailConfig;
  /**
   *@key clientUrl : @type string
   * Contains client url.
   */
  clientUrl?: string;
  /**
   *@key jwtKey : @type string
   * Contains jwt key.
   */
  jwtKey: string;
  /**
   *@key logConfig : @type LogConfig
   * Contains all configuration about logConfig.
   */
  logConfig?: LogConfig;
  /**
   *@key storageConfig : @type StorageConfig
   * Contains all configuration about storage management in the application. Let see the storage configuration documentation.
   */
  storageConfig?: StorageConfig;
  /**
   *@key uploadConfig : @type UploadConfig
   * Contains all configuration about upload limit size management in the application. Let see the upload configuration documentation.
   */
  uploadConfig: UploadConfig;
};

export declare const defaultConfig: ConfigType;

export declare const serverConfig: ConfigType;
