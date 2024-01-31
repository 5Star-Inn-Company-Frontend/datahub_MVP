"use server";
import { cookies } from "next/headers";
import { baseUrl,token } from "../baseUrl";

const cookieStore = cookies();
const storedItem = cookieStore.get("datahubToken");
export async function getMonthlyReport(
    date:string
) {
  if(storedItem?.value){
    const response = await fetch(`${baseUrl}monthlyrepor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
      },
      body: JSON.stringify({"month":date})
    });
    const result = await response.json();
    console.log("Success:", result);
    return result;
  }
}