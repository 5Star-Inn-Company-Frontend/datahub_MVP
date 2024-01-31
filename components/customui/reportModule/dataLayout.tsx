"use client";
import {TabsContent} from "@/components/ui/tabs"
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { TableLayout } from "../global/tableLayout"

export interface DataApiObjectType {
    id: number,
    price:string,
    network: string,
    name:string,
    coded:string,
    category:string,
    network_code:string|null,
    dataplan:string,
    plan_id:string,
    note:string|null,
    amount:number|string,
    created_at:  string,
    updated_at:  string,
    discount?:string,
    status: number,
    server: string,
}

export interface DataApiArrayType{
    apiParameter:DataApiObjectType[]
}

export const DataReportLayout =({
    apiParameter
}: DataApiArrayType)=>{
    return(
        <TabsContent 
            value="data"
            className="w-full"
        >
            <TableLayout
                tableHeadRow={[
                    "S/N",
                    "Id",
                    "Network",
                    "Name",
                    " price",
                    "coded",
                    "category",
                    "network_code",
                    "dataplan",
                    "plan_id",
                    "note",
                    "amount",
                    "Status",
                    "Discount",
                    "Server",
                    "Creation Date",
                    "Updated At",
                ]}
                caption={"Data Report"}
                hideAction={true}
            >
                {
                    apiParameter?.map((info,index)=>{
                        const{
                            id,
                            network,
                            name,
                            price,
                            coded,
                            category,
                            network_code,
                            dataplan,
                            plan_id,
                            note,
                            amount,
                            discount,
                            server,
                            status,
                            created_at,
                            updated_at
                        }=info;
                        return(
                            <TableRow key={index}>
                                <TableCell className="font-medium">{index +1}</TableCell>
                                {
                                    [
                                        id,
                                        network,
                                        name,
                                        price,
                                        coded,
                                        category,
                                        network_code,
                                        dataplan,
                                        plan_id,
                                        note,
                                        amount,
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