import { Link } from "react-router-dom"

interface ButtonProps {
    content: string
    link: string
    style: string
}

function Button ({content, link, style}: ButtonProps) {

    return (
        <>
          <Link to={link} className={`${style} flex items-center justify-center`}>
            {content}
          </Link>  
        </>
    )

}
export default Button