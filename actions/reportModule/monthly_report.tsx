"use server";
import { cookies } from "next/headers";
import { baseUrl,token } from "../baseUrl";

export async function getMonthlyReport(
    date:string
) {
  const cookieStore = cookies();
  const storedItem = cookieStore.get("datahubToken");
  if(storedItem?.value){
    const response = await fetch(`${baseUrl}monthlyreport`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
      },
      body: JSON.stringify({"month":date})
    });
    if(!response.ok){
      let result = await response.json();
      if(result){
        return result;
      }else{
        throw new Error(`An error occured: ${response.statusText} status code: ${response.status}`)
      }
    }
    const result = await response.json();
    return result;
}
}