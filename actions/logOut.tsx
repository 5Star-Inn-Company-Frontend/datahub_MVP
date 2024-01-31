"use server";
import { cookies } from "next/headers";

const cookieStore = cookies();

export async function LogOutUser() {
    cookieStore.delete("datahubToken");
}