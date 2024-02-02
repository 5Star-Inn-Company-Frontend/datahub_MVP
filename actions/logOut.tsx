"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function LogOutUser() {
    const cookieStore = cookies();
    cookieStore.delete("datahubToken");
    redirect("/auth/signin");
}