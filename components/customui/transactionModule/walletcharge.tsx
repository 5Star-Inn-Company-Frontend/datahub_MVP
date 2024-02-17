"use client"
import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
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
import { PostWalletCharge } from "@/actions/transactionModule/totalWalletCharge"
import { useToast } from "@/components/ui/use-toast"
import Spinner from "../global/spinner"

export interface ApiResponse {
    total_charge: number,
    created_at:string
}

export const Total_Wallet_Charge=()=>{
    const [date, setDate] = React.useState<Date>()
    const { toast } = useToast()
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

    React.useEffect(()=>{
        if(date){
            const withHyphens = [new Date(date).getFullYear(),new Date(date).getMonth()+1,new Date(date).getDate()].join('-')
            setIsLoading(true)
            PostWalletCharge(
                withHyphens
            ).then((response)=>{
                const{
                    total_wallet_charge
                }=response;
                setData(total_wallet_charge)
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
    },[date])
    
    if(!isMounted){
        return <Spinner/>
    }
    return(
        <ViewLayout 
            navs={[
                "Total wallet charge"
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
                                <SelectItem value="0">Today</SelectItem>
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
            {isLoading?<Spinner/>:
            <TableLayout
                tableHeadRow={[
                    "S/N",
                    "Total Charge",
                    "Created At"
                ]}
                caption={"A List of all your total charge"}
                hideAction={true}
            >
                {
                    data?.map((info,index)=>{
                        const{
                            total_charge,
                            created_at
                        }=info;
                        return(
                            <TableRow key={index}>
                                <TableCell className="font-medium">{index +1}</TableCell>
                                {
                                    [
                                        total_charge,
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