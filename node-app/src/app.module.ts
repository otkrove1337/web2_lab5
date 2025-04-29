import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import {Category} from "./categories/category.entity";
import {Product} from "./products/product.entity";
import {
    KeycloakConnectModule,
    ResourceGuard,
    RoleGuard,
    AuthGuard,
  } from 'nest-keycloak-connect';
  import { APP_GUARD } from '@nestjs/core';
  import { TokenValidation } from 'nest-keycloak-connect';


@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'pg',
            port: 5432,
            username: 'pguser',
            password: 'password',
            database: 'nestjs',
            entities: [Category, Product],
            synchronize: true,
            autoLoadEntities: true,
        }),
        KeycloakConnectModule.register({
            authServerUrl: 'http://localhost:8080/', 
            realm: 'master',
            clientId: 'products-app',
            secret: 'NzScBVP4X6zIFPQlIH0SOkCvhVdZ6exb',
            bearerOnly: true,
            tokenValidation: TokenValidation.OFFLINE,
            realmPublicKey:"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1q7Ipw4eC4Q8E7E+ax6caercHL8q8Rc5dVD1Mi26TcQKqdMNOeWQBEk00jDARFH/z57We+B3PAU7Kqy1qhEfUbq2gOhJHSsTbjy6qN2WPB/fNl8USr9buostIEFz4rYdkZ+GE80ESGQ7xTp78Mr4BYt/v7/781YVjuOEL9gupE+oeh10OEpT5pzLe3+31jAG0WD9P9LFp+tqAQFIOM4Hb3gO2TAYENqP+hXsR/Q+Q3XxUqqpD4uHKOe8pxT84T7ErrTYURqS4WD9awZbRPTKBWrBySPSYgaVrUS/+NccjOWgNghLxPua2E3L+Nq9OTi/4hJgnuEICfWICTVXjF2fhQIDAQAB"
          }),
        CategoriesModule,
        ProductsModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        // This adds a global level authentication guard,
        // you can also have it scoped
        // if you like.
        //
        // Will return a 401 unauthorized when it is unable to
        // verify the JWT token or Bearer header is missing.
        {
          provide: APP_GUARD,
          useClass: AuthGuard,
        },
        // This adds a global level resource guard, which is permissive.
        // Only controllers annotated with @Resource and 
        // methods with @Scopes
        // are handled by this guard.
        {
          provide: APP_GUARD,
          useClass: ResourceGuard,
        },
        // New in 1.1.0
        // This adds a global level role guard, which is permissive.
        // Used by `@Roles` decorator with the 
        // optional `@AllowAnyRole` decorator for allowing any
        // specified role passed.
        {
          provide: APP_GUARD,
          useClass: RoleGuard,
        },
      ],
})
export class AppModule {
}
