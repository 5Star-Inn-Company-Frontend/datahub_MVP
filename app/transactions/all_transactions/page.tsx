import { DashBoardLayout } from "@/components/customui/dashboard/dashboardLayout";
import { All_Transactions } from "@/components/customui/transactionModule/all_transactions/allTransactions";

export default function All_Transaction_Page() {
  return (
    <main>
      <DashBoardLayout>
        <All_Transactions/>
      </DashBoardLayout>
    </main>
  )
}