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
    id:number,
    user_id:number,
    title:string,
    amount:number,
    charges:number,
    commission:number,
    reference:string,
    recipient:string,
    status:number,
    type:string|null,
    remark:string,
    token:string|null,
    prev_balance:string,
    new_balance:string,
    server:number,
    server_response:string,
    created_at:string,
    updated_at:string
  }

interface MyApiInterResponse {
    data: ApiResponse[]
}

export const Reversed_Transactions=({
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
                "Reversed Transactions"
            ]}
        >
            <TableLayout
                tableHeadRow={[
                    "S/N",
                    "User Id",
                    "Title",
                    "Amount",
                    "Charges",
                    "Commision",
                    "Reference",
                    "Recepient",
                    "Status",
                    "Type",
                    "Remark",
                    "Token",
                    "Previous Balance",
                    "New Balance",
                    "Server",
                    "Creation Date",
                ]}
                caption={"A List of all reversed transactions"}
                hideAction={true}
            >
                {
                    data?.map((info,index)=>{
                        const{
                            id,
                            user_id,
                            title,
                            amount,
                            charges,
                            commission,
                            reference,
                            recipient,
                            status,
                            type,
                            remark,
                            token,
                            prev_balance,
                            new_balance,
                            server,
                            server_response,
                            created_at,
                            updated_at
                        }=info;
                        return(
                            <TableRow key={index}>
                                <TableCell className="font-medium">{index +1}</TableCell>
                                {
                                    [
                                        user_id,
                                        title,
                                        amount,
                                        charges,
                                        commission,
                                        reference,
                                        recipient,
                                        status,
                                        type,
                                        remark,
                                        token,
                                        prev_balance,
                                        new_balance,
                                        server
                                    ].map((bodyInfo,index)=><TableCell key={index}>{bodyInfo}</TableCell>)
                                }
                                <TableCell>{new Date(created_at).toLocaleString()}</TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableLayout>
        </ViewLayout>
    )
}