"use client";
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { TableLayout } from "../global/tableLayout"
import { ViewLayout } from "../global/viewLayout";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Spinner from "../global/spinner"
import { ModifyBettingmodal } from "./ModifyBetting";

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
                            // "Id",
                            "Name",
                            "Code",
                            "Status",
                            "Discount",
                            // "Server",
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
                                                // id,
                                                name,
                                                code,
                                                status,
                                                discount
                                                // server
                                            ].map((bodyInfo,index)=><TableCell key={index}>{bodyInfo}</TableCell>)
                                        }
                                        <TableCell>{new Date(created_at).toLocaleString()}</TableCell>
                                        <TableCell>
                                            <ModifyBettingmodal
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