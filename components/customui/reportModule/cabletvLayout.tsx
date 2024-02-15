"use client";
import {TabsContent} from "@/components/ui/tabs"
import { DataApiObjectType } from "./dataLayout";
import { ReportTable } from "./report_table";

export interface CabletvApiArrayType{
    apiParameter:DataApiObjectType[]
}

export const CableReportLayout =({
    apiParameter
}: CabletvApiArrayType)=>{
    return(
        <TabsContent 
            value="cabletv"
            className="w-full"
        >
            <ReportTable apiParameter={apiParameter}/>
        </TabsContent>
    )
}