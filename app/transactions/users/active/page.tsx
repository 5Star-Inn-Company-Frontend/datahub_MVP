import { DashBoardLayout } from "@/components/customui/dashboard/dashboardLayout";
import { Active_Users_Transactions } from "@/components/customui/transactionModule/users/active/activeUsers";
import { token,baseUrl } from "@/actions/baseUrl";
import { cookies } from "next/headers";

const cookieStore = cookies();
const storedItem = cookieStore.get("datahubToken");
async function getActiveUsers() {
  try {
    if(storedItem?.value){
    const response = await fetch(`${baseUrl}activeuser`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
        }
      });
      const result =await response.json();
      console.log("Success:", result);
      return result
    }
   }catch (error) {
    console.error("Error:", error);
}
}
export default async function All_Transaction_Page() {
  const data = await getActiveUsers()
  return (
    <main>
      <DashBoardLayout
        firstname={storedItem?.value && JSON.parse(storedItem?.value)?.user?.firstname}
      >
        <Active_Users_Transactions data={data?.active_users}/>
      </DashBoardLayout>
    </main>
  )
}