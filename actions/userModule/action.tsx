"use server";
import { baseUrl } from "@/actions/baseUrl";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function SearchUsers(
    filter:string
) {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
    if(storedItem?.value){
    const response = await fetch(`${baseUrl}searchuser`, {
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
    return result;
    }
}

export async function ModifyUser(
    id:number,
    address:string,
    phone:string
) {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
        console.log(phone,address,id)
        if(storedItem?.value){
        const response = await fetch(`${baseUrl}modifyuser/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
            },
            body: JSON.stringify({
                "address" : address,
                "phone" : phone
            })
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
        revalidateTag("users")
        return result;
    }
}

export async function SuspendUser(
    reason:string,
    id:number
) {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
        if(storedItem?.value){
            const response = await fetch(`${baseUrl}suspenduser/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
                },
                body: JSON.stringify({
                    "reason" : reason
                })
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
            revalidateTag("users")
            return result;
        }
}