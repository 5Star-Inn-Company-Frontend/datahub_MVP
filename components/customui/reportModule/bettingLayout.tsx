"use client";
import {TabsContent} from "@/components/ui/tabs"
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { TableLayout } from "../global/tableLayout"

export interface  BettingApiObjectType {
    id: number,
    created_at:  string,
    updated_at:  string,
    name: string,
    code: string,
    discount:string,
    status: number,
    server: number,
}

export interface BettingApiArrayType{
    apiParameter:BettingApiObjectType[]
}

export const BettingReportLayout =({
    apiParameter
}: BettingApiArrayType)=>{
    return(
        <TabsContent 
            value="betting"
            className="w-full"
        >
            <TableLayout
                tableHeadRow={[
                    "S/N",
                    "Id",
                    "Name",
                    "Code",
                    "Status",
                    "Discount",
                    "Server",
                    "Creation Date",
                    "Updated At",
                ]}
                caption={"Bettings Report"}
                hideAction={true}
            >
                {
                    apiParameter?.map((info,index)=>{
                        const{
                            id,
                            name,
                            discount,
                            server,
                            status,
                            code,
                            created_at,
                            updated_at
                        }=info;
                        return(
                            <TableRow key={index}>
                                <TableCell className="font-medium">{index +1}</TableCell>
                                {
                                    [
                                        id,
                                        name,
                                        code,
                                        status,
                                        discount,
                                        server
                                    ].map((bodyInfo,index)=><TableCell key={index}>{bodyInfo}</TableCell>)
                                }
                                <TableCell>{new Date(created_at).toLocaleString()}</TableCell>
                                <TableCell>{new Date(updated_at).toLocaleString()}</TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableLayout>
        </TabsContent>
    )
}