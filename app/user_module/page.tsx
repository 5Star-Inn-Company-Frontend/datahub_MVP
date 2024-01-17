import { DashBoardLayout } from "@/components/customui/dashboard/dashboardLayout";
import { UserModuleLayout } from "@/components/customui/userModule/userModuleLayoute";

export default function User_module() {
  return (
    <main>
      <DashBoardLayout>
        <UserModuleLayout/>
      </DashBoardLayout>
    </main>
  )
}