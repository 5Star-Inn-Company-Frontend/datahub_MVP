"use client"
import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import{
    useEffect,
    useState
} from "react";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { addDays, format } from "date-fns"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
import { Text } from "../text"
import { ReportLayoutTabPropsType } from "./report_layout_tab"
import { getDailyReport } from "@/actions/reportModule/daily_report"
import { getMonthlyReport } from "@/actions/reportModule/monthly_report"
import { getYearlyReport } from "@/actions/reportModule/yearlyReport"
import Spinner from "../global/spinner"
import { useToast } from "@/components/ui/use-toast"

interface PropType{
    children: React.ReactNode,
    title:string,
    setTabcontent:React.Dispatch<React.SetStateAction<ReportLayoutTabPropsType>>
}
export const Reportlayout =({children,title,setTabcontent}:PropType)=>{
    const [date, setDate] = useState<Date>()
    const[ isLoading, setIsLoading] = useState(false)
    const {toast} = useToast();
    
    useEffect(()=>{
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
                        toast({
                            variant: "destructive",
                            title: "Uh oh! Something went wrong.",
                            description:`${error}`
                        })
                        return{
                            errorMessage:error,
                        }
                    })
                break;
                case "Monthly":
                    setIsLoading(true)
                    getMonthlyReport(`${new Date(date).getMonth()+1}`).then((response)=>{
                        setTabcontent(response)
                        setIsLoading(false)
                    }).catch((error)=>{
                        setIsLoading(false)
                        toast({
                            variant: "destructive",
                            title: "Uh oh! Something went wrong.",
                            description:`${error}`
                        })
                        return{
                            errorMessage:error,
                        }
                    })
                break;
                default:
                    setIsLoading(true)
                    getYearlyReport(`${new Date(date).getFullYear()}`).then((response)=>{
                        setTabcontent(response)
                        setIsLoading(false)
                    }).catch((error)=>{
                        setIsLoading(false)
                        toast({
                            variant: "destructive",
                            title: "Uh oh! Something went wrong.",
                            description:`${error}`
                        })
                        return{
                            errorMessage:error,
                        }
                    })
            }
        }
    },[date])
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
                        {date ? format(date, "PPP") : <span>Select date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Select
                            onValueChange={(value) =>
                                setDate(addDays(new Date(), parseInt(value)))
                            }
                            >
                            <SelectTrigger>
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent position="popper" className="bg-white">
                                <SelectItem value="0">{title ==="Daily"?"Today":title ==="Monthly"?"This Month":"This Year"}</SelectItem>
                            </SelectContent>
                        </Select>
                        <div className="rounded-md border mt-2">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </div>
                    </PopoverContent>
                    </Popover>
            </div>
            {isLoading?<Spinner/>:children}
        </div>
    )
}