"use client";
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { TableLayout } from "../global/tableLayout"
import { ViewLayout } from "../global/viewLayout";
import { ModifyAction } from "@/actions/serviceModule/server";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Spinner from "../global/spinner";
import { ToastAction } from "@/components/ui/toast";

export interface AirtimeApiObjectType {
    id: number,
    network: string,
    created_at:  string,
    updated_at:  string,
    discount:string,
    status: number,
    server: string,
}

export interface AirtimeApiArrayType{
    apiParameter:AirtimeApiObjectType[]
}
export const AirtimeService=({
    apiParameter
}: AirtimeApiArrayType)=>{
    const[
        isLoading,
        setIsLoading
    ]=useState(false);
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
            "Airtime"
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
                                "Status",
                                "Discount",
                                "Server",
                                "Creation Date",
                                "Updated At",
                                "Action"
                            ]}
                            caption={"A list of your airtime"}
                            hideAction={true}
                        >
                            {
                                apiParameter?.map((info,index)=>{
                                    const{
                                        id,
                                        network,
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
                                                        "airtime",
                                                        id,
                                                        modifystatusto
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