"use client";
import {TabsContent} from "@/components/ui/tabs"
import { DataApiObjectType } from "./dataLayout";
import { ReportTable } from "./report_table";

export interface ElectricityApiArrayType{
    apiParameter:DataApiObjectType[]
}

export const ElectricityReportLayout =({
    apiParameter
}: ElectricityApiArrayType)=>{
    return(
        <TabsContent 
            value="electricity"
            className="w-full"
        >
           <ReportTable apiParameter={apiParameter}/>
        </TabsContent>
    )
}