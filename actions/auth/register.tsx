"use server";
import { baseUrl} from "../baseUrl";
interface bodyPropType {
    firstname:string,
    lastname:string,
    address:string,
    phone:string,
    gender:string,
    dob:string,
    email:string,
    password:string
}
export async function RegisterAction(
    bodydata:bodyPropType
) {
        const response = await fetch(`${baseUrl}register`, {
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
        return result;
}