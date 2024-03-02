import { Reversed_Transactions } from "@/components/customui/transactionModule/reversed_transactions/reversedTransactions";
import { baseUrl } from "@/actions/baseUrl";
import { cookies } from "next/headers";

async function getReversedTransactions() {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
    if(storedItem?.value){
    const response = await fetch(`${baseUrl}reversedtransaction`, {
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
export default async function All_Transaction_Page() {
  const data = await getReversedTransactions()
  return (
    <>
      <Reversed_Transactions data={data?.data}/>
    </>
  )
}