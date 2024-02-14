import { DashBoardLayout } from "@/components/customui/dashboard/dashboardLayout";
import { token,baseUrl } from "@/actions/baseUrl";
import { TvService } from "@/components/customui/service/tvplan";
import { cookies } from "next/headers";

async function getTvPlan() {
  try {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
    if(storedItem?.value){
    const response = await fetch(`${baseUrl}listalltvplan`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
        },
        next:{
            tags:["tv"]
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

export default async function All_TvPlanService() {
  const cookieStore = cookies();
  const storedItem = cookieStore.get("datahubToken");
  const data = await getTvPlan()
  return (
    <main>
      <DashBoardLayout
        firstname={storedItem?.value && JSON.parse(storedItem?.value)?.user?.firstname}
      >
        <TvService apiParameter={data?.data}/>
      </DashBoardLayout>
    </main>
  )
}