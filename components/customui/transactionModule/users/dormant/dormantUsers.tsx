"use client"
import Spinner from "@/components/customui/global/spinner"
import { TableLayout } from "@/components/customui/global/tableLayout"
import { ViewLayout } from "@/components/customui/global/viewLayout"
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { useEffect, useState } from "react"
import { UserDetailsPropType } from "../active/activeUsers"

interface dormantResponseType{
    user_details: UserDetailsPropType |null
}
interface MyApiInterResponse {
    data: dormantResponseType[]
}

export const Dormant_Users_Transactions=({
    data
}:MyApiInterResponse)=>{
    const[
        isMounted,
        setIsMounted
    ] = useState(false);
    useEffect(()=>{
        setIsMounted(true)
    },[])
    
    let naira = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'NGN',
    });
    
    if(!isMounted){
        return <Spinner/>
    }
    return(
        <ViewLayout 
            navs={[
                "All Trasactions",
                "Users",
                "Dormant"
            ]}
        >
            <TableLayout
                tableHeadRow={[
                    "S/N",
                "Firstname",
                "Lastname",
                "Wallet Balance",
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
                caption={"A List of all dormant users"}
                hideAction={true}
            >
                {
                    data?.map((info,index)=>{
                        if(info?.user_details){
                        const{
                            firstname,
                            lastname,
                            wallet_balance,
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
                            created_at
                        }=info?.user_details;
                        return(
                            <TableRow key={index}>
                                <TableCell className="font-medium">{index +1}</TableCell>
                                {
                                    [
                                        firstname,
                                        lastname,
                                        `${naira.format(wallet_balance?.balance)}`,
                                        address,
                                        phone,
                                        gender,
                                        dob,
                                        email,
                                        email_verified_at,
                                        status,
                                        status_reason,
                                        info?.user_details?.package,
                                        pin,
                                        role_id,
                                        bvn,
                                        bank_code,
                                        account_name,
                                        account_number
                                    ].map((bodyInfo,index)=><TableCell key={index}>{bodyInfo}</TableCell>)
                                }
                                <TableCell>{new Date(created_at).toLocaleString()}</TableCell>
                            </TableRow>
                        )
                        }
                    })
                }
            </TableLayout>
        </ViewLayout>
    )
}