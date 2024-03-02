import { baseUrl } from "@/actions/baseUrl";
import { cookies } from "next/headers";
import { All_Users } from "@/components/customui/userModule/allUsers";

async function getAllUsers() {
    const cookieStore = cookies();
    const storedItem = cookieStore.get("datahubToken");
    if(storedItem?.value){
      const response = await fetch(`${baseUrl}allusers`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
        },
        next:{
            tags:["users"]
        }
      });
      if(!response.ok){
        throw new Error(`An error occured: ${response.statusText} (status code: ${response.status}`)
      }
      const result =await response.json();
      return result
    }
}

export default async function All_Users_Page() {
  const data = await getAllUsers()
  return (
    <>
      <All_Users data={data?.users}/>
    </>
  )
}