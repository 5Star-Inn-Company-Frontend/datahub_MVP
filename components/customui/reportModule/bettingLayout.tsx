"use client";
import {TabsContent} from "@/components/ui/tabs"
import { DataApiObjectType } from "./dataLayout";
import { ReportTable } from "./report_table";

export interface BettingApiArrayType{
    apiParameter:DataApiObjectType[]
}

export const BettingReportLayout =({
    apiParameter
}: BettingApiArrayType)=>{
    return(
        <TabsContent 
            value="betting"
            className="w-full"
        >
            <ReportTable apiParameter={apiParameter}/>
        </TabsContent>
    )
}