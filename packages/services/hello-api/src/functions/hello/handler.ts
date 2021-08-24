import 'source-map-support/register';
import { hello } from '@monorepo/hello';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  return formatJSONResponse({
    message: `${hello(event.body.name)}, welcome to the exciting Serverless world!`,
    event,
  });
}

export const main = middyfy(handler);
