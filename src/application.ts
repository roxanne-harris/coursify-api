import { ApplicationConfig } from '@loopback/core';
import { RestApplication, RestServer, RestBindings } from '@loopback/rest';
import { MySequence } from './sequence';

/* tslint:disable:no-unused-variable */
// Binding and Booter imports are required to infer types for BootMixin!
import { BootMixin, Booter, Binding } from '@loopback/boot';
/* tslint:enable:no-unused-variable */

import {
  Class,
  Repository,
  RepositoryMixin,
  juggler
} from '@loopback/repository';

export class GoldenThreadApiApplication extends BootMixin(
  RepositoryMixin(RestApplication)
) {
  constructor(options?: ApplicationConfig) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    // Use below for an in-memory database
    // var dataSourceConfig = new juggler.DataSource({
    //   name: "db",
    //   connector: "memory"
    // });
    // this.dataSource(dataSourceConfig);

    // Use below for MySQL database

    // THIS DOES NOT WORK YET
    
    var dataSourceConfig = new juggler.DataSource({
      name: "db",
      connector: "loopback-connector-mysql",
      host: "localhost",
      port: 3306,
      database: "golden_thread",
      user: "root",
      password: "root",
      insecureAuth: true
    });
    this.dataSource(dataSourceConfig);
  }



async start() {
  await super.start();

  const server = await this.getServer(RestServer);
  const port = await server.get(RestBindings.PORT);
  console.log(`Server is running at http://127.0.0.1:${port}`);
  console.log(`Try http://127.0.0.1:${port}/ping`);
}
}
