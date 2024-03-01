"use client"
import { TableLayout } from "../../global/tableLayout"
import { ViewLayout } from "../../global/viewLayout"
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { useEffect, useState } from "react"
import Spinner from "../../global/spinner"
import { StatusDropdownMenuCheckboxes } from "./statusEdit"

interface userInfoProps{
    id: number,
    firstname: string,
    lastname: string,
    address:string,
    phone:string,
    gender: string,
    dob: string,
    email: string,
    email_verified_at: null|string,
    status: number,
    status_reason: null|string,
    package:string,
    pin:string,
    role_id: number,
    bvn: null|string,
    bank_code: null|string,
    account_name: null|string,
    account_number: null|string,
    created_at: string,
    updated_at: string
}

interface subAirtimeToCash {
    id: number,
    reference: string,
    network: string,
    amount: string,
    phoneno:string,
    status: string,
    receiver: string,
    user:userInfoProps,
    user_id: number,
    ip: string,
    device_details: string | null,
    version: string,
    webhook_url:  string | null,
    created_at: string,
    updated_at: string
}

interface AirtimeToCash {
    airtime2cash: subAirtimeToCash
}

interface MyApiInterResponse {
    data:AirtimeToCash[]
}

export const Airtime_To_Cash=({
    data
}:MyApiInterResponse)=>{
    const[
        isLoading,
        setIsLoading
    ] = useState(false);
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
                "Airtime to Cash"
            ]}
        >
            {  
            isLoading?
                <Spinner/>:(
                <TableLayout
                    tableHeadRow={[
                        "S/N",
                        "Network",
                        "Amount",
                        "Phone Number",
                        "Status",
                        "Receiver",
                        "User id",
                        "User First Name",
                        "User email",
                        "User Phone Number",
                        "Creation Date",
                        "Actions"
                    ]}
                    caption={"A List of all your airtime to cash"}
                    hideAction={true}
                >
                    {
                        data?.map((info,index)=>{
                            const{
                                id,
                                network,
                                amount,
                                phoneno,
                                status,
                                user,
                                receiver,
                                created_at
                            }=info?.airtime2cash;
                            return(
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{index +1}</TableCell>
                                    {
                                        [
                                            network,
                                            amount,
                                            phoneno,
                                            status,
                                            receiver,
                                            user?.id,
                                            user?.firstname,
                                            user?.email,
                                            user?.phone
                                        ].map((bodyInfo,index)=><TableCell key={index}>{bodyInfo}</TableCell>)
                                    }
                                    <TableCell>{new Date(created_at).toLocaleString()}</TableCell>
                                    <TableCell>
                                        <StatusDropdownMenuCheckboxes 
                                            id={id}
                                        />
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableLayout>
                )
            }
        </ViewLayout>
    )
}