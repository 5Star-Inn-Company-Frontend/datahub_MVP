"use client"
import { TableLayout } from "../../global/tableLayout"
import { ViewLayout } from "../../global/viewLayout"
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { useEffect, useState } from "react"
import Spinner from "../../global/spinner"
import { useToast } from "@/components/ui/use-toast";
import { ModifyStatus } from "@/actions/transactionModule/virtual_account/server/action"

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

interface ApiResponse {
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

interface MyApiInterResponse {
    data:ApiResponse[]
}

export const Airtime_To_Cash=({
    data
}:MyApiInterResponse)=>{
    const { toast } = useToast()
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
                        "User email",
                        "User Phone Number",
                        "Creation Date"
                    ]}
                    caption={"A List of all your airtime to cash"}
                    hideAction={true}
                >
                    {
                        data?.map((info,index)=>{
                            const{
                                network,
                                amount,
                                phoneno,
                                status,
                                user,
                                receiver,
                                created_at
                            }=info;
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
                                            user?.email,
                                            user?.phone,
                                            created_at
                                        ].map((bodyInfo,index)=><TableCell key={index}>{bodyInfo}</TableCell>)
                                    }
                                    <TableCell>{new Date(created_at).toLocaleString()}</TableCell>
                                    <TableCell
                                            className={`${status==="active"?"text-danger":"text-success"} cursor-auto`}
                                            onClick={()=>{
                                                let modifystatusto:string = status==="active"?"0":"1"
                                                setIsLoading(true)
                                                ModifyStatus(
                                                    modifystatusto
                                                ).then((response)=>{
                                                    const{
                                                        message
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
                                            >{status==="active"?"Deactivate":"Activate"}
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