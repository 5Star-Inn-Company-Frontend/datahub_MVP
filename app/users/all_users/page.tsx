import { DashBoardLayout } from "@/components/customui/dashboard/dashboardLayout";
import { All_Transactions } from "@/components/customui/transactionModule/all_transactions/allTransactions";
import { All_Users } from "@/components/customui/userModule/allUsers";

export default function All_Transaction_Page() {
  return (
    <main>
      <DashBoardLayout>
        <All_Users/>
      </DashBoardLayout>
    </main>
  )
}