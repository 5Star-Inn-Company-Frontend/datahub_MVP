import { AiOutlineQrcode } from "react-icons/ai"

interface logoPropType{
    size:string,
    style?:string
}
export const Logo =({
    size,
    style
}:logoPropType)=>{
    return(
        <AiOutlineQrcode 
            size={size}
            color="#ff5718"
            className={style}
        />
    )
}