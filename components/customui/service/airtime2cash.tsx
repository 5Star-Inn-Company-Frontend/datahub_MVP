"use client"
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { ViewLayout } from "../global/viewLayout"
import { TableLayout } from "../global/tableLayout"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import Spinner from "../global/spinner"
import { ModifyAirtime2Cashmodal } from "./ModifyAirtime2Cash"

export interface airtime2cashObjectProp {
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
    data:airtime2cashObjectProp[]
}

export const Airtime_To_CashService=({
    data
}:MyApiInterResponse)=>{
    const[
        isLoading,
        setIsLoading
    ]=useState(false)
    const[
        isMounted,
        setIsMounted
    ] = useState(false);
    const { toast } = useToast()
    useEffect(()=>{
        setIsMounted(true)
    },[])
    
    if(!isMounted){
        return <Spinner/>
    }
    return(
        <ViewLayout 
            navs={[
                "Airtiem to Cash"
            ]}
        >
        {
            isLoading?
            <Spinner/>:(
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
                    "Creation Date"
                ]}
                caption={"A List of airtime to cash"}
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
                            created_at
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
                                <TableCell>
                                    <ModifyAirtime2Cashmodal
                                        id={id}
                                        data={info}
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