import { DataSource } from 'typeorm';
import { seedCategories } from './category.seeder';
import { seedProducts } from './product.seeder';
import {Category} from "../categories/category.entity";
import {Product} from "../products/product.entity";

const dataSource = new DataSource({
    type: 'postgres',
    host: 'pg',
    port: 5432,
    username: 'pguser',
    password: 'password',
    database: 'nestjs',
    entities: [Category, Product],
    synchronize: true,
});

async function runSeeders() {
    try {
        await dataSource.initialize();
        console.log('✅ Data Source has been initialized!');

        const categories = await seedCategories(dataSource);
        await seedProducts(dataSource, categories);

        console.log('✅ Seeding completed!');
    } catch (error) {
        console.error('❌ Error during seeding:', error);
    } finally {
        await dataSource.destroy();
    }
}

runSeeders();