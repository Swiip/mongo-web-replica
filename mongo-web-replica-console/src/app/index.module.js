import angular from 'angular';
import angularAnimate from 'angular-animate';
import angularAria from 'angular-aria';
import angularMaterial from 'angular-material';

import * as MongoWebReplicaClient from '../../../mongo-web-replica-client/src/index';

import MainController from './main/main.controller';
import NavbarController from '../app/components/navbar/navbar.controller';

angular.module('mongoWebReplicaConsole', [angularAria, angularAnimate, angularMaterial])
  .controller('MainController', MainController)
  .controller('NavbarController', NavbarController);

MongoWebReplicaClient
  .connect('http://127.0.0.1:8000/')
  .then(() => {
    MongoWebReplicaClient.listen('test.test');
  });
