import { ReactNode } from "react";
import { Nav } from "./sideNav";
import { DashBoardTopNav } from "./topNav";

type children = {
  children: ReactNode;
};
export const DashBoardLayout = ({ children }: children) => {
  return (
    <div className="lg:p-4 xlmd:p-4 sm:p-2 xs:p-2 bg-[#f5ede9] h-full">
      <div className="mobileNav">
        <Nav />
      </div>
      <div className="h-full w-full">
        <DashBoardTopNav />
        <div className="flex bg-cl h-screen">
          <div className="pt-4 pe-2">
            <Nav style=" z-[1035] relative desktopNav h-[100%] w-60 overflow-hidden dark:bg-zinc-800" />
          </div>
          <div className="w-full h-[100%] overflow-auto pt-8">{children}</div>
        </div>
      </div>
    </div>
  );
};
