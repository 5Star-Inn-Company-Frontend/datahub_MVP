"use server";
import { cookies } from "next/headers";
import { baseUrl,token } from "../baseUrl";

const cookieStore = cookies();
const storedItem = cookieStore.get("datahubToken");

export async function PostWalletFund(
    date:string,
) {
    if(storedItem?.value){
        const response = await fetch(`${baseUrl}totalwalletfund`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
            },
            body: JSON.stringify({"date":date})
            });
        const result = await response.json();
        console.log("Success:", result);
        return result;
    }
       
}