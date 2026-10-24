import { useState } from "react";
import type { Product } from "../../api/productApi";
import { isAxiosError } from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axiosPrivate from "../../api/axiosPrivate";
import { Loader2 } from "lucide-react";
import Success from "./Success";


interface EditProductFormProps {
    product: Product;
}

function EditProductForm({ product }: EditProductFormProps) {

    const navigate = useNavigate();

    const [name, setName] = useState(product.name ?? "");
    const [description, setDescription] = useState(product.description ?? "");
    const [price, setPrice] = useState(String(product.price ?? ""));
    const [quantity, setQuantity] = useState(String(product.quantity ?? ""));

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false); 

    const payload = {
        name,
        description,
        price: Number(price),
        quantity: Number(quantity),
    }

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {

        e.preventDefault();

        navigate('/products')
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        setLoading(true);
        setErrMsg("");

        try {

            await axiosPrivate.put(
                `/products/${product.id}`,
                payload,
                {
                    headers: {'Content-Type': 'application/json'}
                }
            );

            setSuccess(true);

            setTimeout(() => {
                navigate('/products')
            }, 1500);

        } catch (error: unknown) {

            if (isAxiosError(error)) {

                setErrMsg(
                    error.response?.data?.message ??
                    "Erreur lors de la modification du produit."
                );

            } else {
                setErrMsg("Une erreur inattendue est survenue.");
            }
        }
    };

    if (success) {

        return (

            <Success action={"Produit mis à jour"} />

        );
    }

    return (

        <div className="flex">

            <Navbar />

            <main className="flex-1 p-[4vh]">

                <div>
                    <h1 className="text-3xl font-bold text-blue-950">Modification d'un produit</h1>
                    <p className="text-lg pt-1">Modification des informations du produit <span className="font-semibold">"{product.name}"</span></p>
                </div>

                <div className="flex flex-col items-center justify-center mt-[3%]">

                    <form onSubmit={handleSubmit} className="flex flex-col gap-3 min-w-[40%]">

                        {errMsg && <p className="text-red-600">{errMsg}</p>}

                        <div className="flex items-center justify-center">

                            <span className="bg-red-100 text-red-400 py-2 px-[5%]">
                                Modifier uniquement les champs que vous souhaitez
                            </span>

                        </div>

                        <label htmlFor="name" className="text-xl font-medium mt-5">Nom</label>
                        <input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="px-2 py-2 text-lg border-2 border-gray-200 rounded-lg "
                        />

                        <label htmlFor="description" className="text-xl font-medium mt-3">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="px-2 py-2 text-lg  border-2 border-gray-200 rounded-lg min-h-[15vh]"
                        />

                        <label htmlFor="price" className="text-xl font-medium mt-3">Prix</label>
                        <input
                            id="price"
                            type="number"
                            min="0"
                            step="0.01"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            className="px-2 py-2 text-lg  border-2 border-gray-200 rounded-lg"
                        />

                        <label htmlFor="quantity" className="text-xl mt-3">Quantité</label>
                        <input
                            id="quantity"
                            type="number"
                            min="0"
                            step="1"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                            className="p-2 py-2 border-2 text-lg  border-gray-200 rounded-lg"
                        />

                        <div className="flex justify-between mt-5">

                            <button type="button"
                                onClick={handleCancel}
                                className="w-[45%] bg-gray-200 text-xl font-semibold py-2 rounded-lg cursor-pointer"
                            >
                                Annuler
                            </button>

                            <button type="submit"
                                className="w-[45%] bg-indigo-500 text-white text-xl font-semibold py-2 rounded-lg cursor-pointer"
                            >
                                {loading && <Loader2 className="w-6 h-6 animate-spin" />}
                                {loading ? 'Enregistrement...' : 'Modifier'}
                            </button>
                        </div>

                    </form>
                </div>

            </main>

        </div>
    );
}

export default EditProductForm;