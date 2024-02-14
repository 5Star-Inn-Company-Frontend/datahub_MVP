"use server";
import { baseUrl } from "@/actions/baseUrl";
import { cookies } from "next/headers";

export async function SearchTransaction(
    filter:string
) {
    try{
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
        if(!response.ok){
            throw new Error(`An error occured: ${response.statusText} (status code: ${response.status}`)
        }
        const result = await response.json();
        console.log("Success:", result);
        return result;
    }
    }catch (error) {
        console.error("Error:", error);
        return{
        statusCode :500
        }
    }
}