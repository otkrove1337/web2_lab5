import { DataSource } from 'typeorm';
import { Product } from '../products/product.entity';
import { Category } from '../categories/category.entity';

export async function seedProducts(dataSource: DataSource, categories: Category[]) {
    const repo = dataSource.getRepository(Product);

    const electronics = categories.find(c => c.name === 'Electronics');
    const books = categories.find(c => c.name === 'Books');

    if (!electronics || !books) {
        throw new Error('Required categories not found for products');
    }

    const products = [
      {
          name: 'Smartphone',
          description: 'Latest smartphone with cool features',
          price: 999.99,
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngarts.com%2Ffiles%2F3%2FSmartphone-Mobile-PNG-Image-Background.png&f=1&nofb=1&ipt=4a95db5471a4dcf346b56b43182cf7239ddf6c4bcb86eab315f28dee8e75c427',
          category: electronics,  // <-- не id, а об'єкт
      },
      {
          name: 'Novel Book',
          description: 'Interesting fiction novel',
          price: 19.99,
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpngimg.com%2Fuploads%2Fbook%2Fbook_PNG51101.png&f=1&nofb=1&ipt=63f79d55ae7d4786262a687f4a673007204cae43dc8b49e6fd0028126312252f',
          category: books,
      },
  ];
    await repo.save(products);
  
    console.log('✅ Seeded products');
}
