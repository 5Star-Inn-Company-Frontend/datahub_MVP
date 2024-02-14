import { DashBoardLayout } from "@/components/customui/dashboard/dashboardLayout";
import { token,baseUrl } from "@/actions/baseUrl";
import { BettingService } from "@/components/customui/service/betting";
import { cookies } from "next/headers";

async function getBetting() {
  try {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
    if(storedItem?.value){
      const response = await fetch(`${baseUrl}listbetting`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
        },
        next:{
            tags:["betting"]
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

export default async function All_BettingService() {
  const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
  const data = await getBetting()
  return (
    <main>
      <DashBoardLayout
        firstname={storedItem?.value && JSON.parse(storedItem?.value)?.user?.firstname} 
      >
        <BettingService apiParameter={data?.data}/>
      </DashBoardLayout>
    </main>
  )
}