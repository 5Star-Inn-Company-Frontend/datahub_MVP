import { DashBoardLayout } from "@/components/customui/dashboard/dashboardLayout";
import { YearlyReport } from "@/components/customui/reportModule/yearlyReportView/yearly_report_view";
import { cookies } from "next/headers";

const cookieStore = cookies();
const storedItem = cookieStore.get("datahubToken");
export default function Yearly_Report_Page() {
  return (
    <main>
      <DashBoardLayout firstname={storedItem?.value && JSON.parse(storedItem?.value)?.user?.firstname}>
        <YearlyReport/>
      </DashBoardLayout>
    </main>
  )
}