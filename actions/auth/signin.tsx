"use server";
import { baseUrl} from "../baseUrl";
import {cookies} from "next/headers";
interface bodyPropType {
    email:string,
    password:string
}
export async function LoginAction(
    bodydata:bodyPropType
) {
    const response = await fetch(`${baseUrl}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
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
    if(result?.status){
      cookies().set(
        "datahubToken",
        JSON.stringify(result?.data),
        {
          expires:new Date(result?.date?.expires_at).getTime()
        }
      )
    }
    return result;
}