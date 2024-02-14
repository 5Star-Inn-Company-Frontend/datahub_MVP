"use client"
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { ViewLayout } from "../global/viewLayout"
import { TableLayout } from "../global/tableLayout"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { ModifyAction } from "@/actions/serviceModule/server"
import { ToastAction } from "@/components/ui/toast"
import Spinner from "../global/spinner"

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
                    "Creation Date",
                    "Updated At",
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
                                <TableCell
                                    onClick={()=>{
                                        setIsLoading(true)
                                        ModifyAction(
                                            "airtime2cash",
                                            id,
                                            1
                                        ).then((response)=>{
                                            const{
                                                message,
                                                user
                                            }=response;
                                            setIsLoading(false)
                                            toast({
                                                description:message
                                            })
                                        }).catch((error)=>{
                                            setIsLoading(false)
                                            console.log("error:",error)
                                            toast({
                                                variant: "destructive",
                                                title: "Uh oh! Something went wrong.",
                                                action: <ToastAction altText="Try again">Try again</ToastAction>,
                                            })
                                        })
                                    }}
                                    >enable
                                </TableCell>
                                <TableCell
                                    onClick={()=>{
                                        setIsLoading(true)
                                        ModifyAction(
                                            "airtime2cash",
                                            id,
                                            0
                                        ).then((response)=>{
                                            const{
                                                message,
                                                Airtime2cash
                                            }=response;
                                            setIsLoading(false)
                                            toast({
                                                description:message
                                            })
                                        }).catch((error)=>{
                                            setIsLoading(false)
                                            toast({
                                                variant: "destructive",
                                                title: "Uh oh! Something went wrong.",
                                                description:`${error}`
                                            })
                                            return{
                                                errorMessage:error,
                                            }
                                        })
                                    }}
                                    >disable
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