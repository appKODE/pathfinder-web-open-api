export const operationMap = {
  get: 'GET',
  put: 'PUT',
  post: 'POST',
  delete: 'DELETE',
  options: 'OPTIONS',
  head: 'HEAD',
  patch: 'PATCH',
  trace: 'TRACE',
} as const;

export const mockSpec = {
  servers: [
    {
      url: 'https://stoplight.io/mocks/kode-hsk/horoshkola-1/6096726',
      description: 'cloud mock',
    },
    {
      description: 'local mock',
      url: 'http://127.0.0.1:3100',
    },
    {
      url: 'https://dev.horoshkola.ru/api',
      description: 'dev',
    },
  ],
  paths: {
    '/auth/v1/confirm': {
      post: {
        summary: 'Подтверждение OTP кода',
        operationId: 'post-auth-confirm',
        responses: {
          200: {
            description: 'Авторизация успешна',
            content: {
              'application/json': {
                schema: {
                  title: 'TokensPair',
                  type: 'object',
                  description: 'Пара токенов',
                  properties: {
                    accessToken: {
                      type: 'string',
                      description: 'Токен доступа',
                    },
                    refreshToken: {
                      title: 'RefreshToken',
                      type: 'string',
                      description: 'Токен обновления сессии',
                    },
                  },
                  required: ['accessToken', 'refreshToken'],
                },
              },
            },
          },
          403: {
            description:
              'Количество оставшихся попыток, если otpID существует. Если otpID не существует или попытки кончились - вернется 0.',
            content: {
              'application/json': {
                schema: {
                  title: 'ConfirmErrorResponse',
                  type: 'object',
                  properties: {
                    attempts: {
                      type: 'integer',
                      format: 'uint64',
                      minimum: 1,
                      exclusiveMinimum: false,
                    },
                  },
                  required: ['attempts'],
                },
              },
            },
            headers: {},
          },
          422: {
            description: 'Example response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  title: 'ConfirmResponse422',
                  properties: {
                    code: {
                      type: 'string',
                      title: 'ConfirmCode422',
                      enum: [
                        'ErrUserNotFound',
                        'ErrTooManyContacts',
                        'ErrUserHasNotChildren',
                      ],
                    },
                  },
                  required: ['code'],
                },
              },
            },
          },
          500: {
            description: 'Internal Server Error',
          },
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                title: 'ConfirmRequest',
                type: 'object',
                properties: {
                  otpID: {
                    type: 'string',
                    title: 'OTPID',
                    description: 'Идентификатор OTP',
                    format: 'uuid',
                  },
                  otpCode: {
                    type: 'string',
                    description: 'OTP код',
                    pattern: '\\d+',
                    minLength: 1,
                  },
                },
                required: ['otpID', 'otpCode'],
              },
            },
          },
        },
        description: '',
        tags: ['auth'],
        'x-internal': false,
        security: [],
      },
      parameters: [],
    },
  },
};
