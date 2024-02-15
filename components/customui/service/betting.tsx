"use client";
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { TableLayout } from "../global/tableLayout"
import { ViewLayout } from "../global/viewLayout";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ModifyAction } from "@/actions/serviceModule/server";
import { ToastAction } from "@/components/ui/toast";
import Spinner from "../global/spinner"

export interface  BettingApiObjectType {
    id: number,
    created_at:  string,
    updated_at:  string,
    name: string,
    code: string,
    discount:string,
    status: number,
    server: number,
}

export interface BettingApiArrayType{
    apiParameter:BettingApiObjectType[]
}

export const BettingService =({
    apiParameter
}: BettingApiArrayType)=>{
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
            "Betting"
        ]}
        >
            {
                isLoading?
                <Spinner/>:(
                    <TableLayout
                        tableHeadRow={[
                            "S/N",
                            "Id",
                            "Name",
                            "Code",
                            "Status",
                            "Discount",
                            "Server",
                            "Creation Date"
                        ]}
                        caption={"A list of bettings"}
                        hideAction={true}
                    >
                        {
                            apiParameter?.map((info,index)=>{
                                const{
                                    id,
                                    name,
                                    discount,
                                    server,
                                    status,
                                    code,
                                    created_at
                                }=info;
                                return(
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{index +1}</TableCell>
                                        {
                                            [
                                                id,
                                                name,
                                                code,
                                                status===1?"enabled":"disabled",
                                                discount,
                                                server
                                            ].map((bodyInfo,index)=><TableCell key={index}>{bodyInfo}</TableCell>)
                                        }
                                        <TableCell>{new Date(created_at).toLocaleString()}</TableCell>
                                        <TableCell
                                            onClick={()=>{
                                                let modifystatusto:number = status===1?0:1
                                                setIsLoading(true)
                                                ModifyAction(
                                                    "betting",
                                                    id,
                                                    modifystatusto
                                                ).then((response)=>{
                                                    const{
                                                        message,
                                                        // Betting plans
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
                                            >{status===1?"disable":"enable"}
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