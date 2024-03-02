import { baseUrl } from "@/actions/baseUrl";
import { ElectricityService } from "@/components/customui/service/electricity";
import { cookies } from "next/headers";


async function getElectricity() {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
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
      if(!response.ok){
        throw new Error(`An error occured: ${response.statusText} (status code: ${response.status}`)
      }
      const result =await response.json();
      return result
    }
}

export default async function All_ElectricityService() {
  const data = await getElectricity()
  return (
    <>
      <ElectricityService apiParameter={data?.data}/>
    </>
  )
}