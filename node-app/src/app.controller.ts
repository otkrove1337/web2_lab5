import { Controller, Get, Request } from '@nestjs/common';
import { AppService } from './app.service';
import {ApiExcludeController, ApiTags} from "@nestjs/swagger";
import { Unprotected, Roles, RoleMatchingMode } from 'nest-keycloak-connect';

@Controller()
@ApiExcludeController()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/public')
  @Unprotected()
  getPublic(): string {
    return `${this.appService.getHello()} from public`;
  }

  @Get('/viewer')
  @Roles({ roles: ['ProductsApiViewer'], resource: 'realm', mode: RoleMatchingMode.ANY } as any)
  getViewer(): string {
    return `${this.appService.getHello()} from ProductsApiViewer`;
  }

  @Get('/writer')
  @Roles({ roles: ['ProductsApiWriter'], resource: 'realm', mode: RoleMatchingMode.ANY } as any)
  getWriter(): string {
    return `${this.appService.getHello()} from ProductsApiWriter`;
  }
  
  @Get('/all')
  @Unprotected()
  getAll(): string {
    return `${this.appService.getHello()} from all`;
  }
}
