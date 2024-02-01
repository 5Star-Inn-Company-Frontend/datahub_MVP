import { DashBoardLayout } from "@/components/customui/dashboard/dashboardLayout";
import { Total_Wallet_Charge } from "@/components/customui/transactionModule/walletcharge";
import { cookies } from "next/headers";

export default async function All_Transaction_Page() {
  const cookieStore = cookies();
  const storedItem = cookieStore.get("datahubToken");
  return (
    <main>
      <DashBoardLayout
        firstname={storedItem?.value && JSON.parse(storedItem?.value)?.user?.firstname}
      >
      <Total_Wallet_Charge/>
      </DashBoardLayout>
    </main>
  )
}