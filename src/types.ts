import { EnvSpec, UrlSpec } from '@kode-frontend/pathfinder-web-core';

export type QueryParameter = {
  schema: Schema;
  in: 'query';
  name: string;
};

export type PathParameter = {
  schema: Schema;
  in: 'path';
  required: true;
  name: string;
};

export type HeaderParameter = {
  schema: Schema;
  in: 'header';
  name: string;
};

export type CookieParameter = {
  schema: Schema;
  in: 'cookie';
  name: string;
};

export type Parameter =
  | QueryParameter
  | PathParameter
  | HeaderParameter
  | CookieParameter;

export interface Server {
  url: string;
  description?: string;
}

export interface Paths {
  [url: string]: PathItem;
}

export type OperationType =
  | 'get'
  | 'put'
  | 'post'
  | 'delete'
  | 'options'
  | 'head'
  | 'patch'
  | 'trace';

export type PathItemOperations = {
  [operation in OperationType]?: Operation;
};

export interface PathItem extends PathItemOperations {
  summary?: string;
  description?: string;
  parameters?: Parameter[];
}

export interface Operation {
  operationId: string;
  summary: string;
  tags?: string[];
  description?: string;
  parameters?: Parameter[];
  requestBody?: RequestBody;
  deprecated?: boolean;
}

export type ContentType = 'application/json';

export interface RequestBody {
  description?: string;
  content: {
    [k in ContentType]: Schema;
  };
  required?: boolean;
}

export interface Schema {
  title?: string;
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: boolean;
  minimum?: number;
  exclusiveMinimum?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  maxProperties?: number;
  minProperties?: number;
  required?: [string, ...string[]];
  enum?: [unknown, ...unknown[]];
  type?: 'array' | 'boolean' | 'integer' | 'number' | 'object' | 'string';
  not?: Schema;
  allOf?: Schema[];
  oneOf?: Schema[];
  anyOf?: Schema[];
  items?: Schema;
  properties?: {
    [k: string]: Schema;
  };
  additionalProperties?: Schema | boolean;
  description?: string;
  format?: string;
  nullable?: boolean;
  readOnly?: boolean;
  writeOnly?: boolean;
  deprecated?: boolean;
}

export interface OpenApiSpec {
  servers: Server[];
  paths: Paths;
}

export type ParseResult = { urls: UrlSpec[]; envs: EnvSpec[] };
