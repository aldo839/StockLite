import { Link } from "react-router-dom"
import type { ReactNode } from "react"

interface ButtonProps {
  icon?: ReactNode, 
  content: string,
  link: string
  style: string
}

function Button ({icon, content, link, style}: ButtonProps) {

    return (
        <>
          <Link to={link} className={`${style} flex gap-2 items-center justify-center`}>
            {icon}
            {content}
          </Link>  
        </>
    )

}
export default Button