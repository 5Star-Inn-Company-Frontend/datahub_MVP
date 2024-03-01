"use server";

import { cookies } from "next/headers";
import { baseUrl} from "../baseUrl";
import { revalidateTag } from "next/cache";


export async function ModifyConfgueAction(
    id:number,
    status:number,
    ppkey:string,
    charges:number
) {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
    if(storedItem?.value){
    const response = await fetch(`${baseUrl}modifyconfig/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
        },
        body: JSON.stringify({
            "status":status,
            "ppkey":ppkey,
            "charges":charges
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
    revalidateTag("configue")
    return result;
}
}