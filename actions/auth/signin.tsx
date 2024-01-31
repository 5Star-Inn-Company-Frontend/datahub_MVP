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
    console.log("Success:", result);
    return result;
}