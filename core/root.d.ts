import { NextFunction, Request, Response } from "express";
import { Router } from "../router";
import { Socket } from "socket.io";

export interface ExtendedGlobal extends NodeJS.Global {
  [key: string]: any;
}

type IndexSignature = string | number;

export type Json = {
  [member: string]:
    | string
    | number
    | boolean
    | undefined
    | Date
    | object
    | Function
    | symbol
    | any
    | Json;
};

export type GenericJSON<T> = Record<string, T>;

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
  /**
   * @key notFoundControllerPath: @type string
   *
   * Specify absolute path of not found controller
   */
  notFoundControllerPath?: string | null;
  /**
   * @key session: @type { secret: string; resave: boolean; saveUninitialized: boolean; }
   *
   * Specify absolute path of not found controller
   */
  session?: {
    secret: string;
    resave: boolean;
    saveUninitialized: boolean;
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
  type:
    | "mysql"
    | "postgresql"
    | "sqlite"
    | "mongodb"
    | "oracle"
    | "maria"
    | "casandra"
    | "other";
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
  image?: { folder: string; middleware?: MiddlewareAction[] };
  document?: { folder: string; middleware?: MiddlewareAction[] };
  video?: { folder: string; middleware?: MiddlewareAction[] };
  audio?: { folder: string; middleware?: MiddlewareAction[] };
  archive?: { folder: string; middleware?: MiddlewareAction[] };
  other?: { folder: string; middleware?: MiddlewareAction[] };
  css?: { folder: string; middleware?: MiddlewareAction[] };
  captcha_image?: { folder: string; middleware?: MiddlewareAction[] };
  i18n?: { folder: string; middleware?: MiddlewareAction[] };
  javascript?: { folder: string; middleware?: MiddlewareAction[] };
  text?: { folder: string; middleware?: MiddlewareAction[] };
  voice?: { folder: string; middleware?: MiddlewareAction[] };
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

export type AllowedFileTypes = "audio" | "document" | "image" | "video";

// export type RouterGroupELement = {
//   verb: "GET" | "POST" | "PUT" | "DELETE";
//   brick: string;
//   middlewares: MiddlewareAction[];
//   controller: ControllerAction;
// };

export type RouterGroupCallback = {
  (routerChild: Router): void;
};

export type MiddlewareRouting = {
  _get: {
    (
      brick: string,
      middlewares: MiddlewareAction[],
      controller: ControllerAction
    ): MiddlewareRouting;
  };
  _post: {
    (
      brick: string,
      middlewares: MiddlewareAction[],
      controller: ControllerAction
    ): MiddlewareRouting;
  };
  _put: {
    (
      brick: string,
      middlewares: MiddlewareAction[],
      controller: ControllerAction
    ): MiddlewareRouting;
  };
  _delete: {
    (
      brick: string,
      middlewares: MiddlewareAction[],
      controller: ControllerAction
    ): MiddlewareRouting;
  };
  _resource: {
    (
      brick: string,
      middlewares: MiddlewareAction[],
      controller: ResourceControllerInterface,
      specificResources?: ResourceArray
    ): MiddlewareRouting;
  };
};

export type RouterMiddlewareCallback = {
  (routerChild: MiddlewareRouting): void;
};

export type ControllerAction = {
  (req: Request, res: Response): void;
};

export type MiddlewareAction = {
  (req: Request, res: Response, next: NextFunction): void;
};

export type ServiceAction = {
  (req: Request, res: Response): any;
};

export type CriteriaFunction = {
  (req?: Request, res?: Response): boolean | Promise<boolean>;
};

export interface ResourceControllerInterface {
  /**
   * Documentation of index method
   *
   * @verb "GET"
   *
   * This method is used to get data using GET verb
   */
  index: ControllerAction;
  /**
   * Documentation of create method
   *
   * @verb "GET"
   *
   * This method is used to get form that will be used from the client to send data.
   * It's used with GET verb
   */
  create: ControllerAction;
  /**
   * Documentation of store method
   *
   * @verb "POST"
   *
   * This method is used to save data by POST verb
   */
  store: ControllerAction;
  /**
   * Documentation of show method
   *
   * This method is used to get specific data using GET verb
   */
  show: ControllerAction;
  /**
   * Documentation of edit method
   *
   * @verb "GET"
   *
   * This method is used to get form that will be used from the client to send specific data.
   * It's used with GET verb
   */
  edit: ControllerAction;
  /**
   * Documentation of update method
   *
   * @verb "PUT"
   *
   * This method is used to update specific data using PUT verb
   */
  update: ControllerAction;
  /**
   * Documentation of update method
   *
   * @verb "DELETE"
   *
   * This method is used to delete specific data using DELETE verb
   */
  destroy: ControllerAction;
}

export type EnvTemplate = {
  /**
   *@key port : @type number
   * Specify a port where the application will started.
   */
  port?: number;
  /**
   *@key host : @type string
   * Specify a host name where the application will started, usually, localhost has used.
   */
  host?: string;
  /**
   *@key maintenance : "enabled" | "disabled"
   * Specify if application is in maintenance mode, ie every request will resolve with response text associated to this mode.
   */
  maintenance?: "enabled" | "disabled";
  /**
   *@key adjustPort : boolean
   * Specify if the port must be adjust when the current value of port is busy on the system.
   */
  adjustPort?: boolean;
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

/**
 * @action "resource"
 *
 * This data is used to specify the type of action associated with the resource.
 *
 * - "create" corresponds to "GET" from route {brick}/create
 *
 * - "destroy" corresponds to "DELETE" from route {brick}/
 *
 * - "edit" corresponds to "GET" from route {brick}/:id/edit
 *
 * - "index" corresponds to "GET" from route {brick}/
 *
 * - "show" corresponds to "GET" from route {brick}/:id
 *
 * - "store" corresponds to "POST" from route {brick}/
 *
 * - "update" corresponds to "PUT" from route {brick}/:id
 *
 */
export type Resource =
  | "create"
  | "destroy"
  | "edit"
  | "index"
  | "show"
  | "store"
  | "update";

export type ResourceArray = Resource[];

type SqlComparator = "<" | ">" | "=" | "<>" | "<=" | ">=";

type LogicSqlOperator = "OR" | "AND" | "NOT" | "NOT";

type ComparableData = string | number;

export type SqlComparison = [
  /** Left value of sql comparison */
  ComparableData,
  /** Middle value of sql comparison */
  SqlComparator,
  /** Right value of sql comparison */
  ComparableData
];

export type SqlCriteria = [
  /** Left value of sql criteria */
  boolean | SqlCriteria | SqlComparison,
  /** Middle value of sql criteria */
  LogicSqlOperator,
  /** Right value of sql criteria */
  boolean | SqlCriteria | SqlComparison
];

export interface RequestValidatorInterface {
  template: Json;
  onFail?: { message: Json };
  validate: { (): void };
}

export type FieldTemplate = {
  name: string;
  valueType: "integer" | "varchar" | "text" | "numeric" | "boolean";
  length?: number | null;
  nullable?: boolean;
  fillable?: boolean;
  defaultValue?: any | "computed";
};

export type ValidationReport = {
  success: boolean;
  message?: string;
};

export type CriteriaOption = {
  WHERE?: string;
  DESC?: Boolean;
  ORDER_BY?: "string";
  LIMIT?: number | string;
};

export type StringJson = {
  [member: string]: string | string[];
};

type RuleName =
  | "required"
  | "numeric"
  | "integer"
  | "text"
  | "min"
  | "max"
  | "custom";

type RuleConfig1 = {
  messageOnFail: string;
};

type RuleConfig2 = {
  limit: number | string;
  messageOnFail: string;
};

type RuleConfig3 = {
  minLength?: number;
  maxLength?: number;
  messageOnFail: string;
};

type RuleConfig4 = {
  callback: (data: any) => boolean;
  messageOnFail: string;
};

type RuleObject = {
  required?: RuleConfig1;
  numeric?: RuleConfig1;
  integer?: RuleConfig1;
  text?: RuleConfig3;
  min?: RuleConfig2;
  max?: RuleConfig2;
  custom?: RuleConfig4;
};

export type RuleType = {
  [member: string]: RuleObject;
};

export type UrlRulesType = {
  params?: RuleType;
  query?: RuleType;
};

export type RequestStrategyType = "body" | "params" | "query";

export type NewShopTemplate = {
  owner: number;
  shop_name: string;
  shop_pseudo: string;
  is_public: boolean;
  shop_token: null;
  logo: string;
  supported_payment_methods: string;
  phone_number: null;
  phone_numbers: null;
  links: null;
  location: string;
  geolocation: null;
  medias: null;
  created_at: string;
  updated_at: null;
  deleted_at: null;
};

export type UpdateShopTemplate = {
  shop_name?: string;
  logo?: string;
  phone_number?: number;
  phone_numbers?: string;
  links?: string;
  location?: string;
  geolocation?: string;
  updated_at?: string;
};

export type CustomResponse =
  | {
      failure: boolean;
      report: string;
    }
  | { result: any };

export type NewArticleTemplate = {
  article_name: string;
  description: string;
  cover: string;
  creator: number;
  shop_owner: number;
  comment_counter: number;
  like_counter: number;
  price: number;
  currency: number;
  initial_stock: number;
  current_stock: number;
  stock_alert: number;
  category: null;
  supplier: null;
  article_medias: null;
  created_at: string;
  updated_at: null;
  deleted_at: null;
};

export type UpdateArticleTemplate = {
  article_name?: string;
  description?: string;
  price?: number;
  currency?: number;
  updated_at?: string;
};

export type UpdateArticleCategoryTemplate = {
  category: number | null;
};

export type NewShopCategoryTemplate = {
  category: number;
  creator: number;
  shop_owner: number;
  created_at: string;
  updated_at: null;
  deleted_at: null;
};

export type NewCategoryTemplate = {
  category_name: string;
};

export type UpdateCategoryTemplate = {
  category_name: string;
};

export type SocketRoutingObject<T> = {
  name?: string;
  middlewares: SocketMiddlewareType<T>[];
  controller?: SocketControllerAction<T>;
};

export type SocketServerMiddlewareAction = {
  (socket: Socket, next?: Function): void;
};

export type SocketMiddlewareAction = {
  (socket: Socket, next?: Function): void;
};

export type SocketEventMiddlewareAction<T> = {
  (value: T): boolean;
};

// export type SocketMiddlewareType<T> = {
//   // type: "on-server" | "on-socket" | "in-socket-action";
//   type: "on-server" | "in-socket-action";
//   action:
//     // | SocketMiddlewareAction
//     | SocketServerMiddlewareAction
//     | SocketEventMiddlewareAction<T>;
// };

export type SocketMiddlewareType<T> =
  | {
      type: "in-socket-action";
      action: SocketEventMiddlewareAction<T>;
    }
  | {
      type: "on-server";
      action: SocketServerMiddlewareAction;
    };

export type SocketTools<T> = {
  dispatch?: { (name: string, data: T, callback?: { (data: T): T }): void };
  dispatchTo?: {
    (
      socketId: string,
      name: string,
      data: T,
      callback?: { (data: T): T }
    ): void;
  };
  broadcastDispatching?: {
    (name: string, data: T, callback: { (data: T): T }): void;
  };
};

export type SocketControllerAction<T> = {
  (data: T, socket?: Socket, tools?: SocketTools<T>): void;
};

export type RouterStack = {
  stackName: string;
  data: {
    name: string | null;
    pattern: string;
    verb: "GET" | "POST" | "PUT" | "DELETE";
    action: ControllerAction;
  }[];
}[];

export declare function Root();
