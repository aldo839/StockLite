import api from "./axios"

// define product interface
export interface Product {
    id: number,
    name: string,
    description: string | null,
    category: Category,
    price: number,
    quantity: number,
    status: Status
}

// define category interface
export interface Category {
    id: number,
    name: string
}

// define type status
export type Status = "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK"

// fetch productList

export const fetchProducts = async () => {

    const response = await api.get('/products/');
    
    return response.data;
}


// fetch one product by its ID
export const fetchProductById = async (productId: number) => {

    const response = await api.get<Product>(`/products/${productId}`);
    console.log(response.data);
    return response.data;
}