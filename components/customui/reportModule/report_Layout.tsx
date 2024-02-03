"use client"
 
import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Text } from "../text"
import { ReportLayoutTabPropsType } from "./report_layout_tab"
import { getDailyReport } from "@/actions/reportModule/daily_report"
import { getMonthlyReport } from "@/actions/reportModule/monthly_report"
import { getYearlyReport } from "@/actions/reportModule/yearlyReport"
import Spinner from "../global/spinner"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

interface PropType{
    children: React.ReactNode,
    title:string,
    setTabcontent:React.Dispatch<React.SetStateAction<ReportLayoutTabPropsType>>
}
export const Reportlayout =({children,title,setTabcontent}:PropType)=>{
    const [date, setDate] = React.useState<Date>()
    const[ isLoading, setIsLoading] = React.useState(false)
    const {toast} = useToast();
    return(
        <div className="w-full">
            <div className="flex flex-row justify-between items-center pb-4">
                <Text
                    style="text-black text-md font-semibold"
                    value={`${title} Report`}
                />
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                        variant={"outline"}
                        className={cn(
                            "w-[240px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                        >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(date)=>{
                            if(date){
                                const withHyphens = [new Date(date).getFullYear(),new Date(date).getMonth()+1,new Date(date).getDate()].join('-')
                                switch(title){
                                    case "Daily":
                                        setIsLoading(true)
                                        getDailyReport(withHyphens).then((response)=>{
                                            setTabcontent(response)
                                            setIsLoading(false)
                                        }).catch((error)=>{
                                            setIsLoading(false)
                                            console.log("error:",error)
                                            toast({
                                                variant: "destructive",
                                                title: "Uh oh! Something went wrong.",
                                                action: <ToastAction altText="Try again">Try again</ToastAction>,
                                            })
                                        })
                                    break;
                                    case "Monthly":
                                        setIsLoading(true)
                                        getMonthlyReport(`${new Date(date).getMonth()+1}`).then((response)=>{
                                            setTabcontent(response)
                                            setIsLoading(false)
                                        }).catch((error)=>{
                                            setIsLoading(false)
                                             console.log("error:",error)
                                            toast({
                                                variant: "destructive",
                                                title: "Uh oh! Something went wrong.",
                                                action: <ToastAction altText="Try again">Try again</ToastAction>,
                                            })
                                        })
                                    break;
                                    default:
                                        setIsLoading(true)
                                        getYearlyReport(`${new Date(date).getFullYear()}`).then((response)=>{
                                            setTabcontent(response)
                                            setIsLoading(false)
                                        }).catch((error)=>{
                                            setIsLoading(false)
                                             console.log("error:",error)
                                            toast({
                                                variant: "destructive",
                                                title: "Uh oh! Something went wrong.",
                                                action: <ToastAction altText="Try again">Try again</ToastAction>,
                                            })
                                        })
                                }
                            }
                        }}
                        initialFocus
                        />
                    </PopoverContent>
                    </Popover>
            </div>
            {isLoading?<Spinner/>:children}
        </div>
    )
}