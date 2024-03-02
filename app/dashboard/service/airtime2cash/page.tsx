import {baseUrl } from "@/actions/baseUrl";
import { Airtime_To_CashService } from "@/components/customui/service/airtime2cash";
import { cookies } from "next/headers";

async function getAirtime2Cash() {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
    if(storedItem?.value){
      const response = await fetch(`${baseUrl}listairtime2cash`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
        },
        next:{
            tags:["airtime2cash"]
        }
      });
      if(!response.ok){
        throw new Error(`An error occured: ${response.statusText} (status code: ${response.status}`)
      }
      const result =await response.json();
      return result
    }
}

export default async function All_Airtime2CashService() {
  const data = await getAirtime2Cash()
  return (
    <>
      <Airtime_To_CashService data={data?.data}/>
    </>
  )
}