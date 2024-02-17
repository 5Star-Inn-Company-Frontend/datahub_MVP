"use server";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { baseUrl } from "@/actions/baseUrl";


export async function ModifyStatus(
    id:number,
    service:string
) {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
    if(storedItem?.value){
    const response = await fetch(`${baseUrl}deactivateacct/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
        },
        body: JSON.stringify({"status":service})
    });
    if(!response.ok){
        let result = await response.json();
        if(result?.error){
        return result;
        }else{
        throw new Error(`An error occured: ${response.statusText} status code: ${response.status}`)
        }
    }
    const result = await response.json();
    revalidateTag("virtual_accounts")
    return result;
}
}