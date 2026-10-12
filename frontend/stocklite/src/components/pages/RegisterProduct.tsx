import { useState, useEffect, useRef } from "react";
import Navbar from "../UI/Navbar";
import api from "../../api/axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_+\-\s]{4,49}$/;
const DESCRIOTPION_REGEX = /^[a-zA-Z0-9][!@#$%^&.,;:'"*+_-\s]{0,200}$/;
const PRICE_REGEX = /^\d+(\.\d{1,2})?$/;
const QUANTITY_REGEX = /^\d+$/;

type Category = {
    id: number,
    name: string
}

function RegisterProduct () {

    const navigate = useNavigate();

    const nameRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
    const priceRef = useRef<HTMLInputElement | null>(null);
    const quantityRef = useRef<HTMLInputElement | null>(null); 
    const categoryRef = useRef<HTMLSelectElement | null>(null);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [name, setName] = useState('');
    const validName = NAME_REGEX.test(name);
    const [nameFocus, setNameFocus] = useState(false);

    const [description, setDescription] = useState('');
    const validDescription = description === "" || DESCRIOTPION_REGEX.test(description);
    const [descriptionFocus, setDescriptionFocus] = useState(false);

    const [category, setCategory] = useState("");
    
    const [quantity, setQuantity] = useState("");
    const validQuantity = QUANTITY_REGEX.test(quantity);
    const [quantityFocus, setQuantityFocus] = useState(false);

    const [price, setPrice] = useState("");
    const validPrice = PRICE_REGEX.test(price);
    const [priceFocus, setPriceFocus] = useState(false);

    useEffect(() => {
        nameRef.current?.focus();
    }, []);

    useEffect(() => {
        descriptionRef.current?.focus();
    }, []);
    
    useEffect(() => {
        priceRef.current?.focus();
    }, []);

    useEffect(() => {
        quantityRef.current?.focus();
    }, []);

    useEffect(() => {
        categoryRef.current?.focus();
    }, []);

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {

        const fetchCategory = async () => {

            try {
                const response = await api.get('/categories/');
                
                setCategories(response.data);

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

        fetchCategory();
    }, [])


    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        navigate('/products');
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();

        const payload = {
            name,
            description,
            categoryId: Number(category), 
            quantity: Number(quantity),
            price: parseFloat(price)
        };

        try {
            const response = await api.post(
                '/products/',
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
                    <h2 className="text-4xl text-blue-950 font-bold">Nouveau produit</h2>
                    <p className="text-xl font-medium pt-2">Ajouter un nouveau produit à votre stock</p>
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
                                        <input type="text"
                                            id="name"
                                            name="name"
                                            ref={nameRef}
                                            value={name}
                                            placeholder="Ex: Riz" 
                                            required
                                            autoComplete="off"
                                            aria-invalid={validName ? 'false' : 'true'}
                                            aria-describedby="namenote"
                                            onChange={(e) => setName(e.target.value)}
                                            onFocus={() => setNameFocus(true)}
                                            onBlur={() => setNameFocus(false)}
                                            className="text-xl border rounded-sm px-5 py-3 my-2"
                                        />
                                        <span className={nameFocus && name && !validName ? 'block' : 'hidden'}>
                                            Le nom du produit est invalide <br/>
                                            Le nom doit commencer par une lettre <br />et ne peut contenir que des lettres, chiffres, espace et caractères (- _ +)
                                        </span>
                                    </div>

                                    <div className="flex flex-col min-w-[30%]">
                                        <label htmlFor="price" className="text-xl font-medium">Prix de vente (FCFA)</label>
                                        <input type="number"
                                            id="price"
                                            name="price"
                                            ref={priceRef}
                                            value={price}
                                            placeholder="0" 
                                            required
                                            autoComplete="off"
                                            aria-invalid={validPrice ? 'false' : 'true'}
                                            aria-describedby="pricenote"
                                            onChange={(e) => setPrice(e.target.value)}
                                            onFocus={() => setPriceFocus(true)}
                                            onBlur={() => setPriceFocus(false)}
                                            className="text-xl border rounded-sm px-5 py-3 my-2"
                                        />
                                        <span className={priceFocus && price && !validPrice ? 'block' : 'hidden'}>
                                            La description du produit est invalide <br/>
                                            La description doit contenir des chiffres
                                        </span>
                                    </div>

                                    <div className="flex flex-col min-w-[30%]">
                                        <label htmlFor="category" className="text-xl font-medium">Catégorie</label>
                                        <select 
                                            name="category" 
                                            id="category"
                                            ref={categoryRef}
                                            value={category}
                                            className="text-xl border rounded-sm px-5 py-3 my-2"
                                            onChange={(e) => setCategory(e.target.value)}
                                        >
                                            <option value="">Choisissez la catégorie</option>
                                            {categories.map((cat) => (
                                                <option value={cat.id} key={cat.id}>{cat.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-[3vh] w-[45%]">
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
                                            className="text-xl border rounded-sm px-5 py-3 my-2"
                                        />
                                        <span className={quantityFocus && price && !validPrice ? 'block' : 'hidden'}>
                                            La description du produit est invalide <br/>
                                            La description doit contenir des chiffres
                                        </span>
                                    </div>

                                    <div className="flex flex-col min-w-[30%]">
                                        <label htmlFor="name" className="text-xl font-medium">Description (optionnel)</label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            ref={descriptionRef}
                                            value={description}
                                            placeholder="Informations supplementaires..." 
                                            autoComplete="off"
                                            aria-invalid={validDescription ? 'false' : 'true'}
                                            aria-describedby="descriptionnote"
                                            onChange={(e) => setDescription(e.target.value)}
                                            onFocus={() => setDescriptionFocus(true)}
                                            onBlur={() => setDescriptionFocus(false)}
                                            className="text-xl border rounded-sm px-3 py-3 my-2 min-h-[20vh]"
                                        />
                                        <span className={descriptionFocus && description && !validDescription ? 'block' : 'hidden'}>
                                            La description du produit est invalide <br/>
                                            La description doit commencer par une lettre ou un chiffre <br />
                                            et ne peut contenir que des lettres, chiffres, espace et caractères "!@#$%^&.,;:'*+_-
                                        </span>
                                    </div>

                                    <div className="flex justify-between gap-[2vh] min-w-[45vh]">
                                        <button 
                                            type="button"
                                            onClick={handleCancel}
                                            className="w-[40vh] py-3 text-xl border rounded-lg bg-indigo-50 hover:cursor-pointer font-semibold"
                                        >
                                            Annuler
                                        </button>
                                        <button
                                            type="submit" 
                                            disabled={!validName || !validDescription || !validPrice || !validQuantity}
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
export default RegisterProduct
