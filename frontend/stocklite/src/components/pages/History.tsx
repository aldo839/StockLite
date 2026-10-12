import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMagnifyingGlass, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import Button from "../UI/Button"
import Navbar from "../UI/Navbar";
import { useState, } from "react"
import { useActivities } from "../../hooks/useActivities";

type ActivityType = "GET_ALL_PRODUCT" | "CREATE_PRODUCT" | "UPDATE_PRODUCT" | "DELETE_PRODUCT" | "ADD_PRODUCT" | "REMOVE_PRODUCT" | "GET_PRODUCT_BY_ID";

// We will use it to translate in french
const getActivityTypeLabel = (type: ActivityType) => {
    const map = {
        GET_ALL_PRODUCT: "Liste produits",
        GET_PRODUCT_BY_ID: "Consultation produit",
        CREATE_PRODUCT: "Création produit", 
        UPDATE_PRODUCT: "Modifiction produit",
        DELETE_PRODUCT: "Suppression produit",
        ADD_PRODUCT: "Entrée produit",
        REMOVE_PRODUCT: "Sortie produit",
    }
    return map[type]
}

const formattedDateTime = (dateTime: string) => {

    const [date, time] = dateTime.split("T");

    const [year, month, day] = date.split("-");

    const [hour, minute] = time.split(":");

    return {
        date: `${day}/${month}/${year}`,
        time: `${hour}:${minute}`
    };
};


function History () {

    // TanStack Query
    
    const {

        data: activityList = [],
        isPending,
        isError,
        error

    } = useActivities();


    const elementToDisplay = 10;

    const [actualPage, setActualPage] = useState<number>(1);

    const lastElementIndex = actualPage * elementToDisplay;
    const firstElementIndex = lastElementIndex - elementToDisplay;

    const numberOfPage = Math.max(
        1,
        Math.ceil(activityList.length / elementToDisplay)
    );
    
    const activities = [...activityList].reverse(); 
    
    const activityToDisplay = activities.slice(firstElementIndex, lastElementIndex);

    const previousPage = Math.max(1, actualPage - 1);

    const nextPage = Math.min(numberOfPage, actualPage + 1);


    if (isPending) {

        return (

            <div className="flex min-h-screen">

                <Navbar />

                <main className="flex-1 flex items-center justify-center bg-gray-50">

                    <p className="text-2xl text-gray-500 font-medium">
                        Chargement de l'historique...
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
                    <h2 className="text-3xl text-blue-950 font-bold">Historique des activitées</h2>
                    <p className="font-medium">Toutes les actions effectuées sont ici</p>
                </div>
                
                <div className="flex items-center justify-between mb-6 gap-4">

                    <div className="flex gap-1 items-center pl-5 min-w-[40%] border border-gray-300 rounded-sm bg-white">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <input
                            type="text"
                            placeholder="Rechercher un produit..."
                            className="w-full px-3 py-2 outline-none"
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
                                <th className="w-[3%] px-4 py-3 text-left">#</th>
                                <th className="w-[10%] px-4 py-3 text-left">Type</th>
                                <th className="w-[30%] px-4 py-3 text-left">Description</th>
                                <th className="w-[10%] px-4 py-3 text-left">Date</th>
                                <th className="w-[10%] px-4 py-3 text-left">Heure</th>
                            </tr>
                        </thead>

                        <tbody>
                        {activityToDisplay.map((activity, index) => (
                            <tr key={activity.id} className="border-y-3 border-gray-100">
                                <th className="w-[3%] px-4 py-3 text-left">{firstElementIndex + index + 1}</th>
                                <td className="w-[10%] px-2-4 py-3 text-left">
                                    <span className={`px-4 py-1 rounded-full font-medium
                                        ${activity.type === "GET_ALL_PRODUCT" ? 'text-green-700' : ''}
                                        ${activity.type === "GET_PRODUCT_BY_ID" ? 'text-green-700' : ''}
                                        ${activity.type === "CREATE_PRODUCT" ? 'text-green-700' : ''}
                                        ${activity.type === "UPDATE_PRODUCT" ? 'text-green-700' : ''}
                                        ${activity.type === "DELETE_PRODUCT" ? 'text-green-700' : ''}
                                        ${activity.type === "ADD_PRODUCT" ? 'text-green-700' : ''}
                                        ${activity.type === "REMOVE_PRODUCT" ? 'text-green-700' : ''}
                                        `}>
                                        {getActivityTypeLabel(activity.type as ActivityType)}
                                    </span>
                                </td>
                                <td className="w-[30%] px-4 py-3 text-left">{activity.description}</td>
                                <td className="w-[10%] px-4 py-3 text-left">{formattedDateTime(activity.dataTime).date}</td>
                                <td className="w-[10%] px-4 py-3 text-left">{formattedDateTime(activity.dataTime).time}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    
                    <div className="flex items-center justify-between px-[2%]">
                        <div>
                            <span className="text-gray-500 font-medium">Affichage de {firstElementIndex + 1}
                                {" "}à{" "}
                                {Math.min(lastElementIndex, activityList.length)} 
                                {" "}sur{" "}
                                {activityList.length}
                                {" "}activités.
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
export default History