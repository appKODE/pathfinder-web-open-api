import { DataResolver } from '@kode-frontend/pathfinder-web-core';

import { parseJSON } from './utils/resolver';

export const openApiResolver: DataResolver = {
  parse: parseJSON,
};
