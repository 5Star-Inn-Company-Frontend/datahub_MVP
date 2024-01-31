"use client"
import { useState } from "react"
import { Reportlayout } from "../report_Layout"
import { ReportLayoutTab, ReportLayoutTabPropsType } from "../report_layout_tab"

export const DailyReport =()=>{
    const[
        tabContent,
        setTabcontent
    ]=useState<ReportLayoutTabPropsType>({
        data:[],
        airtime: [],
        cabletv:[],
        electricity:[],
        betting:[]
    })
    return(
        <div className="h-full w-full overflow-auto">
            <Reportlayout 
                title="Daily"
                setTabcontent={setTabcontent}
            >
                <ReportLayoutTab
                    data={tabContent.data}
                    airtime={tabContent.airtime}
                    cabletv={tabContent.cabletv}
                    electricity={tabContent.electricity}
                    betting={tabContent.betting}
                />
            </Reportlayout>
        </div>
    )
}