"use client";
import { AirtimeApiObjectType, AirtimeReportLayout } from "./airtimeLayout"
import { BettingApiObjectType, BettingReportLayout } from "./bettingLayout"
import { CableReportLayout, CabletvApiObjectType } from "./cabletvLayout"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataApiObjectType, DataReportLayout } from "./dataLayout"
import { ElectricityApiObjectType, ElectricityReportLayout } from "./electricityLayout"
import { useEffect, useState } from "react";

export interface ReportLayoutTabPropsType{
    data:DataApiObjectType[],
    airtime:AirtimeApiObjectType[],
    cabletv:CabletvApiObjectType[],
    electricity:ElectricityApiObjectType[],
    betting:BettingApiObjectType[]
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
            <TabsList>
                <TabsTrigger value="data" className=" text-[#ff5718] px-4 py-2 bg-[#fef2f2] rounded me-2">Data</TabsTrigger>
                <TabsTrigger value="airtime" className="text-[#ff5718] px-4 py-2 bg-[#fef2f2] rounded me-2">Airtime</TabsTrigger>
                <TabsTrigger value="cabletv" className="text-[#ff5718] px-4 py-2 bg-[#fef2f2] rounded me-2">Cable Tv</TabsTrigger>
                <TabsTrigger value="electricity" className="text-[#ff5718] px-4 py-2 bg-[#fef2f2] rounded me-2">Electricity</TabsTrigger>
                <TabsTrigger value="betting" className="text-[#ff5718] px-4 py-2 bg-[#fef2f2] rounded">Betting</TabsTrigger>
            </TabsList>
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