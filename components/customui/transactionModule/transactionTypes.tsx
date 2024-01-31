import { Text } from "../text"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ApiResponse{
    ApiResponse:string[]
}
export const TransactionTypes=({
    ApiResponse
}:ApiResponse)=>{
    return(
        <div className="bg-white overflow-y-auto">
            <Text
                style="font-semibold text-md mb-2"
                value="Trsansaction Types"
            />
            <Text
                style="text-sm"
                value="A list of the types of transactions available"
            />
            <ScrollArea className="flex flex-col justify-between h-[57vh]">
            {
                ApiResponse?.map((transTypes,index)=>{
                    return(
                        <div 
                            className="flex items-center p-2 rounded"
                            key={index}
                        >
                            <div>
                                <Text
                                    style="text-sm font-semibold mb-2"
                                    value={transTypes}
                                />
                                <Text
                                    style="text-sm"
                                    value={index}
                                />
                            </div>
                        </div>
                    )
                })
            }
            </ScrollArea>
        </div>
    )
}