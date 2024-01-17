import { ReactNode } from "react"
import { Nav } from "./sideNav"
import { DashBoardTopNav } from "./topNav"

type children ={
    children:ReactNode
}
export const DashBoardLayout =({
    children
}:children)=>{
    return(
        <div className="p-2 bg-[#f5ede9] h-full">
            <div className="mobileNav">
                <Nav/>
            </div>
            <div className="h-full w-full">
                <DashBoardTopNav/>
                <div className="flex bg-cl h-screen">
                    <div className="pt-4">
                        <Nav 
                            style="bg-white z-[1035] relative desktopNav h-[100%] w-60 overflow-hidden dark:bg-zinc-800"/>
                    </div>
                    <div className="w-full lg:p-8 xl:p-8 md:p-8 sm:p-8 xs:p-4 xxs:p-4 xxxs:p-4 h-[100%] overflow-auto pb-0">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}