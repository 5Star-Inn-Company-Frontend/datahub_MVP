import { DashBoardLayout } from "@/components/customui/dashboard/dashboardLayout";
import { token,baseUrl } from "@/actions/baseUrl";
import { DataService } from "@/components/customui/service/data";
import { cookies } from "next/headers";

const cookieStore = cookies();
const storedItem = cookieStore.get("datahubToken");

async function getData() {
  try {
    if(storedItem?.value){
      const response = await fetch(`${baseUrl}listlldata`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
        },
        next:{
            tags:["data"]
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

export default async function All_DataService() {
  const data = await getData()
  return (
    <main>
      <DashBoardLayout
        firstname={storedItem?.value && JSON.parse(storedItem?.value)?.user?.firstname}
      >
        <DataService apiParameter={data?.data}/>
      </DashBoardLayout>
    </main>
  )
}