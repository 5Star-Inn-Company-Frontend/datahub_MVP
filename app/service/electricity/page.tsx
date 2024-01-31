import { DashBoardLayout } from "@/components/customui/dashboard/dashboardLayout";
import { token,baseUrl } from "@/actions/baseUrl";
import { ElectricityService } from "@/components/customui/service/electricity";
import { cookies } from "next/headers";

const cookieStore = cookies();
const storedItem = cookieStore.get("datahubToken");

async function getElectricity() {
  try {
    if(storedItem?.value){
    const response = await fetch(`${baseUrl}listelectricity`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
        },
        next:{
            tags:["electricity"]
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

export default async function All_ElectricityService() {
  const data = await getElectricity()
  return (
    <main>
      <DashBoardLayout
        firstname={storedItem?.value && JSON.parse(storedItem?.value)?.user?.firstname}
      >
        <ElectricityService apiParameter={data?.data}/>
      </DashBoardLayout>
    </main>
  )
}