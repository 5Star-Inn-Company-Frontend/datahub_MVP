"use server";
import { baseUrl } from "@/actions/baseUrl";
import { cookies } from "next/headers";

export async function SearchTransaction(
    filter:string
) {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
    if(storedItem?.value){
    const response = await fetch(`${baseUrl}searchtransaction`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
        },
        body: JSON.stringify({"search":filter})
    });
    const result = await response.json();
    console.log("Success:", result);
    return result;
    }
}