import { useState } from "react";
import type { Product } from "../../api/productApi";
import { isAxiosError } from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axiosPrivate from "../../api/axiosPrivate";
import { Loader2 } from "lucide-react";
import Success from "./Success";

interface DeleteProductFormProps {
    product: Product;
}

function DeleteProductForm({ product }: DeleteProductFormProps) {

    const navigate = useNavigate();

    const [name, setName] = useState("");

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {

        e.preventDefault();
        navigate('/products')

    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        setLoading(true);
        setErrMsg("");

        try {

            await axiosPrivate.delete(
                `/products/${product.id}`,
                {
                    headers: {'Content-Type': 'application/json'}
                }
            );

            setSuccess(true);
            
            setTimeout(() => {
                navigate('/products');
            })

        } catch (error: unknown) {

            if (isAxiosError(error)) {

                setErrMsg(
                    error.response?.data?.message ??
                    "Erreur lors de la suppréssion du produit."
                );

            } else {
                setErrMsg("Une erreur inattendue est survenue.");
            }
        }
    };

    if (success) {

        return (
            
            <Success action={"Produit supprimé"} />
        );
    }

    return (

        <div className="flex">

            <Navbar />

            <main className="flex-1 p-[4vh]">

                <div>
                    <h1 className="text-3xl font-bold text-blue-950">Suppréssion d'un produit</h1>
                    <p className="text-lg pt-1">Suppréssion du produit <span className="font-semibold">"{product.name}"</span></p>
                </div>

                <div className="flex flex-col items-center justify-center mt-[10%]">

                    <form onSubmit={handleSubmit} className="flex flex-col gap-3 min-w-[40%]">

                        {errMsg && <p className="text-red-600">{errMsg}</p>}

                        <div className="flex items-center justify-center">

                            <span className="bg-red-100 text-red-400 py-2 px-[5%]">
                                Voulez-vous vraiment supprimer ce produit j'espère !
                            </span>

                        </div>

                        <p className="text-xl pt-10">Recopier ce nom le nom dans la case de dessous</p>

                        <label htmlFor="name" className="text-xl font-semibold mt-3">{product.name}</label>
                        <input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="px-2 py-2 text-lg border-2 border-gray-200 rounded-lg "
                        />

                        <div className="flex justify-between mt-5">

                            <button type="button"
                                onClick={handleCancel}
                                className="w-[45%] bg-gray-200 text-xl font-semibold py-2 rounded-lg cursor-pointer"
                            >
                                Annuler
                            </button>

                            <button type="submit"
                                disabled={name !== product.name}
                                className="w-[45%] bg-indigo-500 text-white text-xl font-semibold py-2 rounded-lg cursor-pointer"
                            >
                                {loading && <Loader2 className="w-6 h-6 animate-spin" />}
                                {loading ? 'Enregistrement...' : 'Supprimer'}
                            </button>
                        </div>

                    </form>
                </div>

            </main>

        </div>
    );
}

export default DeleteProductForm;