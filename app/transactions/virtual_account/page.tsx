import { DashBoardLayout } from "@/components/customui/dashboard/dashboardLayout";
import { Vitual_Account_Transactions } from "@/components/customui/transactionModule/virtual_account/virtualAccount";
import { token,baseUrl } from "@/actions/baseUrl";
import { cookies } from "next/headers";

async function getVirtualAccounts() {
  try {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
    if(storedItem?.value){
    const response = await fetch(`${baseUrl}listvirtualacct`, {
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
  const cookieStore = cookies();
  const storedItem = cookieStore.get("datahubToken");
  const data = await getVirtualAccounts()
  return (
    <main>
      <DashBoardLayout
        firstname={storedItem?.value && JSON.parse(storedItem?.value)?.user?.firstname}
      >
        <Vitual_Account_Transactions data={data?.virtual_accounts}/>
      </DashBoardLayout>
    </main>
  )
}