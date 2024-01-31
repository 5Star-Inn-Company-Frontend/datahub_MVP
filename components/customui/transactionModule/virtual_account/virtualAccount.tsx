"use client"
import { useEffect, useState } from "react"
import Spinner from "../../global/spinner"
import { TableLayout } from "../../global/tableLayout"
import { ViewLayout } from "../../global/viewLayout"
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"

interface Users{
    id: number,
    firstname: string,
    lastname: string,
    address: string,
    phone: string,
    gender: string,
    dob: string,
    email: string,
    email_verified_at:string |null,
    status: number,
    status_reason: string | null,
    package:string,
    pin: string,
    bvn:string| null,
    bank_code: null,
    account_name: null,
    account_number: null,
    created_at: string| null,
    updated_at: string| null
}
interface ApiResponse {
    id:number,
    user_id:number,
    reference:string,
    status:string,
    created_at:string,
    updated_at:string,
    account_name:string,
    account_number: string,
    provider: string,
    domain: string,
    assignment: string,
    user:Users
}

interface MyApiInterResponse {
   data: ApiResponse[]
}

export const Vitual_Account_Transactions=({
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
                "Virtual Account"
            ]}
        >
            <TableLayout
                tableHeadRow={[
                    "S/N",
                    "Id",
                    "User Id",
                    "Reference",
                    "Status",
                    "Account Name",
                    "Account Number",
                    "Provider",
                    "Domain",
                    "Assignment",
                    "User Id",
                    "User First Name",
                    "User Last Name",
                    "User Address",
                    "User Phone",
                    "User Gender",
                    "User date of Birth",
                    "User Email",
                    "User status",
                    "User Status Reason",
                    "user Package",
                    "User Pin",
                    "User BVN",
                    "User bank Code",
                    "User Account Name",
                    "User Account Number",
                    "Creation Date",
                    "Updated At",
                ]}
                caption={"A List of all virtual account transactions"}
                hideAction={true}
            >
                {
                    data?.map((info,index)=>{
                        const{
                            id,
                            user_id,
                            reference,
                            status,
                            account_name,
                            account_number,
                            provider,
                            domain,
                            assignment,
                            user,
                            created_at,
                            updated_at
                        }=info;
                        return(
                            <TableRow key={index}>
                                <TableCell className="font-medium">{index +1}</TableCell>
                                {
                                    [
                                        id,
                                        user_id,
                                        reference,
                                        status,
                                        account_name,
                                        account_number,
                                        provider,
                                        domain,
                                        assignment,
                                        user?.id,
                                        user?.firstname,
                                        user?.lastname,
                                        user?.address,
                                        user?.phone,
                                        user?.gender,
                                        user?.dob,
                                        user?.email,
                                        user?.status,
                                        user?.status_reason,
                                        user?.package,
                                        user?.pin,
                                        user?.bvn,
                                        user?.bank_code,
                                        user?.account_name,
                                        user?.account_number
                                    ].map((bodyInfo,index)=><TableCell key={index}>{bodyInfo}</TableCell>)
                                }
                                <TableCell>{new Date(created_at).toLocaleString()}</TableCell>
                                <TableCell>{new Date(updated_at).toLocaleString()}</TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableLayout>
        </ViewLayout>
    )
}