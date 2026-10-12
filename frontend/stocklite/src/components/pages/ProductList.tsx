import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMagnifyingGlass, faPen, faTrashCan, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import Button from "../UI/Button"
import Navbar from "../UI/Navbar";
import { useState } from "react"

import { useProducts } from "../../hooks/useProducts";
import type { Product, Status } from "../../api/productApi";
import { useNavigate } from "react-router-dom";


const getStatusLabel = (status: Status) => {
    const map = {
        IN_STOCK: "En stock",
        LOW_STOCK: 'Stock faible',
        OUT_OF_STOCK: 'Rupture'
    }
    return map[status]
}



function ProductList () {

    const elementToDisplay = 7;

    const [actualPage, setActualPage] = useState<number>(1);

    const [searchTerm, setSearchTerm] = useState("");


    // TanStack Query

    const {

        data: productList = [],
        isPending,
        isError,
        error

    } = useProducts();

    // Pagination

    const lastElementIndex = actualPage * elementToDisplay;
    const firstElementIndex = lastElementIndex - elementToDisplay;

    const numberOfPage = Math.max(
        1,
        Math.ceil(productList.length / elementToDisplay)
    );
    const productToDisplay = productList.slice(firstElementIndex, lastElementIndex);

    const previousPage = Math.max(1, actualPage - 1);

    const nextPage = Math.min(numberOfPage, actualPage + 1);


    // Product update management
    const navigate = useNavigate();

    const handleUpdate = (productId: number) => {
        navigate(`/products/${productId}/edit`);
    }

    // Product delete management 
    const handleDelete = (productId: number) => {
        navigate(`/products/${productId}/delete`);
    }

    // Product Filter management
    const filteredProduct = productList.filter((product: Product) => {

        if (searchTerm.trim().length < 2) {
            return false;
        }

        return product.name
            .toLowerCase()
            .includes(searchTerm.trim().toLowerCase());
    })

    // Loading management 

    if (isPending) {

        return (

            <div className="flex min-h-screen">

                <Navbar />

                <main className="flex-1 flex items-center justify-center bg-gray-50">

                    <p className="text-2xl text-gray-500 font-medium">
                        Chargement des produits...
                    </p>

                </main>

            </div>
        )
    }


    // Error management

    if (isError) {

        return (

            <div className="flex min-h-screen">

                <Navbar />

                <main className="flex-1 flex items-center justify-center bg-gray-50">

                    <p className="text-2xl text-red-500 font-medium">
                        {error.message}
                    </p>

                </main>

            </div>

        )
    }


    return (

        <div className="flex min-h-screen w-full">

            <Navbar />

            <main className="flex-1 min-w-0 bg-gray-50 p-6">
                <div className=" mb-[2%]">
                    <h2 className="text-4xl text-blue-950 font-bold">Produits</h2>
                    <p className="text-xl font-medium">Tout vos produits en stock</p>
                </div>
                
                <div className="flex items-center justify-between mb-6 gap-4">

                    <div className="flex gap-1 items-center pl-5 min-w-[40%] border border-gray-300 rounded-sm bg-white">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <input
                            type="text"
                            placeholder="Rechercher un produit..."
                            className="w-full px-3 py-2 outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />


                    </div>

                    <Button
                        icon={<FontAwesomeIcon icon={faPlus} />}
                        content="Nouveau produit"
                        link="/register-product"
                        style="text-white bg-indigo-700 rounded-sm px-5 py-2 hover:bg-indigo-500"
                    />

                </div>

                <div className="flex flex-col h-[75vh] justify-between bg-white pb-[1%] border-4 border-gray-100">

                    <table className="w-full table-fixed border-collapse mb-[2%]">
                        <thead>
                            <tr>
                                <th className="w-[5%] px-4 py-3 text-left">#</th>
                                <th className="w-[20%] px-4 py-3 text-left">Nom du produit</th>
                                <th className="w-[15%] px-4 py-3 text-left">Catégorie</th>
                                <th className="w-[10%] px-4 py-3 text-left">Prix (FCFA)</th>
                                <th className="w-[7%] px-4 py-3 text-left">Quantité</th>
                                <th className="w-[20%] px-4 py-3 text-left">Description</th>
                                <th className="w-[13%] px-4 py-3 text-left">status</th>
                                <th className="w-[10%] px-4 py-3 text-left">Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredProduct.map((product: Product, index: number) => (
                                <tr key={product.id} className="border-y-3 border-gray-100">
                                    <td className="w-[5%] px-4 py-3 text-left">{firstElementIndex + index + 1}</td>
                                    <td className="w-[15%] px-4 py-3 text-left">{product.name}</td>
                                    <td className="w-[15%] px-4 py-3 text-left">{product.category.name}</td>
                                    <td className="w-[10%] px-4 py-3 text-left">{product.price}</td>
                                    <td className="w-[5%] px-4 py-3 text-left">{product.quantity}</td>
                                    <td className="w-[25%] px-4 py-3 text-left">{product.description ?? "Aucune description"}</td>
                                    <td className="w-[15%] px-4 py-3 text-left">
                                        <span className={`px-3 py-1 rounded-full font-medium
                                            ${product.status === "IN_STOCK" ? 'text-green-700' : ''}
                                            ${product.status === "LOW_STOCK" ? 'text-orange-500' : ''}
                                            ${product.status === "OUT_OF_STOCK" ? 'text-red-700' : ''}
                                            `}>
                                            {getStatusLabel(product.status as Status)}
                                        </span>
                                    </td>
                                    <td className="w-[10%] px-4 py-3 text-left">
                                        <div className="flex items-center gap-6 justify-start">
                                            <FontAwesomeIcon icon={faPen} 
                                                className="text-indigo-600 text-xl p-1 rounded-lg border-2 border-gray-100 hover:cursor-pointer hover:bg-indigo-300 hover:text-white"
                                                onClick={() => handleUpdate(product.id)}
                                            />
                                            <FontAwesomeIcon icon={faTrashCan} 
                                                className="text-red-500 text-xl p-1 rounded-lg border-2 border-gray-200 hover:cursor-pointer hover:bg-red-300 hover:text-white"
                                                onClick={() => handleDelete(product.id)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {productToDisplay.map((product: Product, index: number) => (
                                <tr key={product.id} className="border-y-3 border-gray-100">
                                    <td className="w-[5%] px-4 py-3 text-left">{firstElementIndex + index + 1}</td>
                                    <td className="w-[15%] px-4 py-3 text-left">{product.name}</td>
                                    <td className="w-[15%] px-4 py-3 text-left">{product.category.name}</td>
                                    <td className="w-[10%] px-4 py-3 text-left">{product.price}</td>
                                    <td className="w-[5%] px-4 py-3 text-left">{product.quantity}</td>
                                    <td className="w-[25%] px-4 py-3 text-left">{product.description ?? "Aucune description"}</td>
                                    <td className="w-[15%] px-4 py-3 text-left">
                                        <span className={`px-3 py-1 rounded-full font-medium
                                            ${product.status === "IN_STOCK" ? 'text-green-700' : ''}
                                            ${product.status === "LOW_STOCK" ? 'text-orange-500' : ''}
                                            ${product.status === "OUT_OF_STOCK" ? 'text-red-700' : ''}
                                            `}>
                                            {getStatusLabel(product.status as Status)}
                                        </span>
                                    </td>
                                    <td className="w-[10%] px-4 py-3 text-left">
                                        <div className="flex items-center gap-6 justify-start">
                                            <FontAwesomeIcon icon={faPen} 
                                                className="text-indigo-600 text-xl p-1 rounded-lg border-2 border-gray-100 hover:cursor-pointer hover:bg-indigo-300 hover:text-white"
                                                onClick={() => handleUpdate(product.id)}
                                            />
                                            <FontAwesomeIcon icon={faTrashCan} 
                                                className="text-red-500 text-xl p-1 rounded-lg border-2 border-gray-200 hover:cursor-pointer hover:bg-red-300 hover:text-white"
                                                onClick={() => handleDelete(product.id)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                    
                    <div className="flex items-center justify-between px-[2%]">

                        <div>
                            <span className="text-gray-500 font-medium">Affichage de {firstElementIndex + 1}
                                {" "}à{" "}
                                {Math.min(lastElementIndex, productList.length)} 
                                {" "}sur{" "}
                                {productList.length}
                                {" "}produits.
                            </span>
                        </div>

                        <div className="flex gap-2">
                            <button
                                disabled={actualPage === 1} 
                                onClick={() => setActualPage(previousPage)}
                                className="mr-5 px-2 py-1 border rounded-sm text-xl hover:cursor-pointer hover:bg-indigo-50"
                            >
                                <FontAwesomeIcon icon={faAngleLeft} />  
                            </button>

                            <button className="px-2 border rounded-sm">{previousPage}</button>
                            <button className="px-2 py-1 border rounded-sm bg-indigo-600 text-white">{actualPage}</button>
                            <button className="px-2 border rounded-sm">{nextPage}</button>

                            <button 
                                disabled={actualPage === numberOfPage} 
                                onClick={() => setActualPage(nextPage)}
                                className="ml-5 px-2 py-1 border rounded-sm text-xl hover:cursor-pointer hover:bg-indigo-50"
                            >
                                <FontAwesomeIcon icon={faAngleRight} />
                            </button>
                        </div>

                    </div>

                </div>

            </main>

        </div>
        
    )

}
export default ProductList