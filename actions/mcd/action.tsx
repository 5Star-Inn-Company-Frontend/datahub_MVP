"use server";

import { cookies } from "next/headers";
import { baseUrl,token } from "../baseUrl";


export async function VerifyBank(
    accountnumber :string,
    code : string
) {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
    if(storedItem?.value){
    const response = await fetch(`${baseUrl}mcd-verifyBank`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
        },
        body: JSON.stringify({
            "accountnumber":accountnumber,
            "code":code 
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

export async function MakeWithdrawal(
    amount : string,
    account_number : string,
    bank_code : string,
    bank : string,
    wallet : string
) {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
    if(storedItem?.value){
    const response = await fetch(`${baseUrl}mcd-makeWithdrawal`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
        },
        body: JSON.stringify({
            "amount" : amount,
            "account_number" : account_number,
            "bank_code" : bank_code,
            "bank" : bank,
            "wallet" : wallet
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