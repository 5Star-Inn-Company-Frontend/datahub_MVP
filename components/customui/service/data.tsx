"use client";
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { TableLayout } from "../global/tableLayout"
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ViewLayout } from "../global/viewLayout";
import { ModifyAction } from "@/actions/serviceModule/server";
import { ToastAction } from "@/components/ui/toast";
import Spinner from "../global/spinner"

export interface DataApiObjectType {
    id: number,
    price:string,
    network: string,
    name:string,
    coded:string,
    category:string,
    network_code:string|null,
    dataplan:string,
    plan_id:string,
    note:string|null,
    amount:number|string,
    created_at:  string,
    updated_at:  string,
    discount?:string,
    status: number,
    server: string,
}

export interface DataApiArrayType{
    apiParameter:DataApiObjectType[]
}

export const DataService=({
    apiParameter
}: DataApiArrayType)=>{
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
            "Data"
        ]}
        >
            {
                isLoading?
                <Spinner/>:(
                        <TableLayout
                            tableHeadRow={[
                                "S/N",
                                "Id",
                                "Network",
                                "Name",
                                " price",
                                "coded",
                                "category",
                                "network_code",
                                "dataplan",
                                "plan_id",
                                "note",
                                "amount",
                                "Status",
                                "Discount",
                                "Server",
                                "Creation Date",
                                "Updated At",
                            ]}
                            caption={"A list of data"}
                            hideAction={true}
                        >
                            {
                                apiParameter?.map((info,index)=>{
                                    const{
                                        id,
                                        network,
                                        name,
                                        price,
                                        coded,
                                        category,
                                        network_code,
                                        dataplan,
                                        plan_id,
                                        note,
                                        amount,
                                        discount,
                                        server,
                                        status,
                                        created_at,
                                        updated_at
                                    }=info;
                                    return(
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{index +1}</TableCell>
                                            {
                                                [
                                                    id,
                                                    network,
                                                    name,
                                                    price,
                                                    coded,
                                                    category,
                                                    network_code,
                                                    dataplan,
                                                    plan_id,
                                                    note,
                                                    amount,
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
                                                        "data",
                                                        id,
                                                        modifystatusto
                                                    ).then((response)=>{
                                                        const{
                                                            message,
                                                            Dataplan
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
                                                            description:error,
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