"use server";
import { cookies } from "next/headers";
import { baseUrl,token } from "../baseUrl";

interface bodyPropType {
    refer:string,
    amount_to_earn:string
}

export async function PostRefer(
    bodydata:bodyPropType
) {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
    if(storedItem?.value){
    const response = await fetch(`${baseUrl}referandearn`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
        },
        body: JSON.stringify(bodydata)
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
    return result;
    }
}