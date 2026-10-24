import Button from "../UI/Button";
import InternalServerErrorImg from "../../assets/stocklite-500.png"
import Header from "../UI/Header";


function internalServerError () {

    return (

        <div className="flex flex-col bg-indigo-50 h-screen">

            <Header link={"/dashboard"} linkText={"Dashboard"} />
            
            <div className="flex flex-col gap-[2vh] items-center justify-center">

                <img src={InternalServerErrorImg} alt="unautorized-image" className="w-[20%]" />

                <h1 className="text-9xl text-blue-900 font-bold">500</h1>

                <h2 className="text-5xl text-indigo-700 font-bold">Internal Server Error</h2>

                <Button 
                    content={"Go Back"} 
                    link={"/dashboard"} 
                    style={"flex items-center justify-center text-xl font-medium text-white py-2 bg-indigo-500 w-[15%] rounded-full"} 
                />

            </div>
        </div>
    )

}
export default internalServerError;