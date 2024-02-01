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
    const result = await response.json();
    console.log("Success:", result);
    return result;
    }
}