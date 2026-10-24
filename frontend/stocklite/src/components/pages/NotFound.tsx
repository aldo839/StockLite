import Button from "../UI/Button";
import notFoundImg from "../../assets/stocklite-404.png"
import Header from "../UI/Header";


function NotFound () {

    return (

        <div className="flex flex-col bg-indigo-50 h-screen">

            <Header link={"/dashboard"} linkText={"Dashboard"} />

            <div className="flex flex-col gap-[3vh] items-center justify-center">

                <img src={notFoundImg} alt="unautorized-image" className="w-[20%]" />

                <h1 className="text-9xl text-blue-900 font-bold">404</h1>

                <h2 className="text-5xl text-indigo-700 font-bold">Not Found</h2>

                <p></p>

                <Button 
                    content={"Go Back"} 
                    link={"/dashborad"} 
                    style={"flex items-center justify-center text-xl font-medium text-white py-2 bg-indigo-500 w-[15%] rounded-full"} 
                />

            </div>
        </div>
    )

}
export default NotFound;