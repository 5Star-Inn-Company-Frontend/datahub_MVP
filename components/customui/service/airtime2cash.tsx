"use client"
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { ViewLayout } from "../global/viewLayout"
import { TableLayout } from "../global/tableLayout"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import Spinner from "../global/spinner"
import { ModifyAirtime2Cashmodal } from "./ModifyAirtime2Cash"

export interface airtime2cashObjectProp {
    id: number,
    network: string,
    number:string,
    status: number,
    discount:number,
    created_at: string,
    updated_at: string
  }

interface MyApiInterResponse {
    data:airtime2cashObjectProp[]
}

export const Airtime_To_CashService=({
    data
}:MyApiInterResponse)=>{
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
                "Airtime to Cash"
            ]}
        >
        {
            isLoading?
            <Spinner/>:(
            <TableLayout
                tableHeadRow={[
                    "S/N",
                    "Network",
                    "Phone Number",
                    "Discount",
                    "Status",
                    "Creation Date"
                ]}
                caption={"A List of airtime to cash"}
                hideAction={true}
            >
                {
                    data?.map((info,index)=>{
                        const{
                            id,
                            network,
                            number,
                            discount,
                            status,
                            created_at
                        }=info;
                        return(
                            <TableRow key={index}>
                                <TableCell className="font-medium">{index +1}</TableCell>
                                {
                                    [
                                        network,
                                        number,
                                        discount,
                                        status
                                    ].map((bodyInfo,index)=><TableCell key={index}>{bodyInfo}</TableCell>)
                                }
                                <TableCell>{new Date(created_at).toLocaleString()}</TableCell>
                                <TableCell>
                                    <ModifyAirtime2Cashmodal
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