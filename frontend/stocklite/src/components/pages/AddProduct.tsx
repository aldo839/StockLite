import { useState, useEffect, useRef } from "react";
import Navbar from "../UI/Navbar";
import api from "../../api/axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SUPPLIER_REGEX = /^[a-zA-Z][a-zA-Z0-9_+\-\s]{4,49}$/;
const NOTES_REGEX = /^[a-zA-Z0-9][!@#$%^&.,;:'"*+_-\s]{0,200}$/;
const QUANTITY_REGEX = /^\d+$/;

type Category = {
    id: number,
    name: string
}

type Product = {
    id: number,
    name: string,
    description?: string,
    price: number,
    quantity: number,
    category: Category
}

function AddProduct () {

    const navigate = useNavigate();

    const supplierRef = useRef<HTMLInputElement | null>(null);
    const notesRef = useRef<HTMLTextAreaElement | null>(null);
    const quantityRef = useRef<HTMLInputElement | null>(null); 
    const productIdRef = useRef<HTMLSelectElement | null>(null);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [productId, setProductId] = useState('');

    const [notes, setNotes] = useState('');
    const validNotes = notes === "" || NOTES_REGEX.test(notes);
    const [notesFocus, setNotesFocus] = useState(false);
    
    const [quantity, setQuantity] = useState("");
    const validQuantity = QUANTITY_REGEX.test(quantity);
    const [quantityFocus, setQuantityFocus] = useState(false);

    const [supplier, setSupplier] = useState("");
    const validSupplier = SUPPLIER_REGEX.test(supplier);
    const [supplierFocus, setSupplierFocus] = useState(false);

    useEffect(() => {
        supplierRef.current?.focus();
    }, []);

    useEffect(() => {
        notesRef.current?.focus();
    }, []);

    useEffect(() => {
        quantityRef.current?.focus();
    }, []);

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {

        const fetchProducts = async () => {

            try {
                const response = await api.get('/products/');
                
                setProducts(response.data);

            } catch (error: unknown) {
                if (axios.isAxiosError(error)){
                    if (error.response?.status === 400){
                        setErrMsg('Bad Request')
                    }
                    else if (error.response?.status === 401){
                        setErrMsg('Unauthorized')
                    }
                    else if (error.response?.status === 403){
                        setErrMsg('Forbidden')
                    }
                    else if (error.response?.status === 404){
                        setErrMsg('Categories Not Found')
                    }
                    else if (error.response?.status === 500){
                        setErrMsg('Internal Server Error')
                    }
                } else {
                    setErrMsg("Unknow Error");
                }
            }
        }

        fetchProducts();
    }, [])


    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        navigate('/products');
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();

        const payload = {
            productId : Number(productId),
            supplier,
            notes,
            quantity: Number(quantity)
        };

        try {
            const response = await api.post(
                '/products/add',
                JSON.stringify(payload),
                {
                    headers: {'Content-Type': 'application/json'}
                }
            )

            setSuccess(true);
            console.log(response.data);

        } catch (error) {

            if (axios.isAxiosError(error)) {
                if (error.response?.status === 400){
                    setErrMsg('Bad request')
                } 
                else if (error.response?.status === 401){
                    setErrMsg('Unauthorized')
                }
                else if (error.response?.status === 403){
                    setErrMsg('Forbidden')
                }
                else if (error.response?.status === 404){
                    setErrMsg('Categories Not Found')
                }
                else if (error.response?.status === 500){
                    setErrMsg('Internal Server Error')
                }

            } else {
                setErrMsg('Unknow error');
            }

        }

    }


    return (

        <div className="flex min-h-screen w-full">

            <Navbar />

            <main className="flex-1 pt-[2%] px-[5%]">
                <div className="pb-[5%]">
                    <h2 className="text-4xl text-blue-950 font-bold">Entrée en stock</h2>
                    <p className="text-xl font-medium pt-2">Entrer un produit existant à votre stock</p>
                </div>

                <div>

                    {success ? (
                        <div>
                            <h1>Success</h1>
                            <p>Now let's go</p>
                        </div>
                    ) : (
                        
                        <div>
                            
                            {errMsg ? (<span>{errMsg}</span>) : (

                            <form onSubmit={handleSubmit} className="flex justify-between">

                                
                                <div className="flex flex-col gap-[3vh] w-[45%]">

                                    <div className="flex flex-col min-w-[30%]">
                                        <label htmlFor="name" className="text-xl font-medium">Nom du produit</label>
                                        <select name="name"
                                            id="name" 
                                            value={productId}
                                            required
                                            ref={productIdRef}
                                            onChange={(e) => setProductId(e.target.value)}
                                            className="text-xl px-5 py-3 mt-2 border-2 rounded-lg border-gray-300"
                                        >
                                            <option value="">Choisissez le produit</option>
                                            {products.map((product) => (
                                                <option value={product.id} key={product.id}>{product.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex flex-col min-w-[30%]">
                                        <label htmlFor="quantity" className="text-xl font-medium">Quantité</label>
                                        <input type="number"
                                            id="quantity"
                                            name="quantity"
                                            value={quantity}
                                            ref={quantityRef}
                                            placeholder="0" 
                                            required
                                            autoComplete="off"
                                            aria-invalid={validQuantity ? 'false' : 'true'}
                                            aria-describedby="quantitynote"
                                            onChange={(e) => setQuantity(e.target.value)}
                                            onFocus={() => setQuantityFocus(true)}
                                            onBlur={() => setQuantityFocus(false)}
                                            className="text-xl border-2 rounded-lg px-5 py-3 my-2 border-gray-300"
                                        />
                                        <span className={quantityFocus && quantity && !validQuantity ? 'block' : 'hidden'}>
                                            La quantité du produit est invalide <br/>
                                            La quantité doit contenir uniquement des chiffres
                                        </span>
                                    </div>

                                    <div className="flex flex-col min-w-[30%]">
                                        <label htmlFor="supplier" className="text-xl font-medium">Fournisseur (Optionnel)</label>
                                        <input type="text"
                                            id="supplier"
                                            name="supplier"
                                            value={supplier}
                                            ref={supplierRef}
                                            placeholder="0" 
                                            autoComplete="off"
                                            aria-invalid={validSupplier? 'false' : 'true'}
                                            aria-describedby="suppliernote"
                                            onChange={(e) => setSupplier(e.target.value)}
                                            onFocus={() => setSupplierFocus(true)}
                                            onBlur={() => setSupplierFocus(false)}
                                            className="text-xl border-2 rounded-lg px-5 py-3 my-2 border-gray-300"
                                        />
                                        <span className={supplierFocus && supplier && !validSupplier ? 'block' : 'hidden'}>
                                            La fournisseur est invalide <br/>
                                            Doit commencer par une lettre et ne doit contenir que des lettres, chiffres et espace.
                                        </span>
                                    </div>


                                </div>
                                    
                                <div className="flex flex-col gap-[7vh] w-[45%]">
                                    <div className="flex flex-col min-w-[30%]">
                                        <label htmlFor="notes" className="text-xl font-medium">Notes (optionnel)</label>
                                        <textarea
                                            id="notes"
                                            name="notes"
                                            ref={notesRef}
                                            value={notes}
                                            placeholder="Informations supplementaires..." 
                                            autoComplete="off"
                                            aria-invalid={validNotes ? 'false' : 'true'}
                                            aria-describedby="notesnote"
                                            onChange={(e) => setNotes(e.target.value)}
                                            onFocus={() => setNotesFocus(true)}
                                            onBlur={() => setNotesFocus(false)}
                                            className="text-xl border-2 rounded-lg px-3 py-3 my-2 min-h-[33vh] border-gray-300"
                                        />
                                        <span className={notesFocus && notes && !validNotes ? 'block' : 'hidden'}>
                                            La description du produit est invalide <br/>
                                            La description doit commencer par une lettre ou un chiffre <br />
                                            et ne peut contenir que des lettres, chiffres, espace et caractères "!@#$%^&.,;:'*+_-
                                        </span>
                                    </div>

                                    <div className="flex justify-between gap-[2vh] min-w-[45vh]">
                                        <button 
                                            type="button"
                                            onClick={handleCancel}
                                            className="w-[40vh] py-3 text-xl border border-gray-300 rounded-lg bg-indigo-50 hover:bg-indigo-100 hover:cursor-pointer font-semibold"
                                        >
                                            Annuler
                                        </button>
                                        <button
                                            type="submit" 
                                            disabled={!validSupplier || !validNotes || !validQuantity}
                                            className="w-[40vh] py-3 text-xl border rounded-lg bg-indigo-500 hover:cursor-pointer text-white font-semibold"
                                        >
                                            Enrégistrer
                                        </button>
                                    </div>
                                </div>

                            </form>
                        )}

                        </div>
                    )}

                </div>
                
            </main>

        </div>
    ) 

}
export default AddProduct
