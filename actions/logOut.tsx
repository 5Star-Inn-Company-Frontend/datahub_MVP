"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function LogOutUser() {
    const cookieStore = cookies();
    if(cookieStore.has("datahubToken")){
       
        redirect("/auth/signin");
    }
}