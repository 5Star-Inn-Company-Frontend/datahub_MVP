import { token,baseUrl } from "@/actions/baseUrl";
import { DashBoardLayout } from "@/components/customui/dashboard/dashboardLayout";
import { Airtime_To_Cash } from "@/components/customui/transactionModule/airtime_to_cash/airtimeTocash";
import { cookies } from "next/headers";

async function getAirtimeTocash() {
  try {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
    if(storedItem?.value){
      const response = await fetch(`${baseUrl}airtime2cash`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
          }
        });
        const result =await response.json();
        console.log("Success:", result);
        return result
    }
   }catch (error) {
    console.error("Error:", error);
}
}
export default async function All_Transaction_Page() {
  const cookieStore = cookies();
  const storedItem = cookieStore.get("datahubToken");
  const data = await getAirtimeTocash()
  return (
    <main>
      <DashBoardLayout
        firstname={storedItem?.value && JSON.parse(storedItem?.value)?.user?.firstname}
      >
        <Airtime_To_Cash data={data?.airtime2cashs}/>
      </DashBoardLayout>
    </main>
  )
}