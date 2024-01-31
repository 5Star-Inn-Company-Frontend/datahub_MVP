import { DashBoardLayout } from "@/components/customui/dashboard/dashboardLayout";
import { UserModuleLayout } from "@/components/customui/userModule/userModuleLayoute";
import { cookies } from "next/headers";

const cookieStore = cookies();
const storedItem = cookieStore.get("datahubToken");
export default function User_module() {
  return (
    <main>
      <DashBoardLayout
        firstname={storedItem?.value && JSON.parse(storedItem?.value)?.user?.firstname}
      >
        <UserModuleLayout/>
      </DashBoardLayout>
    </main>
  )
}