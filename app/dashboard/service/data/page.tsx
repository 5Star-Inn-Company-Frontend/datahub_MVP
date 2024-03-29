import { baseUrl } from "@/actions/baseUrl";
import { DataService } from "@/components/customui/service/data";
import { cookies } from "next/headers";

async function getData() {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
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
      if(!response.ok){
        throw new Error(`An error occured: ${response.statusText} (status code: ${response.status}`)
      }
      const result =await response.json();
      return result
    }
}

export default async function All_DataService() {
  const data = await getData()
  return (
    <>
      <DataService apiParameter={data?.data}/>
    </>
  )
}