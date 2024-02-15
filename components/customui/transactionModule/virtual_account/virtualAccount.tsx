"use client"
import { useEffect, useState } from "react"
import Spinner from "../../global/spinner"
import { TableLayout } from "../../global/tableLayout"
import { ViewLayout } from "../../global/viewLayout"
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { ModifyStatus } from "@/actions/transactionModule/virtual_account/server/action"
import { useToast } from "@/components/ui/use-toast";

interface Users{
    id: number,
    firstname: string,
    lastname: string,
    address: string,
    phone: string,
    gender: string,
    dob: string,
    email: string,
    email_verified_at:string |null,
    status: number,
    status_reason: string | null,
    package:string,
    pin: string,
    bvn:string| null,
    bank_code: null,
    account_name: null,
    account_number: null,
    created_at: string| null,
    updated_at: string| null
}
interface ApiResponse {
    id:number,
    user_id:number,
    reference:string,
    status:string,
    created_at:string,
    updated_at:string,
    account_name:string,
    account_number: string,
    provider: string,
    domain: string,
    assignment: string,
    user:Users
}

interface MyApiInterResponse {
   data: ApiResponse[]
}

export const Vitual_Account_Transactions=({
    data
}:MyApiInterResponse)=>{
    const { toast } = useToast()
    const[
        isMounted,
        setIsMounted
    ] = useState(false);
    const[
        isLoading,
        setIsLoading
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
                "Virtual Account"
            ]}
        >
            {  
            isLoading?
                <Spinner/>:(
                    <TableLayout
                        tableHeadRow={[
                            "S/N",
                            "User Id",
                            "Status",
                            "Account Name",
                            "Account Number",
                            "Provider",
                            "Domain",
                            "Assignment",
                            "User First Name",
                            "User Last Name",
                            "User Phone",
                            "User Email",
                            "User Account Name",
                            "User Account Number",
                            "Creation Date",
                        ]}
                        caption={"A List of all virtual account transactions"}
                        hideAction={true}
                    >
                        {
                            data?.map((info,index)=>{
                                const{
                                    user_id,
                                    status,
                                    account_name,
                                    account_number,
                                    provider,
                                    domain,
                                    assignment,
                                    user,
                                    created_at
                                }=info;
                                return(
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{index +1}</TableCell>
                                        {
                                            [
                                                user_id,
                                                status,
                                                account_name,
                                                account_number,
                                                provider,
                                                domain,
                                                assignment,
                                                user?.firstname,
                                                user?.lastname,
                                                user?.phone,
                                                user?.email,
                                                user?.account_name,
                                                user?.account_number
                                            ].map((bodyInfo,index)=><TableCell key={index}>{bodyInfo}</TableCell>)
                                        }
                                        <TableCell>{new Date(created_at).toLocaleString()}</TableCell>
                                        <TableCell
                                            className={status==="active"?"text-danger":"text-success"}
                                            onClick={()=>{
                                                let modifystatusto:string = status==="active"?"0":"1"
                                                setIsLoading(true)
                                                ModifyStatus(
                                                    modifystatusto
                                                ).then((response)=>{
                                                    const{
                                                        message
                                                    }=response;
                                                    setIsLoading(false)
                                                    toast({
                                                        description:message
                                                    })
                                                }).catch((error)=>{
                                                    setIsLoading(false)
                                                    toast({
                                                        variant: "destructive",
                                                        title: "Uh oh! Something went wrong.",
                                                        description:`${error}`
                                                    })
                                                    return{
                                                        errorMessage:error,
                                                    }
                                                })
                                            }}
                                            >{status==="active"?"Deactivate":"Activate"}
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