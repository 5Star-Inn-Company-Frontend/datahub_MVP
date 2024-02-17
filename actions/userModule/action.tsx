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
    phone:string,
    email:string,
    status:number,
    status_reason:string,
    pin:string,
    bvn:string,
    bank_code:string,
    account_name:string,
    account_number:string
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
                "address" : address !== "null"? address:null,
                "phone" : phone!== "null"? phone:null,
                "email":email!== "null"? email:null,
                "status":status,
                "status_reason":status_reason!== "null"? status_reason:null,
                "pin":pin!== "null"? pin:null,
                "bvn":bvn!== "null"? bvn:null,
                "bank_code":bank_code!== "null"? bank_code:null,
                "account_name":account_name!== "null"? account_name:null,
                "account_number":account_number!== "null"?account_number:null
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