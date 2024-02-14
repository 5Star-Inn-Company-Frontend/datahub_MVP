"use server";
import { cookies } from "next/headers";
import { baseUrl,token } from "../baseUrl";

export async function PostWalletCharge(
    date:string
) {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
    if(storedItem?.value){
        const response = await fetch(`${baseUrl}totalwalletcharge`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
            },
            body: JSON.stringify({"date":date})
        });
        if(!response.ok){
            throw new Error(`An error occured: ${response.statusText} (status code: ${response.status}`)
        }
        const result = await response.json();
        return result;
    }
}