"use client"
import { TableLayout } from "../../global/tableLayout"
import { ViewLayout } from "../../global/viewLayout"
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { useEffect, useState } from "react"
import Spinner from "../../global/spinner"
import  {PendingStatusDropdownMenuCheckboxes} from "./statusEdit"

interface ApiResponse {
    id:number,
    user_id:number,
    title:string,
    lastname:string,
    phone:string,
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

export const Pending_Transactions=({
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
                "Pending Trasactions"
            ]}
        >
            <TableLayout
                tableHeadRow={[
                    "S/N",
                    "Last Name",
                    "Phone",
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
                    "Server Response",
                    "Creation Date",
                    "Actions"
                ]}
                caption={"A List of all pending transactions"}
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
                            lastname,
                            phone,
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
                                        lastname,
                                        phone,
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
                                <TableCell>
                                    <PendingStatusDropdownMenuCheckboxes
                                        id={id}
                                    />
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableLayout>
        </ViewLayout>
    )
}