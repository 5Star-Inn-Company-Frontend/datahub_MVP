import { Active_Users_Transactions } from "@/components/customui/transactionModule/users/active/activeUsers";
import { baseUrl } from "@/actions/baseUrl";
import { cookies } from "next/headers";

async function getActiveUsers() {
  try {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
    if(storedItem?.value){
    const response = await fetch(`${baseUrl}activeuser`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
        }
      });
      if(!response.ok){
        throw new Error(`An error occured: ${response.statusText} status code: ${response.status}.`)
      }
      const result =await response.json();
      return result
    }
   }catch (error) {
    console.error("Error:", error);
    return{
      statusCode :500
    }
  }
}
export default async function All_Transaction_Page() {
  const data = await getActiveUsers();
  return (
    <>
      <Active_Users_Transactions data={data?.active_users}/>
    </>
  )
}