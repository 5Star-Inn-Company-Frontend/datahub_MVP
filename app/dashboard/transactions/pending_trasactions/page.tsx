import { Pending_Transactions } from "@/components/customui/transactionModule/pending_transactions/pendingTransactions";
import { baseUrl } from "@/actions/baseUrl";
import { cookies } from "next/headers";

async function getPendingTransactions() {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
    if(storedItem?.value){
      const response = await fetch(`${baseUrl}pendingtransaction`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
          },
          next:{
              tags:["pending_transactions"]
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
  const data = await getPendingTransactions()
  return (
    <>
        <Pending_Transactions data={data?.data}/>
    </>
  )
}