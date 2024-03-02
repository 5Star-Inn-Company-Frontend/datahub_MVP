import { baseUrl } from "@/actions/baseUrl";
import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { Referers_Transactions } from "@/components/customui/transactionModule/moreRefer/moreRefersList";

async function getReferers() {
  const cookieStore = cookies();
  const storedItem = cookieStore.get("datahubToken");
    if(storedItem?.value){
        const response = await fetch(`${baseUrl}referelist`, {
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
export default async function All_Referers_Page() {
  const data = await getReferers()
  return (
    <>
      <Referers_Transactions
        data={data?.Referes}
      />
    </>
  )
}