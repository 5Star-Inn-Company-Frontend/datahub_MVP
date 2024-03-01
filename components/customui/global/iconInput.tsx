"use client";

export const IconInput =({
    icon,
    children
}:{
    icon:React.ReactNode,
    children:React.ReactNode
})=>{
    return(
        <div className="flex items-center border">
            <span className="border p-[0.6rem] bg-[gainsboro]">
                {icon}
            </span>
            <span className="w-full">
                {children}
            </span>
        </div>
    )
}