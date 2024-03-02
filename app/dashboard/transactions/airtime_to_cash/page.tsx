import { baseUrl } from "@/actions/baseUrl";
import { Airtime_To_Cash } from "@/components/customui/transactionModule/airtime_to_cash/airtimeTocash";
import { cookies } from "next/headers";

async function getAirtimeTocash() {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
    if(storedItem?.value){
      const response = await fetch(`${baseUrl}airtime2cash`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
          },
          next:{
            tags:["airtime2cashstatus"]
          }
        });
        if(!response.ok){
          throw new Error(`An error occured: ${response.statusText} (status code: ${response.status}`)
        }
        const result =await response.json();
        return result
    }
}
export default async function All_Transaction_Page() {
  const data = await getAirtimeTocash()
  return (
    <>
      <Airtime_To_Cash data={data?.airtime2cashs}/>
    </>
  )
}