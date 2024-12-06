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
    referee:any,
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
                    "firstname", 
                    "lastname", 
                    "address", 
                    "phone", 
                    "gender", 
                    "dob", 
                    "email",
                    "Referred By",
                    "status", 
                    "status_reason", 
                    "package",
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
                            status, 
                            status_reason,
                            created_at
                        }=info;
                        return(
                            <TableRow key={index}>
                                <TableCell className="font-medium">{index +1}</TableCell>
                                {
                                    [
                                    firstname, 
                                    lastname, 
                                    address, 
                                    phone, 
                                    gender, 
                                    dob, 
                                    email,
                                     `${info.referee.firstname} ${info.referee.lastname} `,
                                    status,
                                    status_reason, 
                                    info.package,
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