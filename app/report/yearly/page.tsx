import { DashBoardLayout } from "@/components/customui/dashboard/dashboardLayout";
import { YearlyReport } from "@/components/customui/reportModule/yearlyReportView/yearly_report_view";
import { cookies } from "next/headers";


export default async function Yearly_Report_Page() {
  const cookieStore = cookies();
  const storedItem = cookieStore.get("datahubToken");
  return (
    <main>
      <DashBoardLayout firstname={storedItem?.value && JSON.parse(storedItem?.value)?.user?.firstname}>
        <YearlyReport/>
      </DashBoardLayout>
    </main>
  )
}