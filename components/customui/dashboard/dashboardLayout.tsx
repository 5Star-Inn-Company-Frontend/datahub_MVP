import { ReactNode } from "react";
import { Nav } from "./sideNav";
import { DashBoardTopNav } from "./topNav";

type children ={
    children:ReactNode,
    firstname:string
}
export const DashBoardLayout =({
    children,
    firstname
}:children)=>{
    return(
        <div className="bg-[#f5ede9] h-full">
            <div className="mobileNav">
                <Nav/>
            </div>
            <div className="w-full h-full">
                <DashBoardTopNav/>
                <div 
                    className="flex bg-cl"
                    style={{
                        height:"86%"
                    }}
                >
                    <div className="lg:pe-2 xl:pe-2 md:pe-2 sm:pe-0 xs:pe-0 h-[100%]">
                        <Nav 
                            style=" z-[1035] relative desktopNav w-60 overflow-hidden dark:bg-zinc-800"/>
                    </div>
                    <div className="w-full h-full pt-8 overflow-auto">
                        <div className="px-4 h-full overflow-auto w-full">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
       </div>
  );
};
