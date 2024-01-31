"use server";
import { baseUrl } from "@/actions/baseUrl";
import { cookies } from "next/headers";
// import { baseUrl,token } from "../baseUrl";

const cookieStore = cookies();
const storedItem = cookieStore.get("datahubToken");
export async function SearchTransaction(
    filter:string
) {
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