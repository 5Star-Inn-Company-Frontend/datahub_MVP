import { Nav } from "@/components/customui/dashboard/sideNav";
import { DashBoardTopNav } from "@/components/customui/dashboard/topNav";

export default function DashBoardLayout({
    children
}: {
    children: React.ReactNode;
  }){
    return(
        <div className="bg-[#f9fafb] h-full">
            <div className="mobileNav">
                <Nav/>
            </div>
            <div className="w-full h-full">
                <DashBoardTopNav/>
                <div 
                    className="flex bg-cl"
                    style={{
                        height:"100%",
                        paddingTop:"6rem"
                    }}
                >
                    <div className="lg:pe-2 xl:pe-2 md:pe-2 sm:pe-0 xs:pe-0 h-[100%] lg:ps-4 xl:ps-4 md:ps-4 sm:ps-0 xs:ps-0 pt-4">
                        <Nav 
                            style=" z-[1035] relative desktopNav w-60 overflow-hidden dark:bg-zinc-800 bg-white "/>
                    </div>
                    <div className="w-full h-full lg:pt-8 xl:pt-8 md:pt-8 sm:pt-2 xs:pt-2 overflow-auto">
                        <div className="px-4 h-full overflow-auto w-full h-full">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
       </div>
  );
};