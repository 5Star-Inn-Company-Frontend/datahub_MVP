"use server";
import { cookies } from "next/headers";

export async function LogOutUser() {
    const cookieStore = cookies();
    cookieStore.delete("datahubToken");
}