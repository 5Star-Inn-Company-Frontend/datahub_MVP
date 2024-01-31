"use client"
import { useState } from "react"
import { ViewLayout } from "../../global/viewLayout"
import { Reportlayout } from "../report_Layout"
import { ReportLayoutTab, ReportLayoutTabPropsType } from "../report_layout_tab"

export const MonthlyReport =()=>{
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
        <ViewLayout 
            navs={[
                "Report",
                "Monthly"
            ]}
        >
            <div className="bg-white rounded p-4">
                <Reportlayout 
                    title="Monthly"
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
        </ViewLayout>
    )
}