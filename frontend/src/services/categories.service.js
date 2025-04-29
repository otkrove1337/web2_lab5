const baseUrl = '/node';

export async function fetchCategories() {
    try {
        const response = await fetch(`${baseUrl}/categories`);
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Error fetching:', error);
        return [];
    }
}
