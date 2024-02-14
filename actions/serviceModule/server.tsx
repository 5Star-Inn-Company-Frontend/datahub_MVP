"use server";

import { cookies } from "next/headers";
import { baseUrl,token } from "../baseUrl";
import { revalidateTag } from "next/cache";


export async function ModifyAction(
    service:string,
    id:number,
    status:number
) {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
    if(storedItem?.value){
    const response = await fetch(`${baseUrl}${service ==="airtime"?"modifyairtime":service ==="data"?"modifydata":service ==="tv"?"modifytvplan":service ==="electricity"?"modifyelectricity":service ==="betting"?"modifybetting":"modifyairtime2cash"}/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
        },
        body: JSON.stringify({"status":status})
    });
    if(!response.ok){
        let result = await response.json();
        if(result?.message){
        return result;
        }else{
        throw new Error(`An error occured: ${response.statusText} status code: ${response.status}`)
        }
    }
    const result = await response.json();
    revalidateTag(service)
    return result;
}
}