import { DashBoardLayout } from "@/components/customui/dashboard/dashboardLayout";
import { baseUrl } from "@/actions/baseUrl";
import { cookies } from "next/headers";
import { ReferesList } from "@/components/customui/transactionModule/referesList";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

async function getReferers(storedItem:RequestCookie | undefined) {
  try {
    if(storedItem?.value){
        const response = await fetch(`${baseUrl}referelist`, {
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
export default async function All_Transaction_Page() {
  const cookieStore = cookies();
  const storedItem = cookieStore.get("datahubToken");
  const data = await getReferers(storedItem)
  return (
    <main>
      <DashBoardLayout
        firstname={storedItem?.value && JSON.parse(storedItem?.value)?.user?.firstname}
      >
        <ReferesList data={data?.Referes}/>
      </DashBoardLayout>
    </main>
  )
}