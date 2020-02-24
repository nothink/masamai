import { resolve } from 'path';

export const DEFAULT_LISTEN_PORT = 3000;

export const DEFAULT_MONGO_URL = 'mongodb://localhost/masamai';
export const DEFAULT_MONGO_ROOT_USERNAME = 'root';
export const DEFAULT_MONGO_ROOT_PASSWORD = 'svpc4EJvz';

export const DEFAULT_REDIS_HOST = 'localhost';
export const DEFAULT_REDIS_PORT = 6379;
export const DEFAULT_REDIS_DB = 0;
export const RESOURCES_REDIS_DB = 1;

export const DEFAULT_ROUTE_PREFIX = '/api/v1';

export const GS_BUCKET_NAME = 'masamai';
export const GS_KEY_FILE_PATH = resolve(__dirname, '../config/seio.json');

export const RESOURCE_MAIL_PUG_PATH = resolve(__dirname, '../templates/resource.pug');
