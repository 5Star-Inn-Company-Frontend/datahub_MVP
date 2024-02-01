import { DashBoardLayout } from "@/components/customui/dashboard/dashboardLayout";
import { Reversed_Transactions } from "@/components/customui/transactionModule/reversed_transactions/reversedTransactions";
import { token,baseUrl } from "@/actions/baseUrl";
import { cookies } from "next/headers";

async function getReversedTransactions() {
  try {
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
  const data = await getReversedTransactions()
  return (
    <main>
      <DashBoardLayout
        firstname={storedItem?.value && JSON.parse(storedItem?.value)?.user?.firstname}
      >
        <Reversed_Transactions data={data?.data}/>
      </DashBoardLayout>
    </main>
  )
}