import { baseUrl } from "@/actions/baseUrl";
import { cookies } from "next/headers";
import { Users_Transactions } from "@/components/customui/userModule/user";

async function getUserTransactions(id:number) {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");

    console.log(id)
    if(storedItem?.value){
      const response = await fetch(`${baseUrl}usertransaction/${id}`, {
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

export default async function Users_Transactions_Page({
    params: { id },
  }:{
    params: { id: number }
  }) {
  const data = await getUserTransactions(id)
  return (
    <>
      <Users_Transactions data={data?.transactions}/>
    </>
  )
}