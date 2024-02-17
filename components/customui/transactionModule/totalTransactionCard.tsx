import Image from "next/legacy/image"
import {Text} from "../text"

interface cardprops {
    img:string,
    title:string,
    amount:string
}
export const TotalTransactionCard=({
    img,
    title,
    amount
}:cardprops)=>{
    return(
        <div 
            className="flex bg-white items-center p-4 rounded"
        >
            <div className="me-2 relative w-[3rem] h-[3rem]">
                <Image
                    src={img}
                    alt="object not found"
                    layout="fill"
                    className="w-full"
                />
            </div>
            <div>
                <Text
                    style="text-md font-semibold mb-2"
                    value={title}
                />
                <Text
                    style="text-sm text-black"
                    value={amount}
                />
            </div>
        </div>
    )
}