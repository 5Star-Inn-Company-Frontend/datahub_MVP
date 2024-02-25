"use server";

import { cookies } from "next/headers";
import { baseUrl,token } from "../baseUrl";
import { revalidateTag } from "next/cache";


export async function ModifyAirtime(
    id:number,
    status:number,
    network:string,
    discount:string
    // server:string
) {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
    if(storedItem?.value){
    const response = await fetch(`${baseUrl}modifyairtime/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
        },
        body: JSON.stringify({
            "status":status,
            "network":network,
            "discount":discount
            // "server":server
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
    revalidateTag("airtime")
    return result;
}
}

export async function ModifyData(
    id:number,
    status:number,
    name:string,
    amount:number,
    note:string
    // discount:string,
    // server:string
) {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
    if(storedItem?.value){
    const response = await fetch(`${baseUrl}modifydata/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
        },
        body: JSON.stringify({
            "status":status,
            "name":name,
            "amount":amount,
            "note":note
            // "discount":discount,
            // "server":server
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
    revalidateTag("data")
    return result;
}
}

export async function ModifyBetting(
    id:number,
    status:number,
    name:string,
    code:string,
    discount:string
    // server:number
) {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
    if(storedItem?.value){
    const response = await fetch(`${baseUrl}modifybetting/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
        },
        body: JSON.stringify({
            "status":status,
            "name":name,
            "code":code,
            "discount":discount
            // "server":server
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
    revalidateTag("betting")
    return result;
}
}

export async function ModifyAirtime2Cash(
    id:number,
    status:number,
    network:string,
    discount:number,
    number:string
) {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
    if(storedItem?.value){
    const response = await fetch(`${baseUrl}modifyairtime2cash/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
        },
        body: JSON.stringify({
            "status":status,
            "network":network,
            "discount":discount,
            "number":number
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
    revalidateTag("airtime2cash")
    return result;
}
}

export async function ModifyTvPlan(
    id:number,
    status:number,
    name:string,
    type:string,
    price:string,
    // code:string,
    discount:string
    // server:number
) {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
    if(storedItem?.value){
    const response = await fetch(`${baseUrl}modifytvplan/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
        },
        body: JSON.stringify({
            "status":status,
            "name":name,
            "type":type,
            "price":price,
            // "code":code,
            "discount":discount
            // "server":server
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
    revalidateTag("tv")
    return result;
}
}

export async function ModifyElectricity(
    id:number,
    status:number,
    name:string,
    // code:string,
    // code10:string,
    discount:string
    // server:number
) {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
    if(storedItem?.value){
    const response = await fetch(`${baseUrl}modifyelectricity/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
        },
        body: JSON.stringify({
            "status":status,
            "name":name,
            // "code":code,
            // "code10":code10,
            "discount":discount
            // "server":server
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
    revalidateTag("electricity")
    return result;
}
}