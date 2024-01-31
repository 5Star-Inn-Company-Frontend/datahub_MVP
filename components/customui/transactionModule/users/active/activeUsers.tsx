"use client"
import Spinner from "@/components/customui/global/spinner"
import { TableLayout } from "@/components/customui/global/tableLayout"
import { ViewLayout } from "@/components/customui/global/viewLayout"
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { useEffect, useState } from "react"

export interface UserDetailsPropType {
    id:number,
    firstname:string,
    lastname:string,
    address:string,
    phone:string,
    gender:string,
    dob:string,
    email:string,
    email_verified_at:string|null,
    status:number,
    status_reason:string,
    package:string,
    pin:string,
    role_id:number,
    bvn:string|null,
    bank_code:string|null,
    account_name:string|null,
    account_number:string|null,
    created_at:string,
    updated_at:string
  }

interface MyApiInterResponse {
    data: UserDetailsPropType
}

export const Active_Users_Transactions=({
    data
}:MyApiInterResponse)=>{
    const[
        isMounted,
        setIsMounted
    ] = useState(false);
    useEffect(()=>{
        setIsMounted(true)
    },[])
    
    const{
        id,
        firstname,
        lastname,
        address,
        phone,
        gender,
        dob,
        email,
        email_verified_at,
        status,
        status_reason,
        pin,
        role_id,
        bvn,
        bank_code,
        account_name,
        account_number,
        created_at,
        updated_at
    }=data;

    if(!isMounted){
        return <Spinner/>
    }

    return(
        <ViewLayout 
            navs={[
                "All Trasactions",
                "Users",
                "Active"
            ]}
        >
            <TableLayout
                tableHeadRow={[
                    "Id",
                    "Firstname",
                    "Lastname",
                    "Address",
                    "Phone",
                    "Gender",
                    "Date of Birth",
                    "Email",
                    "Email verified at",
                    "Status",
                    "Status Reason",
                    "package",
                    "Pin",
                    "Role Id",
                    "Bvn",
                    "Bank code",
                    "Account Name",
                    "Account Number",
                    "Created At",
                    "Updated At"
                ]}
                caption={"A List of all active users"}
                hideAction={true}
            >
                <TableRow>
                    {
                        [
                            id,
                            firstname,
                            lastname,
                            address,
                            phone,
                            gender,
                            dob,
                            email,
                            email_verified_at,
                            status,
                            status_reason,
                            data?.package,
                            pin,
                            role_id,
                            bvn,
                            bank_code,
                            account_name,
                            account_number
                        ].map((bodyInfo,index)=><TableCell key={index}>{bodyInfo}</TableCell>)
                    }
                    <TableCell>{new Date(created_at).toLocaleString()}</TableCell>
                    <TableCell>{new Date(updated_at).toLocaleString()}</TableCell>
                </TableRow>
            </TableLayout>
        </ViewLayout>
    )
}