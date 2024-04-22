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
import { ModifyDatamodal } from "./ModifyData";

export interface DataApiObjectType {
    id: number,
    price:string,
    network: string,
    name:string,
    coded:string,
    category:string,
    network_code:string|null,
    dataplan:string,
    plan_id:string,
    note:string|null,
    amount:number,
    created_at:  string,
    updated_at:  string,
    discount?:string,
    status: number,
    server: string,
}

export interface DataApiArrayType{
    apiParameter:DataApiObjectType[]
}

export const DataService=({
    apiParameter
}: DataApiArrayType)=>{
    const[
        isLoading,
        setIsLoading
    ]=useState(false)
    const[
        isMounted,
        setIsMounted
    ] = useState(false);
    const { toast } = useToast()
    const[
        querydata,
        setquerydata
    ]=useState<DataApiObjectType[]>([]);

    const handleChange =(e:string)=>{
        const queryResponse = apiParameter?.filter((resp)=>resp.category.toLowerCase().includes(e?.toLowerCase()) || resp.network.toLowerCase().includes(e?.toLowerCase()))
        setquerydata(queryResponse)
    }
    useEffect(()=>{
        setquerydata(apiParameter)
    },[apiParameter])
    
    useEffect(()=>{
        setIsMounted(true)
    },[])
    
    if(!isMounted){
        return <Spinner/>
    }
    return(
    <ViewLayout 
        navs={[
            "Data"
        ]}
        >
            {
                isLoading?
                <Spinner/>:(
                        <TableLayout
                            tableHeadRow={[
                                "S/N",
                                // "Id",
                                "Network",
                                "Name",
                                // "coded",
                                "Category",
                                // "network_code",
                                // "dataplan",
                                // "plan_id",
                                "Note",
                                " Price",
                                "Selling Price",
                                "Status",
                                // "Discount",
                                // "Server",
                                "Creation Date"
                            ]}
                            caption={"A list of data"}
                            handleChange={handleChange}
                        >
                            {
                                querydata?.map((info,index)=>{
                                    const{
                                        id,
                                        network,
                                        name,
                                        price,
                                        coded,
                                        category,
                                        network_code,
                                        dataplan,
                                        plan_id,
                                        note,
                                        amount,
                                        discount,
                                        server,
                                        status,
                                        created_at
                                    }=info;
                                    return(
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{index +1}</TableCell>
                                            {
                                                [
                                                    // id,
                                                    network,
                                                    name,
                                                    // coded,
                                                    category,
                                                    // network_code,
                                                    // dataplan,
                                                    // plan_id,
                                                    note,
                                                    price,
                                                    amount,
                                                    status
                                                    // discount,
                                                    // server
                                                ].map((bodyInfo,index)=><TableCell key={index}>{bodyInfo}</TableCell>)
                                            }
                                            <TableCell>{new Date(created_at).toLocaleString()}</TableCell>
                                            <TableCell>
                                                    <ModifyDatamodal
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