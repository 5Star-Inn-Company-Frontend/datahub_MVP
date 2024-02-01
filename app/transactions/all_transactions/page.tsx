import { DashBoardLayout } from "@/components/customui/dashboard/dashboardLayout";
import { All_Transactions } from "@/components/customui/transactionModule/all_transactions/allTransactions";
import { token,baseUrl } from "@/actions/baseUrl";
import { cookies } from "next/headers";

async function getAllTransactions() {
  try {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
    if(storedItem?.value){
    const response = await fetch(`${baseUrl}listalltransaction`, {
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
  const data =await getAllTransactions()
  return (
    <main>
      <DashBoardLayout
        firstname={storedItem?.value && JSON.parse(storedItem?.value)?.user?.firstname}
      >
        <All_Transactions 
          data={data?.transactions}
        />
      </DashBoardLayout>
    </main>
  )
}