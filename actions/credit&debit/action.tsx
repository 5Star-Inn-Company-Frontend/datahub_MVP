"use server";

import { cookies } from "next/headers";
import { baseUrl,token } from "../baseUrl";

export async function Credit_Debit(
    email : string,
    amount: string,
    description : string,
    actiontype:string
) {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
    if(storedItem?.value){
    const response = await fetch(`${baseUrl}${actiontype === "Fund"?"credituser":"debituser"}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
        },
        body: JSON.stringify({
            "email" : email,
            "amount" : amount,
            "description" : description
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
    return result;
}
}