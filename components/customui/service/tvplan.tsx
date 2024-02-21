"use client";
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { TableLayout } from "../global/tableLayout"
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ViewLayout } from "../global/viewLayout";
import Spinner from "../global/spinner"
import { ModifyTvPlanmodal } from "./ModifyTvplan";

export interface CabletvApiObjectType {
    id: number,
    created_at:  string,
    updated_at:  string,
    name: string,
    code: string,
    coded:string,
    price:string,
    type:string,
    discount:string,
    status: number,
    server: number,
}

export interface CabletvApiArrayType{
    apiParameter:CabletvApiObjectType[]
}

export const TvService =({
    apiParameter
}: CabletvApiArrayType)=>{
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
                            "coded",
                            "price",
                            "type",
                            "Code",
                            "Status",
                            "Discount",
                            "Server",
                            "Creation Date"
                        ]}
                        caption={"A list of tv plans"}
                        hideAction={true}
                    >
                        {
                            apiParameter?.map((info,index)=>{
                                const{
                                    id,
                                    name,
                                    coded,
                                    price,
                                    type,
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
                                                coded,
                                                price,
                                                type,
                                                code,
                                                status,
                                                discount,
                                                server
                                            ].map((bodyInfo,index)=><TableCell key={index}>{bodyInfo}</TableCell>)
                                        }
                                        <TableCell>{new Date(created_at).toLocaleString()}</TableCell>
                                        <TableCell>
                                            <ModifyTvPlanmodal
                                                data={info}
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