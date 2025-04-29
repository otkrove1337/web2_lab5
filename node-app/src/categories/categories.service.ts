import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Category} from "./category.entity";
import {DeleteResult, Repository} from "typeorm";
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";
import {CreateCategoryDto} from "./create-category.dto";

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private repository: Repository<Category>,
    ) {}

    public create(categoryData: CreateCategoryDto): Promise<Category> {
        return this.repository.save(categoryData);
    }

    public findAll(): Promise<Category[]> {
        return this.repository.find();
    }

    public findOne(id: number): Promise<Category | null> {
        return this.repository.findOne({ where: { id } }).then(result => result ?? null);
    }

    public async remove(id: number): Promise<DeleteResult> {
        if (!id) {
            throw new Error('Invalid ID provided for deletion');
        }
        return this.repository.delete(id);
    }
    public paginate(options: IPaginationOptions): Promise<Pagination<Category>> {
        return paginate<Category>(this.repository, options);
    }

    public async update(id: number, categoryData: CreateCategoryDto): Promise<Category | null> {
        const category = await this.repository.findOne({ where: { id } });
        if (!category) {
            return null;
        }
        await this.repository.update(id, categoryData);
        return this.repository.findOne({ where: { id } });
    }
}
