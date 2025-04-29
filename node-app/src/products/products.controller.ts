import {Body, Controller, Delete, Get, NotFoundException, Post, Query} from '@nestjs/common';
import {Pagination} from "nestjs-typeorm-paginate";
import {ProductsService} from "./products.service";
import {Product} from "./product.entity";
import { Param } from '@nestjs/common';
import { CreateProductDto } from './create-product.dto';
import { ParseIntPipe } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { paginate } from 'nestjs-typeorm-paginate';
import { Roles, Resource, RoleMatchingMode } from 'nest-keycloak-connect';


@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get('')
    @Roles({ roles: ['ProductsApiViewer'], resource: 'realm', mode: RoleMatchingMode.ANY } as any)
    async index(
        @Query('page') page = 1,
        @Query('limit') limit = 10,
        @Query('category_id') categoryId?: number,
        @Query('filter.category_id') filterCategoryId?: number,
    ): Promise<Pagination<Product>> {
        const finalCategoryId = categoryId ?? filterCategoryId;

        const queryBuilder = this.productsService.repository.createQueryBuilder('product');

        if (finalCategoryId) {
            queryBuilder.where('product.category_id = :categoryId', { categoryId: finalCategoryId });
        }

        return paginate<Product>(queryBuilder, { page, limit });
    }


    @Get(':id')
    @Roles({ roles: ['ProductsApiViewer'], resource: 'realm', mode: RoleMatchingMode.ANY } as any)
    show(@Param('id', ParseIntPipe) id: number): Promise<Product | null> {
        return this.productsService.findOne(id);
    }

    @Post('')
    @Roles({ roles: ['ProductsApiWriter'], resource: 'realm', mode: RoleMatchingMode.ANY } as any)
    store(@Body() productData: CreateProductDto): Promise<Product> {
        return this.productsService.create(productData);
    }

    @Delete(':id')
    @Roles({ roles: ['ProductsApiWriter'], resource: 'realm', mode: RoleMatchingMode.ANY } as any)
    async delete(@Param('id') id: number): Promise<void> {
        const deleted = await this.productsService.remove(id);
        if (!deleted.affected) {
            throw new NotFoundException(`Product #${id} not found`);
        }
    }
    
    @Put(':id')
    @Roles({ roles: ['ProductsApiWriter'], resource: 'realm', mode: RoleMatchingMode.ANY } as any)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() productData: CreateProductDto,
    ): Promise<Product> {
        const product = await this.productsService.update(id, productData);
        if (!product) {
            throw new NotFoundException(`Product #${id} not found`);
        }
        return product;
}
    
}