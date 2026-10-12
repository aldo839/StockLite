import Navbar from "../UI/Navbar";
import { useProducts } from "../../hooks/useProducts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube, faDatabase, faCircleArrowDown, faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";
import type { Product } from "../../api/productApi";
import { Link } from "react-router-dom";
import { useActivities } from "../../hooks/useActivities";
import StockMovementsChart from "../UI/StockMovementsChart";

function Dashboard () {

    // We fetch the product list using TanStack
    const {

        data: productList = []

    } = useProducts();

    const totalStock = productList.reduce((total: number, product: Product) => total + product.quantity, 0);

    // Found the product with a less quantity in stock
    const lowStock = productList
    .filter((product: Product) => product.quantity > 0) // remove product out of stock
    .sort((a: Product, b: Product) => a.quantity - b.quantity) // range from the less to the high
    .slice(0, 5); // take the first five 

    // We fetch the activities history
    const {

        data: activityList = []

    } = useActivities(); 

    // Stock evolution (movements)

    const stockMovement = activityList.filter(
        (activity) =>
            activity.type === "ADD_PRODUCT" ||
            activity.type === "REMOVE_PRODUCT"
    );

    const dailyStats = stockMovement.reduce<
        { date: string; entries: number; exits: number }[]
    >((stats, activity) => {
        // Verify if date exit
        if (!activity.dataTime) {
            return stats;
        }

        const date = activity.dataTime.split("T")[0];

        // Check the statistic's for the day
        let day = stats.find((item) => item.date === date);

        // Create one entry for that day if necesary
        if (!day) {
            day = {
                date,
                entries: 0,
                exits: 0,
            };

            stats.push(day);
        }

        // Compter les opérations
        if (activity.type === "ADD_PRODUCT") {
            day.entries += 1;
        } else if (activity.type === "REMOVE_PRODUCT") {
            day.exits += 1;
        }

        return stats;
    }, []);

    // Fetch the entries of exits for today
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDay();

    const todayActivities = stockMovement.filter(
        (activity) => {
            const actualDate = new Date(activity.dataTime);

            return (
                actualDate.getFullYear() === year &&
                actualDate.getMonth() === month &&
                actualDate.getDay() === day 
            );
        }
    );

    const todayEntries = todayActivities.filter(
        (activity) => activity.type === "ADD_PRODUCT"
    )

    const todayExits = todayActivities.filter(
        (activity) => activity.type === "REMOVE_PRODUCT"
    )


    return (

        <div className="flex">

            <Navbar />

            <main className="flex-1 p-[4vh] bg-gray-100">

                <div>
                    <h2 className="text-4xl text-blue-950 font-bold tb-5">Tableau de bord</h2>
                    <p className="text-xl font-medium">Vue d'ensemble de votre stock</p>
                </div>

                <div className="flex h-[20vh] justify-between min-h-[25vh] py-[5vh]">

                    <div className="flex flex-col items-center justify-between bg-white rounded-lg min-w-[22%] p-[2vh]">
                        <span className="text-xl font-medium">Total produits</span>
                        <div className="flex text-4xl items-center font-bold justify-between gap-[18vh]">
                            <span>{productList.length}</span>
                            <FontAwesomeIcon icon={faCube} className="text-indigo-400 px-1 py-2 bg-indigo-50 rounded-full" />
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-between bg-white rounded-lg min-w-[22%] p-[2vh]">
                        <span className="text-xl text-indigo-500 font-medium">Total Stock</span>
                        <div className="flex text-4xl font-bold items-center justify-between gap-[15vh]">
                            <span>{totalStock}</span>
                            <FontAwesomeIcon icon={faDatabase} className="text-indigo-400 px-1 py-2 bg-indigo-50 rounded-full" />
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-between bg-white rounded-lg min-w-[22%] p-[2vh]">
                        <span className="text-xl font-medium">Entrées (Aujourd'hui)</span>
                        <div className="flex text-4xl font-bold items-center justify-between gap-[15vh]">
                            <span className="text-green-400">{todayEntries.length}</span>
                            <FontAwesomeIcon icon={faCircleArrowDown} className="text-green-400 px-1 py-2 bg-green-100 rounded-full" />
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-between bg-white rounded-lg min-w-[22%] p-[2vh]">
                        <span className="text-xl text-red-500 font-medium">Sorties (Aujourd'hui)</span>
                        <div className="flex text-4xl font-bold items-center justify-between gap-[15vh]">
                            <span className="text-red-400">{todayExits.length}</span>
                            <FontAwesomeIcon icon={faCircleArrowUp} className="text-red-400 px-1 py-2 bg-red-100 rounded-full" />
                        </div>
                    </div>

                </div>

                <div>
                    <div className="flex fitems-center justify-between">
                        
                        <div className="bg-white min-w-[53%] p-[3vh] rounded-2xl">

                            <h2 className="text-xl font-semibold mb-4">
                                Entrées et sorties de stock
                            </h2>

                            <StockMovementsChart data={dailyStats} />

                        </div>

                        <div className="flex flex-col bg-white min-w-[43%] p-[3vh] rounded-2xl">
                            <h3 className="text-xl font-semibold">Produits les moins en stock</h3>
                            <div>
                                <table className="flex flex-col gap-3 pb-5">
                                    <thead>
                                        <tr className="flex justify-between py-5 border-b-3 border-gray-200 text-lg">
                                            <th>Produit</th>
                                            <th>Quantité</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {lowStock.map((product: Product) => (
                                            <tr key={product.id}  className="flex items-center justify-between py-3 border-b-2 border-gray-200 text-lg">
                                                <td>{product.name}</td>
                                                <td className="text-red-500 font-medium">{product.quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Link to={'/products'}
                                className="text-indigo-600 text-lg hover:text-indigo-700"
                            >
                                Voir la liste des produits
                            </Link>
                        </div>
                    </div>
                    <div></div>
                </div>
            </main>

        </div>
    )

}
export default Dashboard