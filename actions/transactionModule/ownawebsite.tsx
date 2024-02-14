"use server";
import { cookies } from "next/headers";
import { baseUrl,token } from "../baseUrl";

interface bodyPropType {
    business_name:string,
    business_logo_url:string,
    website_address:string,
    business_phone_no:string 
}

export async function PostOwnWebsite(
    bodydata:bodyPropType
) {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
    if(storedItem?.value){
    const response = await fetch(`${baseUrl}ownwebsite`, {
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