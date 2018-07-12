import {Api_2Application} from './application';
import {ApplicationConfig} from '@loopback/core';

export {Api_2Application};

export async function main(options?: ApplicationConfig) {
  const app = new Api_2Application(options);
  await app.boot();
  await app.start();
  return app;
}
