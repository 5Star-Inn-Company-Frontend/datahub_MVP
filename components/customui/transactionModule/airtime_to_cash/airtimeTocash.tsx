"use client"
import { TableLayout } from "../../global/tableLayout"
import { ViewLayout } from "../../global/viewLayout"
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { useEffect, useState } from "react"
import Spinner from "../../global/spinner"

interface ApiResponse {
    id: number,
    reference: string,
    network: string,
    amount: string,
    phoneno:string,
    status: string,
    receiver: string,
    user_id: number,
    ip: string,
    device_details: string | null,
    version: string,
    webhook_url:  string | null,
    created_at: string,
    updated_at: string
  }

interface MyApiInterResponse {
    data:ApiResponse[]
}

export const Airtime_To_Cash=({
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
                "Airtiem to Cash"
            ]}
        >
            <TableLayout
                tableHeadRow={[
                    "S/N",
                    "Id",
                    "Reference",
                    "Network",
                    "Amount",
                    "Phone Number",
                    "Status",
                    "Receiver",
                    "user id",
                    "Ip",
                    "Device Details",
                    "Version",
                    "Webhook Url",
                    "Creation Date",
                    "Updated At",
                ]}
                caption={"A List of all your airtime to cash"}
                hideAction={true}
            >
                {
                    data?.map((info,index)=>{
                        const{
                            id,
                            reference,
                            network,
                            amount,
                            phoneno,
                            status,
                            receiver,
                            user_id,
                            ip,
                            device_details,
                            version,
                            webhook_url,
                            created_at,
                            updated_at
                        }=info;
                        return(
                            <TableRow key={index}>
                                <TableCell className="font-medium">{index +1}</TableCell>
                                {
                                    [
                                        id,
                                        reference,
                                        network,
                                        amount,
                                        phoneno,
                                        status,
                                        receiver,
                                        user_id,
                                        ip,
                                        device_details,
                                        version,
                                        webhook_url
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