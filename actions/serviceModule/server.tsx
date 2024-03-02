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
            "network":network ==="null"?null:nework,
            "discount":discount ==="null"?null:discount
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
            "name":name ==="null"?null:name,
            "amount":amount ==="null"?null: amount,
            "note":note ==="null"?null: note
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
            "name":name ==="null"?null:name,
            "code":code ==="null"?null:code,
            "discount":discount ==="null"?null: discount
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
            "network":network ==="null"?null: network,
            "discount":discount ==="null"?null:discount,
            "number":number ==="null"?null: number
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
            "name":name ==="null"?null: name,
            "type":type ==="null"?null:type,
            "price":price ==="null"?null:price,
            "discount":discount ==="null"?null:discount
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
    discount:string
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
            "name":name ==="null"?null:name,
            "discount":discount ==="null"?null:discount
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