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
                    "Created At"
                ]}
                caption={"A List of all active users"}
                hideAction={true}
            >
                <TableRow>
                    {
                        
                        [
                            data?.id,
                            data?.firstname,
                            data?.lastname,
                            data?.address,
                            data?.phone,
                            data?.gender,
                            data?.dob,
                            data?.email,
                            data?.email_verified_at,
                            data?.status,
                            data?.status_reason,
                            data?.package,
                            data?.pin,
                            data?.role_id,
                            data?.bvn,
                            data?.bank_code,
                            data?.account_name,
                            data?.account_number
                        ].map((bodyInfo,index)=><TableCell key={index}>{bodyInfo}</TableCell>)
                    }
                    <TableCell>{data?.created_at && new Date(data?.created_at).toLocaleString()}</TableCell>
                </TableRow>
            </TableLayout>
        </ViewLayout>
    )
}