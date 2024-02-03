"use client";
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { TableLayout } from "../global/tableLayout"
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ModifyAction } from "@/actions/serviceModule/server";
import { ViewLayout } from "../global/viewLayout";
import { ToastAction } from "@/components/ui/toast";
import Spinner from "../global/spinner"

export interface ElectricityApiObjectType {
    id: number,
    created_at:  string,
    updated_at:  string,
    name: string,
    code10:string,
    code: string,
    discount:string,
    status: number,
    server: number,
}

export interface ElectricityApiArrayType{
    apiParameter:ElectricityApiObjectType[]
}

export const ElectricityService=({
    apiParameter
}: ElectricityApiArrayType)=>{
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
            "Electricity"
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
                            "code10",
                            "Code",
                            "Status",
                            "Discount",
                            "Server",
                            "Creation Date",
                            "Updated At",
                        ]}
                        caption={"A list of electricity bills"}
                        hideAction={true}
                    >
                        {
                            apiParameter?.map((info,index)=>{
                                const{
                                    id,
                                    name,
                                    code10,
                                    discount,
                                    server,
                                    status,
                                    code,
                                    created_at,
                                    updated_at
                                }=info;
                                return(
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{index +1}</TableCell>
                                        {
                                            [
                                                id,
                                                name,
                                                code10,
                                                code,
                                                status===1?"enabled":"disabled",
                                                discount,
                                                server
                                            ].map((bodyInfo,index)=><TableCell key={index}>{bodyInfo}</TableCell>)
                                        }
                                        <TableCell>{new Date(created_at).toLocaleString()}</TableCell>
                                        <TableCell>{new Date(updated_at).toLocaleString()}</TableCell>
                                        <TableCell
                                            onClick={()=>{
                                                let modifystatusto:number = status===1?0:1
                                                setIsLoading(true)
                                                ModifyAction(
                                                    "electricity",
                                                    id,
                                                    modifystatusto
                                                ).then((response)=>{
                                                    const{
                                                        message,
                                                        // Electricity plans
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