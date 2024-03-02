import { token,baseUrl } from "@/actions/baseUrl";
import { AirtimeService } from "@/components/customui/service/airtime";
import { cookies } from "next/headers";

async function getAirtime() {
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
}

export default async function All_AirtimeService() {
  const data = await getAirtime()
  return (
    <>
      <AirtimeService apiParameter={data?.data}/>
    </>
  )
}