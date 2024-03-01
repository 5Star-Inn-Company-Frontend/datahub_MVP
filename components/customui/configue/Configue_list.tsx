"use client"
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { ViewLayout } from "../global/viewLayout"
import { TableLayout } from "../global/tableLayout"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import Spinner from "../global/spinner"
import {ModifyConfigue} from "./modify_configue"

export interface configObjectProp {
    id: number,
    name: string,
    charges:number,
    description: string,
    ppkey:string,
    status:number,
    created_at: string,
    updated_at: string
  }

interface MyApiInterResponse {
    data:configObjectProp[]
}

export const ConfigueList=({
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
                "Config"
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
                    "Charges",
                    "Description",
                    "PPkey",
                    "Status",
                    "Creation date",
                    "Action"
                ]}
                caption={"A List of all configue"}
                hideAction={true}
            >
                {
                    data?.map((info,index)=>{
                        const{
                            id,
                            name,
                            charges,
                            description,
                            ppkey,
                            status,
                            created_at
                        }=info;
                        return(
                            <TableRow key={index}>
                                <TableCell className="font-medium">{index +1}</TableCell>
                                {
                                    [
                                        id,
                                        name,
                                        charges,
                                        description,
                                        ppkey,
                                        status
                                    ].map((bodyInfo,index)=><TableCell key={index}>{bodyInfo}</TableCell>)
                                }
                                <TableCell>{new Date(created_at).toLocaleString()}</TableCell>
                                <TableCell>
                                    <ModifyConfigue
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