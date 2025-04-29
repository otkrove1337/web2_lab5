import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DeleteResult } from "typeorm";
import { Product } from "./product.entity";
import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";
import { CreateProductDto } from './create-product.dto';


@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        public repository: Repository<Product>,
    ) {}
    public create(productData: CreateProductDto): Promise<Product> {
        return this.repository.save(productData);
    }
    public findAll(): Promise<Product[]> {
        return this.repository.find();
    }
    public findOne(id: number): Promise<Product | null> {
        return this.repository.findOne({ where: { id } }).then(product => product ?? null);
    }
    public remove(id: number): Promise<DeleteResult> {
        return this.repository.delete(id);
    }
    public paginate(options: IPaginationOptions): Promise<Pagination<Product>> {
        return paginate<Product>(this.repository, options);
    }
    public findByCategoryId(categoryId: number): Promise<Product[]> {
        return this.repository.find({ where: { category_id: categoryId } });
    }
    public async update(id: number, productData: CreateProductDto): Promise<Product | null> {
        const product = await this.repository.findOne({ where: { id } });
        if (!product) {
            return null;
        }
        await this.repository.update(id, productData);
        return this.repository.findOne({ where: { id } });
    }
    
}
