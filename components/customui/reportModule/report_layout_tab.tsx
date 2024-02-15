"use client";
import {AirtimeReportLayout } from "./airtimeLayout"
import {BettingReportLayout } from "./bettingLayout"
import {CableReportLayout} from "./cabletvLayout"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataApiObjectType, DataReportLayout } from "./dataLayout"
import {ElectricityReportLayout } from "./electricityLayout"
import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export interface ReportLayoutTabPropsType{
    data:DataApiObjectType[],
    airtime:DataApiObjectType[],
    cabletv:DataApiObjectType[],
    electricity:DataApiObjectType[],
    betting:DataApiObjectType[]
}
export const ReportLayoutTab=({
    data,
    airtime,
    cabletv,
    electricity,
    betting
}:ReportLayoutTabPropsType)=>{
    const[
        isMounted,
        setIsMounted
    ]=useState(false);
    useEffect(()=>{
        setIsMounted(true)
    },[])
    return(
        <div>
        <Tabs defaultValue="data" className="w-full">
            <ScrollArea className="w-full whitespace-nowrap">
            <TabsList>
                <TabsTrigger value="data" className=" text-[#ff5718] px-4 py-2 bg-[#fef2f2] rounded me-2">Data</TabsTrigger>
                <TabsTrigger value="airtime" className="text-[#ff5718] px-4 py-2 bg-[#fef2f2] rounded me-2">Airtime</TabsTrigger>
                <TabsTrigger value="cabletv" className="text-[#ff5718] px-4 py-2 bg-[#fef2f2] rounded me-2">Cable Tv</TabsTrigger>
                <TabsTrigger value="electricity" className="text-[#ff5718] px-4 py-2 bg-[#fef2f2] rounded me-2">Electricity</TabsTrigger>
                <TabsTrigger value="betting" className="text-[#ff5718] px-4 py-2 bg-[#fef2f2] rounded">Betting</TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
            </ScrollArea>
            {
                isMounted &&(
                    <>
                        <DataReportLayout
                            apiParameter={data}
                        /> 
                        <AirtimeReportLayout
                            apiParameter={airtime}
                        />
                        <CableReportLayout
                            apiParameter={cabletv}
                        />
                        <ElectricityReportLayout
                            apiParameter={electricity}
                        />
                        <BettingReportLayout
                            apiParameter={betting}
                        />
                    </>
                )
            }
            
        </Tabs>
    </div>
    )
}