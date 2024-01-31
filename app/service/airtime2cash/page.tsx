import { DashBoardLayout } from "@/components/customui/dashboard/dashboardLayout";
import { token,baseUrl } from "@/actions/baseUrl";
import { Airtime_To_CashService } from "@/components/customui/service/airtime2cash";
import { cookies } from "next/headers";

const cookieStore = cookies();
const storedItem = cookieStore.get("datahubToken");

async function getAirtime2Cash() {
  try {
    if(storedItem?.value){
      const response = await fetch(`${baseUrl}listairtime2cash`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
        },
        next:{
            tags:["airtime2cash"]
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

export default async function All_Airtime2CashService() {
  const data = await getAirtime2Cash()
  return (
    <main>
      <DashBoardLayout
        firstname={storedItem?.value && JSON.parse(storedItem?.value)?.user?.firstname}
      >
        <Airtime_To_CashService data={data?.data}/>
      </DashBoardLayout>
    </main>
  )
}