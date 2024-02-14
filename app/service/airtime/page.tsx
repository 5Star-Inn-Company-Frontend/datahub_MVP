import { DashBoardLayout } from "@/components/customui/dashboard/dashboardLayout";
import { token,baseUrl } from "@/actions/baseUrl";
import { AirtimeService } from "@/components/customui/service/airtime";
import { cookies } from "next/headers";

async function getAirtime() {
  try {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
    if(storedItem?.value){
      const response = await fetch(`${baseUrl}listallairtime`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
        },
        next:{
            tags:["airtime"]
        }
      });
      if(!response.ok){
        throw new Error(`An error occured: ${response.statusText} (status code: ${response.status}`)
      }
      const result =await response.json();
      return result
    }
   }catch (error) {
    console.error("Error:", error);
    return{
      statusCode :500
      }
  }
}

export default async function All_AirtimeService() {
  const cookieStore = cookies();
  const storedItem = cookieStore.get("datahubToken");
  const data = await getAirtime()
  return (
    <main>
      <DashBoardLayout
        firstname={storedItem?.value && JSON.parse(storedItem?.value)?.user?.firstname}
      >
        <AirtimeService apiParameter={data?.data}/>
      </DashBoardLayout>
    </main>
  )
}