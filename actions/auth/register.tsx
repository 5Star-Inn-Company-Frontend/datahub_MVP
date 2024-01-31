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
        const result = await response.json();
        console.log("Success:", result);
        return result
}