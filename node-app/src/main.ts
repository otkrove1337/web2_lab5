import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('NestJs API Documentation')
    .setDescription('Backend API for the NestJs application.')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'access-token',
    )
    .addSecurityRequirements('access-token')
    .addOAuth2(
      {
        type: 'oauth2',
        flows: {
          authorizationCode: {
            authorizationUrl:
              'http://localhost:8080/realms/master/protocol/openid-connect/auth',
            tokenUrl:
              'http://localhost:8080/realms/master/protocol/openid-connect/token',
            scopes: {
              openid: 'OpenID Connect scope',
              profile: 'Profile info',
            },
          },
          clientCredentials: {
            tokenUrl:
              'http://localhost:8080/realms/master/protocol/openid-connect/token',
            scopes: {
              openid: 'OpenID Connect scope',
              profile: 'Profile info',
            },
          },
        },
      },
      'oauth2',
    )
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, {
      swaggerOptions: {
        oauth2RedirectUrl: 'http://localhost:3000/api/oauth2-redirect.html',
        persistAuthorization: true,
        oauth: {
          clientId: 'products-app',
          clientSecret: 'NzScBVP4X6zIFPQlIH0SOkCvhVdZ6exb',
          useBasicAuthenticationWithAccessCodeGrant: true,
        },
      },
    });

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
