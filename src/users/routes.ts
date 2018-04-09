import * as Hapi from 'hapi';
import * as Joi from 'joi';
import UserController from './user-controller';
import { UserModel } from './user';
import * as UserValidator from './user-validator';
import { IDatabase } from '../database';
import { IServerConfigurations } from '../_config';

export default function(
  server: Hapi.Server,
  serverConfigs: IServerConfigurations,
  database: IDatabase
) {
  const userController = new UserController(serverConfigs, database);
  server.bind(userController);

  server.route({
    method: 'GET',
    path: '/users/info',
    // config: {
    handler: userController.infoUser,
    options: {
      auth: 'jwt',
      tags: ['api', 'users'],
      description: 'Get user info.',
      validate: {
        headers: UserValidator.jwtValidator
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'User found!'
            },
            '401': {
              description: 'Please login.'
            }
          }
        }
      }
    }
  });

  server.route({
    method: 'DELETE',
    path: '/users',
    // config: {
    handler: userController.deleteUser,
    options: {
      auth: 'jwt',
      tags: ['api', 'users'],
      description: 'Delete current user.',
      validate: {
        headers: UserValidator.jwtValidator
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'User deleted.'
            },
            '401': {
              description: 'User does not have authorization.'
            }
          }
        }
      }
    }
  });

  server.route({
    method: 'PUT',
    path: '/users',
    // config: {
    handler: userController.updateUser,
    options: {
      auth: 'jwt',
      tags: ['api', 'users'],
      description: 'Update current user info.',
      validate: {
        payload: UserValidator.updateUserModel,
        headers: UserValidator.jwtValidator
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Updated info.'
            },
            '401': {
              description: 'User does not have authorization.'
            }
          }
        }
      }
    }
  });

  server.route({
    method: 'POST',
    path: '/users',
    // config: {
    handler: userController.createUser,
    options: {
      // auth: false,
      auth: 'jwt',
      tags: ['api', 'users'],
      description: 'Create a user.',
      validate: {
        payload: UserValidator.createUserModel,
        headers: UserValidator.jwtValidator
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '201': {
              description: 'User created.'
            }
          }
        }
      }
    }
  });

  server.route({
    method: 'POST',
    path: '/users/login',
    // config: {
    handler: userController.loginUser,
    options: {
      auth: false,
      tags: ['api', 'users'],
      description: 'Login a user.',
      validate: {
        payload: UserValidator.loginUserModel
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'User logged in.'
            }
          }
        }
      }
    }
  });
}
