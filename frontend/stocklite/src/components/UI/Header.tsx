import { Link } from "react-router-dom";
import Logo from "./Logo";

interface HeaderProps {
    text?: string,
    link: string,
    linkText: string
}

function Header ({ text, link, linkText}: HeaderProps) {

    return (

        <div className="flex items-center justify-between px-[7%] h-[7%] bg-white">

            <Logo 
                logoStyle={"flex gap-2 items-center"} 
                imgSize={30} 
                textStyle={"text-2xl font-bold"} 
                secondTextColor={"text-indigo-700"} 
            />

            <div className="flex items-center justify-between">
                <span className="text-lg font-medium">{text}</span>
                <Link to={link} className="text-lg text-indigo-700 font-semibold underline pl-4 transition">{linkText}</Link>
            </div>

        </div>
    )

}
export default Header