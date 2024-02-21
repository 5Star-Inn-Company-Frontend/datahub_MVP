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
import { ModifyElectricitymodal } from "./ModifyElectricity";

export interface ElectricityApiObjectType {
    id: number,
    created_at:  string,
    updated_at:  string,
    name: string,
    code10:string,
    code: string,
    discount:string,
    status: number,
    server: number,
}

export interface ElectricityApiArrayType{
    apiParameter:ElectricityApiObjectType[]
}

export const ElectricityService=({
    apiParameter
}: ElectricityApiArrayType)=>{
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
                            "code10",
                            "Code",
                            "Status",
                            "Discount",
                            "Server",
                            "Creation Date"
                        ]}
                        caption={"A list of electricity bills"}
                        hideAction={true}
                    >
                        {
                            apiParameter?.map((info,index)=>{
                                const{
                                    id,
                                    name,
                                    code10,
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
                                                code10,
                                                code,
                                                status,
                                                discount,
                                                server
                                            ].map((bodyInfo,index)=><TableCell key={index}>{bodyInfo}</TableCell>)
                                        }
                                        <TableCell>{new Date(created_at).toLocaleString()}</TableCell>
                                        <TableCell >
                                            <ModifyElectricitymodal
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