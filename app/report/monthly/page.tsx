import { DashBoardLayout } from "@/components/customui/dashboard/dashboardLayout";
import { MonthlyReport } from "@/components/customui/reportModule/monthlyReportView/monthly_report_view";
import { cookies } from "next/headers";

export default async function All_Transaction_Page() {
  const cookieStore = cookies();
  const storedItem = cookieStore.get("datahubToken");
  return (
    <main>
      <DashBoardLayout firstname={storedItem?.value && JSON.parse(storedItem?.value)?.user?.firstname}>
        <MonthlyReport/>
      </DashBoardLayout>
    </main>
  )
}