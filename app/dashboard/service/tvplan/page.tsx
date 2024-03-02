import { baseUrl } from "@/actions/baseUrl";
import { TvService } from "@/components/customui/service/tvplan";
import { cookies } from "next/headers";

async function getTvPlan() {
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
}

export default async function All_TvPlanService() {
  const data = await getTvPlan()
  return (
    <>
      <TvService apiParameter={data?.data}/>
    </>
  )
}