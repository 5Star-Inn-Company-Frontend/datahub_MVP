"use client";
import {TabsContent} from "@/components/ui/tabs"
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { TableLayout } from "../global/tableLayout"

export interface AirtimeApiObjectType {
    id: number,
    network: string,
    created_at:  string,
    updated_at:  string,
    discount:string,
    status: number,
    server: string,
}

export interface AirtimeApiArrayType{
    apiParameter:AirtimeApiObjectType[]
}

export const AirtimeReportLayout =({
    apiParameter
}: AirtimeApiArrayType)=>{
    return(
        <TabsContent 
            value="airtime"
            className="w-full"
        >
            <TableLayout
                tableHeadRow={[
                    "S/N",
                    "Id",
                    "Network",
                    "Status",
                    "Discount",
                    "Server",
                    "Creation Date",
                    "Updated At",
                ]}
                caption={"Airtime Report"}
                hideAction={true}
            >
                {
                    apiParameter?.map((info,index)=>{
                        const{
                            id,
                            network,
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