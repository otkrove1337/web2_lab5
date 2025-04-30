import {Body, Controller, Delete, Get, NotFoundException, Post, Query, Req, Param} from '@nestjs/common';
import {Pagination} from "nestjs-typeorm-paginate";
import {Category} from "./category.entity";
import {CategoriesService} from "./categories.service";
import { Request } from 'express';
import {CreateCategoryDto} from "./create-category.dto";
import { ParseIntPipe } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/product.entity';
import { Put } from '@nestjs/common';
import { Roles, Resource } from 'nest-keycloak-connect';
import { RoleMatchingMode } from 'nest-keycloak-connect';


@Controller('categories')
export class CategoriesController {
    constructor(
        private readonly categoriesService: CategoriesService,
        private readonly productsService: ProductsService,
    ) {}
    @Get('')
    @Roles({ roles: ['ProductsApiViewer'], resource: 'realm', mode: RoleMatchingMode.ANY } as any)
    index(@Query('page') page = 1,  @Query('limit') limit = 10): Promise<Pagination<Category>> {
        return this.categoriesService.paginate({limit:limit, page:  page});
    }

    @Get(':id')
    @Roles({ roles: ['ProductsApiViewer'], resource: 'realm', mode: RoleMatchingMode.ANY } as any)
    show(@Param('id', ParseIntPipe) id: number): Promise<Category | null> {
        return this.categoriesService.findOne(id);
    }

    @Post('')
    @Roles({ roles: ['ProductsApiWriter'], resource: 'realm', mode: RoleMatchingMode.ANY } as any)
    store(@Body() categoryData: CreateCategoryDto ): Promise<Category> {
        return this.categoriesService.create(categoryData);
    }
    @Delete(':id')
    @Roles({ roles: ['ProductsApiWriter'], resource: 'realm', mode: RoleMatchingMode.ANY } as any)
    async delete(@Param('id') id: number): Promise<void> {
        const deleted = await this.categoriesService.remove(id);
        if (!deleted.affected) {
            throw new NotFoundException(`Category #${id} not found`);
        }
    }

    @Get(':id/products')
    @Roles({ roles: ['ProductsApiViewer'], resource: 'realm', mode: RoleMatchingMode.ANY } as any)
    async getProductsByCategory(@Param('id', ParseIntPipe) id: number): Promise<Product[]> {
        const category = await this.categoriesService.findOne(id);
        if (!category) {
            throw new NotFoundException(`Category #${id} not found`);
        }
        return this.productsService.findByCategoryId(id);
    }

    @Put(':id')
    @Roles({ roles: ['ProductsApiWriter'], resource: 'realm', mode: RoleMatchingMode.ANY } as any)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() categoryData: CreateCategoryDto,
    ): Promise<Category> {
        const category = await this.categoriesService.update(id, categoryData);
        if (!category) {
            throw new NotFoundException(`Category #${id} not found`);
        }
        return category;
}
}