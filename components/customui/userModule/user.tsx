"use client"
import Spinner from "@/components/customui/global/spinner"
import { TableLayout } from "@/components/customui/global/tableLayout"
import { ViewLayout } from "@/components/customui/global/viewLayout"
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { useEffect, useState } from "react"
import { transactionApiInterResponse } from "../transactionModule/all_transactions/allTransactions"

export const Users_Transactions=({
    data
}:transactionApiInterResponse)=>{
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
                "User",
                "All transactions"
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
                    "Server Response",
                    "Creation Date"
                ]}
                caption={"A List of user transactions"}
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
                            created_at
                        }=info;
                        return(
                            <TableRow key={index}>
                                <TableCell className="font-medium">{index +1}</TableCell>
                                {
                                    [
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