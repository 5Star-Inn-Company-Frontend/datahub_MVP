import { baseUrl } from "@/actions/baseUrl";
import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { MCD_Transactions } from "@/components/customui/mcd/mcd_transacations";

async function getMcdTransaction(storedItem:RequestCookie | undefined) {
    if(storedItem?.value){
      const response = await fetch(`${baseUrl}mcd-transactions`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
        }
      });
      if(!response.ok){
        throw new Error(`An error occured: ${response.statusText} (status code: ${response.status}`)
      }
      const result =await response.json();
      return result
    }
}

export default async function All_Mcd_Transaction() {
  const cookieStore = cookies();
  const storedItem = cookieStore.get("datahubToken");
  const data = await getMcdTransaction(storedItem)
  return (
    <>
      <MCD_Transactions apiParameter={data?.data}/>
    </>
  )
}