import { DashBoardLayout } from "@/components/customui/dashboard/dashboardLayout";
// import { All_Users } from "@/components/customui/userModule/allUsers";
import { cookies } from "next/headers";
import React from "react";

export default async function UsersPage(){
  const cookieStore = cookies();
  const storedItem = cookieStore.get("datahubToken");
  return (
    <main>
      <DashBoardLayout
        firstname={storedItem?.value && JSON.parse(storedItem?.value)?.user?.firstname}
      >
        {/* <All_Users /> */}
        ufuyy
      </DashBoardLayout>
    </main>
  );
};
