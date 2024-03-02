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
    firstname:string, 
    lastname:string, 
    address:string, 
    phone:string, 
    gender:string, 
    dob:string, 
    email:string, 
    referer_id:string | null, 
    email_verified_at:string | null, 
    status:number, 
    status_reason:string, 
    package:string, 
    pin:string, 
    role_id:number, 
    bvn:string | null, 
    bank_code:string | null, 
    account_name:string | null, 
    account_number:string | null, 
    created_at:string, 
    updated_at:string
}

export const Referers_Transactions=({
    data
}:{data:ApiResponse[]})=>{
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
                "Referers"
            ]}
        >
            <div>
            <TableLayout
                tableHeadRow={[
                    "S/N",
                    "id",
                    "firstname", 
                    "lastname", 
                    "address", 
                    "phone", 
                    "gender", 
                    "dob", 
                    "email", 
                    "referer_id", 
                    "email_verified_at", 
                    "status", 
                    "status_reason", 
                    "package", 
                    "pin", 
                    "role_id", 
                    "bvn", 
                    "bank_code", 
                    "account_name", 
                    "account_number", 
                    "created_at"
                    
                ]}
                caption={"A List of all reversed transactions"}
                hideAction={true}
            >
                {
                    data?.map((info,index)=>{
                        const{
                            id,
                            firstname, 
                            lastname, 
                            address, 
                            phone, 
                            gender, 
                            dob, 
                            email, 
                            referer_id, 
                            email_verified_at, 
                            status, 
                            status_reason,
                            pin, 
                            role_id, 
                            bvn, 
                            bank_code, 
                            account_name, 
                            account_number, 
                            created_at
                        }=info;
                        return(
                            <TableRow key={index}>
                                <TableCell className="font-medium">{index +1}</TableCell>
                                {
                                    [
                                    id,
                                    firstname, 
                                    lastname, 
                                    address, 
                                    phone, 
                                    gender, 
                                    dob, 
                                    email, 
                                    referer_id, 
                                    email_verified_at, 
                                    status, 
                                    status_reason, 
                                    info.package, 
                                    pin, 
                                    role_id, 
                                    bvn, 
                                    bank_code, 
                                    account_name, 
                                    account_number
                                    ]?.map((bodyInfo,index)=><TableCell key={index}>{bodyInfo}</TableCell>)
                                }
                                <TableCell>{new Date(created_at).toLocaleString()}</TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableLayout>
            </div>
        </ViewLayout>
    )
}