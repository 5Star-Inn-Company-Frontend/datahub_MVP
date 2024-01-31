import { DashBoardLayout } from "@/components/customui/dashboard/dashboardLayout";
import { token,baseUrl } from "@/actions/baseUrl";
import { BettingService } from "@/components/customui/service/betting";
import { cookies } from "next/headers";


const cookieStore = cookies();
const storedItem = cookieStore.get("datahubToken");

async function getBetting() {
  try {
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
      const result =await response.json();
      console.log("Success:", result);
      return result
    }
   }catch (error) {
    console.error("Error:", error);
}
}

export default async function All_BettingService() {
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