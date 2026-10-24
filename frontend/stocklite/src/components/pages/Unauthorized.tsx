import Button from "../UI/Button";
import unauthorizedImg from "../../assets/stocklite-401.png"
import Header from "../UI/Header";


function Unauthorized () {

    return (

        <div className="flex flex-col bg-indigo-50 h-screen">

            <Header link={"/dashboard"} linkText={"Dashboard"} />
            
            <div className="flex flex-col gap-[2vh] items-center justify-center">

                <img src={unauthorizedImg} alt="unautorized-image" className="w-[20%]" />

                <h1 className="text-9xl text-blue-900 font-bold">401</h1>

                <h2 className="text-5xl text-indigo-700 font-bold">Unauthorized</h2>

                <Button 
                    content={"Go back"} 
                    link={"/dashboard"} 
                    style={"flex items-center justify-center text-xl font-medium text-white py-2 bg-indigo-500 w-[15%] rounded-full"} 
                />

            </div>
        </div>
    )

}
export default Unauthorized;