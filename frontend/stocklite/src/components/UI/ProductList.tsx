import Button from "./Button"
import React, { useState, useEffect } from "react"
import api from "../../api/axios";
import axios, { isAxiosError } from "axios";

interface Product {
    id: number,
    name: string,
    description: string,
    category: string,
    price: number,
    quantity: number
}

function ProductList () {

    const [productList, setProductList] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [errMsg, setErrMsg] = useState<string | null>(null);

    const [actualPage, setActualPage] = useState<number>(1);
    const elementToDisplay = 5;

    const lastElementIndex = actualPage * elementToDisplay;
    const firstElementIndex = lastElementIndex - 4;

    const nomberOfPage = Math.ceil(productList.length / elementToDisplay);
    const productToDisplay = productList.slice(firstElementIndex, firstElementIndex);


    useEffect(() => {
        
        const fetchProductList = async ()  => {

            try {
                setLoading(true);

                const response = await api.get('/products/')
                
                setProductList(response.data);

            } catch (error: unknown) {

                if (axios.isAxiosError(error)) {

                    if (!error.response) {
                        setErrMsg("No server response");
                    } 
                    else if (error.response.status === 400) {
                        setErrMsg("Bad request");
                    } 
                    else if (error.response.status === 401) {
                        setErrMsg("Unauthorized");
                    } 
                    else if (error.response.status === 403) {
                        setErrMsg("Forbidden");
                    } 
                    else if (error.response.status === 404) {
                        setErrMsg("Products not found");
                    } 
                    else if (error.response.status >= 500) {
                        setErrMsg("Server error");
                    } 
                    else {
                        setErrMsg("Loading Error");
                    }

                } else {
                    setErrMsg("Unknown Error");
                }

            } finally {
                setLoading(false);
            }
        }

        fetchProductList();
    }, []);


    return (
        <div>
            <div>
                <h2>Produits</h2>
                <p>Tout vos produits en stock</p>
            </div>
            <div>
                <Button 
                    content={"Nouveau produit"} 
                    link={"/add-product"} 
                    style={"text-white text-xl py-1 bg-indigo-700 rounded-sm max-w-[15%]"} 
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nom du produit</th>
                        <th>Catégorie</th>
                        <th>Prix (FCFA)</th>
                        <th>Quantité</th>
                        <th>Description</th>
                        <th>status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                   {productList.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>{product.description}</td>
                        </tr>
                   ))}
                </tbody>
            </table>
        </div>
    )

}
export default ProductList