import { DashBoardLayout } from "@/components/customui/dashboard/dashboardLayout";
import { Dormant_Users_Transactions } from "@/components/customui/transactionModule/users/dormant/dormantUsers";
import { token,baseUrl } from "@/actions/baseUrl";
import { cookies } from "next/headers";

async function getDormantUsers() {
  try {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
    if(storedItem?.value){
      const response = await fetch(`${baseUrl}dormantuser`, {
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
   }catch (error) {
    console.error("Error:", error);
    return{
      statusCode :500
      }
}
}
export default async function Dormant_Users_Page() {
  const cookieStore = cookies();
  const storedItem = cookieStore.get("datahubToken");
  const data = await getDormantUsers()
  return (
    <main>
      <DashBoardLayout
        firstname={storedItem?.value && JSON.parse(storedItem?.value)?.user?.firstname}
      >
        <Dormant_Users_Transactions data={data?.dormant_users}/>
      </DashBoardLayout>
    </main>
  )
}