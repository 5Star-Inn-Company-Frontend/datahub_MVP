import { baseUrl } from "@/actions/baseUrl";
import { BettingService } from "@/components/customui/service/betting";
import { cookies } from "next/headers";

async function getBetting() {
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
}

export default async function All_BettingService() {
  const data = await getBetting()
  return (
    <>
      <BettingService apiParameter={data?.data}/>
    </>
  )
}