import { baseUrl } from "@/actions/baseUrl";
import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { WithdrawalFormView } from "@/components/customui/mcd/withdrawalForm";

async function getMcdBank(storedItem:RequestCookie | undefined) {
    if(storedItem?.value){
      const response = await fetch(`${baseUrl}mcd-banklist`, {
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

export default async function Mcd_Withdrawals_FormField() {
  const cookieStore = cookies();
  const storedItem = cookieStore.get("datahubToken");
  const data = await getMcdBank(storedItem)
  return (
    <>
      <WithdrawalFormView apiParameter={data?.data}/>
    </>
  )
}