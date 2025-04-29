import { DataSource } from 'typeorm';
import { Category } from '../categories/category.entity';

export async function seedCategories(dataSource: DataSource): Promise<Category[]> {
  const repo = dataSource.getRepository(Category);

  const categories = [
    {
      name: 'Electronics',
      description: 'Devices and gadgets',
      image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F1%2FElectronic-PNG-File.png&f=1&nofb=1&ipt=fd03e0491dd68a8eb6e5f8b340e83ea43b542c92f4e6b69dca1c8d4cbb4b9f10',
    },
    {
      name: 'Books',
      description: 'Fiction and non-fiction books',
      image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngkey.com%2Fpng%2Ffull%2F8-84413_books-png.png&f=1&nofb=1&ipt=95df2bc0b1f1a0baf0f579b70671c7aad5b1516f03a9cddba2e922701b20286c',
    },
    {
      name: 'Clothing',
      description: 'Apparel and accessories',
      image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F008%2F847%2F343%2Fnon_2x%2Fisolated-blue-front-sweater-free-png.png&f=1&nofb=1&ipt=57b7289c9f1c216141a5dc6bf8e53a3281fca0281df89a76d32e8474209d5bb6',
    },
  ];

  const savedCategories = await repo.save(categories);
  console.log('✅ Seeded categories');
  return savedCategories;

  // async function seedCategories(dataSource: DataSource): Promise<Category[]> {
  //   const repo = dataSource.getRepository(Category);

  //   const categories = [
  //       { name: 'Electronics' },
  //       { name: 'Books' },
  //   ];

  //   const savedCategories = await repo.save(categories);
  //   console.log('✅ Seeded categories');
  //   return savedCategories;
}

