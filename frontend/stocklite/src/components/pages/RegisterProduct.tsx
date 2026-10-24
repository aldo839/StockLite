import { useState, useEffect, useRef } from "react";
import Navbar from "../UI/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../UI/Button";
import { Loader2 } from "lucide-react";
import Success from "../UI/Success";

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
    const [loading, setLoading] = useState(false);

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

    const [categories, setCategories] = useState<Category[]>([]);


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


    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {

        const fetchCategory = async () => {


            try {
                const response = await axiosPrivate.get('/categories/');
                
                setCategories(response.data);

            } catch (error: unknown) {
                if (axios.isAxiosError(error)){
                    if (error.response?.status === 400){
                        setErrMsg('Bad Request')
                    }
                    else if (error.response?.status === 401){
                        setErrMsg('Unauthorized');
                        navigate('/401');
                    }
                    else if (error.response?.status === 403){
                        setErrMsg('Forbidden');
                        navigate('/401');
                    }
                    else if (error.response?.status === 404){
                        setErrMsg('Categories Not Found')
                        navigate('/404');
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

    }, [axiosPrivate, navigate])


    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate('/products');
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();

        if (!validName || !validPrice || !validQuantity || !validDescription) {
            setErrMsg("Please fix the invalid field.");
        }

        setLoading(true);
        setErrMsg("");

        setTimeout(() => {
                navigate('/products');
            }, 1500);

        const payload = {
            name,
            description,
            categoryId: Number(category), 
            quantity: Number(quantity),
            price: parseFloat(price)
        };

        try {
            const response = await axiosPrivate.post(
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
                    setErrMsg('Bad request');
                    navigate('/400');
                } 
                else if (error.response?.status === 401){
                    setErrMsg('Unauthorized');
                    navigate('/401');
                }
                else if (error.response?.status === 403){
                    setErrMsg('Forbidden')
                    navigate('/401');
                }
                else if (error.response?.status === 404){
                    setErrMsg('Categories Not Found')
                    navigate('/404');
                }
                else if (error.response?.status === 500){
                    setErrMsg('Internal Server Error');
                    navigate('/500');
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
                
                 <Button
                    icon={<FontAwesomeIcon icon={faPlus} />}
                    content="Nouvelle catégorie"
                    link="/register-category"
                    style="text-white bg-indigo-700 rounded-sm px-5 py-2 hover:bg-indigo-500 w-[18%] ml-auto mb-[3%] transition"
                />
                
                <div>

                    {success ? (

                        <Success action={"Produit enrégistré"} />

                    ) : (
                        
                        <div>
                            
                            {errMsg && (
                                <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl font-medium">
                                    {errMsg}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="flex justify-between">

                                <div className="flex flex-col gap-[3vh] w-[45%]">

                                    <div className="flex flex-col min-w-[30%]">
                                        <label htmlFor="name" className="text-xl font-medium">Nom du produit <span className="text-red-500">*</span></label>
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
                                            className="text-xl border-2 border-gray-300 rounded-lg px-5 py-3 my-2"
                                        />
                                        <span className={nameFocus && name && !validName ? 'block' : 'hidden'}>
                                            Le nom du produit est invalide <br/>
                                            Le nom doit commencer par une lettre <br />et ne peut contenir que des lettres, chiffres, espace et caractères (- _ +)
                                        </span>
                                    </div>

                                    <div className="flex flex-col min-w-[30%]">
                                        <label htmlFor="price" className="text-xl font-medium">Prix de vente (FCFA) <span className="text-red-500">*</span></label>
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
                                            className="text-xl border-2 border-gray-300 rounded-lg px-5 py-3 my-2"
                                        />
                                        <span className={priceFocus && price && !validPrice ? 'block' : 'hidden'}>
                                            La description du produit est invalide <br/>
                                            La description doit contenir des chiffres
                                        </span>
                                    </div>

                                    <div className="flex flex-col min-w-[30%]">
                                        <label htmlFor="category" className="text-xl font-medium">Catégorie <span className="text-red-500">*</span></label>
                                        <select 
                                            name="category" 
                                            id="category"
                                            ref={categoryRef}
                                            value={category}
                                            className="text-xl border-2 border-gray-300 rounded-lg px-5 py-3 my-2"
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
                                        <label htmlFor="quantity" className="text-xl font-medium">Quantité <span className="text-red-500">*</span></label>
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
                                            className="text-xl border-2 border-gray-300 rounded-lg px-5 py-3 my-2"
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
                                            className="text-xl border-2 border-gray-300 rounded-lg px-3 py-3 my-2 min-h-[20vh]"
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
                                            className="w-[40vh] py-3 text-xl border border-gray-300 rounded-lg bg-indigo-50 hover:cursor-pointer hover:bg-indigo-100 font-semibold transition"
                                        >
                                            Annuler
                                        </button>
                                        <button
                                            type="submit" 
                                            disabled={!validName || !validDescription || !validPrice || !validQuantity}
                                            className="w-[40vh] py-3 text-xl border rounded-lg bg-indigo-500 hover:cursor-pointer text-white font-semibold transition"
                                        >
                                            {loading && <Loader2 className="w-6 h-6 animate-spin" />}
                                            {loading ? 'Enregistrement...' : 'Enrégistrer'}
                                        </button>
                                    </div>
                                </div>

                            </form>

                        </div>
                    )}

                </div>
                
            </main>

        </div>
    ) 

}
export default RegisterProduct
