const baseUrl = '/node';

export async function fetchProducts(categoryId) {
    try {
        const query = categoryId ? '?filter.category_id=' + categoryId : '';
        const response = await fetch(`${baseUrl}/products${query}`);
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}   
