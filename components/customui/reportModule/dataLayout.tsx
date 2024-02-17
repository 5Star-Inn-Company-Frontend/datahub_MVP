"use client";
import {TabsContent} from "@/components/ui/tabs"
import { ReportTable } from "./report_table";

export interface DataApiObjectType {
    id: number,
    price:string,
    user_id:number,
    title:string,
    charges:number,
    commission:number,
    reference:string,
    recipient:string,
    type:string,
    transaction_type:string,
    remark:string,
    token:string|null,
    prev_balance: string;
    new_balance: string;
    server: number;
    server_response: string;
    created_at: string;
    amount:number|string,
    status: number,
}

export interface DataApiArrayType{
    apiParameter:DataApiObjectType[]
}

export const DataReportLayout =({
    apiParameter
}: DataApiArrayType)=>{
    return(
        <TabsContent 
            value="data"
            className="w-full"
        >
           <ReportTable apiParameter={apiParameter}/>
        </TabsContent>
    )
}