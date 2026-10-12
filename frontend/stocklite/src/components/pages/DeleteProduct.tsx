import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../../api/productApi";
import type { Product } from "../../api/productApi";
import DeleteProductForm from "../UI/DeleteProductForm";

function DeleteProduct () {
    const { id } = useParams<{ id: string }>();
    const productId = Number(id);

    const {
        
        data: product,
        isLoading,
        isError,
        error,

    } = useQuery<Product>({
        queryKey: ["product", productId],
        queryFn: () => fetchProductById(productId),
        enabled: !!id && Number.isInteger(productId) && productId > 0,
    });

    if (!id || !Number.isInteger(productId) || productId <= 0) {
        return <p>Identifiant invalide.</p>;
    }

    if (isLoading) {
        return <p>Chargement du produit...</p>;
    }

    if (isError) {
        return <p>{error.message}</p>;
    }

    if (!product) {
        return <p>Produit introuvable.</p>;
    }

    return (
        <DeleteProductForm
            key={product.id}
            product={product}
        />
    );
}

export default DeleteProduct;