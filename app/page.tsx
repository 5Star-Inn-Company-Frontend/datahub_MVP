import { baseUrl} from "@/actions/baseUrl";
import { DashBoardLayout } from "@/components/customui/dashboard/dashboardLayout";
import {IntroSection} from "@/components/customui/dashboard/introSection"
import Spinner from "@/components/customui/global/spinner";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { Suspense } from "react";

async function getTotalTransactionCount(storedItem:RequestCookie | undefined) {
  try {
      if(storedItem?.value){
        const response = await fetch(`${baseUrl}totalcounttransaction`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
          }
        });
        if(!response.ok){
          throw new Error(`An error occured: ${response.statusText} (status code: ${response.status}`)
        }
        const result = await response.json();
        return result
      }
    }catch (error) {
      return{
        status :500
      }
  }
}

async function getTotalTransactionSum(storedItem:RequestCookie | undefined) {
  try {
    if(storedItem?.value){
      const response = await fetch(`${baseUrl}totalsumtransaction`, {
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
      return{
        status :500
      }
  }
}

async function getTotalCharge(storedItem:RequestCookie | undefined) {
  try {
      if(storedItem?.value){
        const response = await fetch(`${baseUrl}totalcharge`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
          }
        });
        if(!response.ok){
          throw new Error(`An error occured: ${response.statusText} (status code: ${response.status}`)
        }
        const result = await response.json();
        return result
      }
    }catch (error) {
      return{
        status :500
      }
  }
}

async function getTotalFund(storedItem:RequestCookie | undefined) {
  try {
    if(storedItem?.value){
      const response = await fetch(`${baseUrl}totalfund`, {
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
      return{
        status :500
      }
  }
}

async function getMcdBalance(storedItem:RequestCookie | undefined) {
  try {
      if(storedItem?.value){
        const response = await fetch(`${baseUrl}mcd-balance`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
          }
        });
        if(!response.ok){
          throw new Error(`An error occured: ${response.statusText} (status code: ${response.status}`)
        }
        const result = await response.json();
        return result
      }
    }catch (error) {
      return{
        status :500
      }
  }
}



export default async function Home() {
  const cookieStore = cookies();
  const storedItem = cookieStore.get("datahubToken");
  const count = await getTotalTransactionCount(storedItem)
  const sum = await getTotalTransactionSum(storedItem)
  const fund = await getTotalFund(storedItem)
  const charge = await getTotalCharge(storedItem)
  const balance = await getMcdBalance(storedItem)
  return (
    <main>
      <DashBoardLayout
        firstname={storedItem?.value && JSON.parse(storedItem?.value)?.user?.firstname}
      >
        <Suspense fallback={<Spinner/>}>
          <IntroSection
            trans_count={count?.total_count_transaction}
            trans_sum={sum?.total_sum_transaction}
            total_charge={charge?.total_wallet_charge}
            total_fund={fund?.total_wallet_funding}
            balance={balance?.data}
          />
        </Suspense>
      </DashBoardLayout>
    </main>
  )
}
