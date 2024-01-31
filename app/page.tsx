import { token ,baseUrl} from "@/actions/baseUrl";
import { DashBoardLayout } from "@/components/customui/dashboard/dashboardLayout";
import {IntroSection} from "@/components/customui/dashboard/introSection"
import { cookies } from "next/headers";
import { Suspense } from "react";

const cookieStore = cookies();
const storedItem = cookieStore.get("datahubToken");
async function getTotalTransactionCount() {
  try {
      if(storedItem?.value){
        const response = await fetch(`${baseUrl}totalcounttransaction`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
          }
        });
        const result = await response.json();
        console.log("Success:", result);
        return result
      }
    }catch (error) {
      console.error("Error:", error);
  }
}

async function getTotalTransactionSum() {
  try {
    if(storedItem?.value){
      const response = await fetch(`${baseUrl}totalsumtransaction`, {
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

async function getTransactionTypes() {
  try {
    if(storedItem?.value){
      const response = await fetch(`${baseUrl}transactiontype`, {
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

export default async function Home() {
  const trans_count = getTotalTransactionCount()
  const trans_sum = getTotalTransactionSum()
  const trans_types = getTransactionTypes()
  const [sum, types, count] = await Promise.all([trans_sum, trans_types, trans_count])
  console.log("datahubToken",cookies().get("datahubToken"))
  return (
    <main>
      <DashBoardLayout
        firstname={storedItem?.value && JSON.parse(storedItem?.value)?.user?.firstname}
      >
        <Suspense fallback={<div>loading....</div>}>
          <IntroSection
            trans_count={count?.total_count_transaction}
            trans_sum={sum?.total_sum_transaction}
            trans_types={types?.transaction_types}
            userDetails={storedItem?.value && JSON.parse(storedItem?.value)?.user}
          />
        </Suspense>
      </DashBoardLayout>
    </main>
  )
}
