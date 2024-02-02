import { token ,baseUrl} from "@/actions/baseUrl";
import { DashBoardLayout } from "@/components/customui/dashboard/dashboardLayout";
import {IntroSection} from "@/components/customui/dashboard/introSection"
import Spinner from "@/components/customui/global/spinner";
import { cookies } from "next/headers";
import { Suspense } from "react";

async function getTotalTransactionCount() {
  try {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
      if(storedItem?.value){
        const response = await fetch(`${baseUrl}totalcounttransaction`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
          }
        });
        const result = await response.json();
        console.log("Success:1", result);
        return result
      }
    }catch (error) {
      console.error("Error:", error);
  }
}

async function getTotalTransactionSum() {
  try {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
    if(storedItem?.value){
      const response = await fetch(`${baseUrl}totalsumtransaction`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
          }
        });
        const result =await response.json();
        console.log("Success:2", result);
        return result
    }
     }catch (error) {
      console.error("Error:", error);
  }
}

async function getTransactionTypes() {
  try {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
    if(storedItem?.value){
      const response = await fetch(`${baseUrl}transactiontype`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
          }
        });
        const result =await response.json();
        console.log("Success3:", result);
        return result
    }
   }catch (error) {
    console.error("Error:", error);
}
}

export default async function Home() {
  const cookieStore = cookies();
  const storedItem = cookieStore.get("datahubToken");
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
        <Suspense fallback={<Spinner/>}>
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
