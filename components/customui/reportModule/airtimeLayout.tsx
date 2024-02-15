"use client";
import {TabsContent} from "@/components/ui/tabs"
import { DataApiObjectType } from "./dataLayout";
import { ReportTable } from "./report_table";

export interface AirtimeApiArrayType{
    apiParameter:DataApiObjectType[]
}

export const AirtimeReportLayout =({
    apiParameter
}: AirtimeApiArrayType)=>{
    return(
        <TabsContent 
            value="airtime"
            className="w-full"
        >
           <ReportTable apiParameter={apiParameter}/>
        </TabsContent>
    )
}