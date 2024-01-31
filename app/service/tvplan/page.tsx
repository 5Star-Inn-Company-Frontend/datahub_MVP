import { DashBoardLayout } from "@/components/customui/dashboard/dashboardLayout";
import { token,baseUrl } from "@/actions/baseUrl";
import { TvService } from "@/components/customui/service/tvplan";
import { cookies } from "next/headers";

const cookieStore = cookies();
const storedItem = cookieStore.get("datahubToken");

async function getTvPlan() {
  try {
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
      const result =await response.json();
      console.log("Success:", result);
      return result
      }
   }catch (error) {
    console.error("Error:", error);
}
}

export default async function All_TvPlanService() {
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