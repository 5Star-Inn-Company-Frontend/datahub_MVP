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
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { TableLayout } from "../global/tableLayout"
import { ViewLayout } from "../global/viewLayout"
import { PostWalletFund } from "@/actions/transactionModule/totalWalletFund"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import Spinner from "../global/spinner"

export interface ApiResponse {
    total_funding: number,
    created_at:string
}

export const Total_Wallet_Fund=()=>{
    
    const { toast } = useToast()
    const [date, setDate] = React.useState<Date>()
    const[ isLoading, setIsLoading] = React.useState(false)
    const[
        data,setData
    ]=React.useState<ApiResponse[]>([]);
    const[
        isMounted,
        setIsMounted
    ] = React.useState(false);
    React.useEffect(()=>{
        setIsMounted(true)
    },[])
    
    if(!isMounted){
        return <Spinner/>
    }
    return(
        <ViewLayout 
            navs={[
                "Total wallet fund"
            ]}
        >
            <div className="flex flex-row justify-end pb-4">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                        variant={"outline"}
                        className={cn(
                            "w-[240px] justify-start text-left font-normal bg-white",
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
                                setIsLoading(true)
                                PostWalletFund(
                                    withHyphens
                                ).then((response)=>{
                                    const{
                                        total_wallet_funding
                                    }=response;
                                    setData(total_wallet_funding)
                                    setIsLoading(false)
                                }).catch((error)=>{
                                    setIsLoading(false)
                                    console.log("error:",error)
                                    toast({
                                        variant: "destructive",
                                        title: "Uh oh! Something went wrong.",
                                        description:error,
                                        action: <ToastAction altText="Try again">Try again</ToastAction>,
                                    })
                                })
                            }
                        }}
                        initialFocus
                        />
                    </PopoverContent>
                    </Popover>
            </div>
            {isLoading?<Spinner/>:
            <TableLayout
                tableHeadRow={[
                    "S/N",
                    "Total Charge",
                    "Created At"
                ]}
                caption={"A List of all your total fund"}
                hideAction={true}
            >
                {
                    data?.map((info,index)=>{
                        const{
                            total_funding,
                            created_at
                        }=info;
                        return(
                            <TableRow key={index}>
                                <TableCell className="font-medium">{index +1}</TableCell>
                                {
                                    [
                                        total_funding,
                                        created_at
                                    ].map((bodyInfo,index)=><TableCell key={index}>{bodyInfo}</TableCell>)
                                }
                                <TableCell>{new Date(created_at).toLocaleString()}</TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableLayout>
            }
        </ViewLayout>
    )
}