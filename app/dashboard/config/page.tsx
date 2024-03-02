import { baseUrl } from "@/actions/baseUrl";
import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { ConfigueList } from "@/components/customui/configue/Configue_list";

async function getConfigList(storedItem:RequestCookie | undefined) {
    if(storedItem?.value){
      const response = await fetch(`${baseUrl}listconfig`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
        },
        next:{
            tags:["configue"]
        }
      });
      if(!response.ok){
        throw new Error(`An error occured: ${response.statusText} (status code: ${response.status}`)
      }
      const result =await response.json();
      return result
    }
}

export default async function All_Config() {
  const cookieStore = cookies();
  const storedItem = cookieStore.get("datahubToken");
  const data = await getConfigList(storedItem)
  return (
    <>
        <ConfigueList data={data?.data}/>
    </>
  )
}