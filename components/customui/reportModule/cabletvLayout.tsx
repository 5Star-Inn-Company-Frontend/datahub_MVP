"use client";
import {TabsContent} from "@/components/ui/tabs"
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { TableLayout } from "../global/tableLayout"

export interface CabletvApiObjectType {
    id: number,
    created_at:  string,
    updated_at:  string,
    name: string,
    code: string,
    coded:string,
    price:string,
    type:string,
    discount:string,
    status: number,
    server: number,
}

export interface CabletvApiArrayType{
    apiParameter:CabletvApiObjectType[]
}

export const CableReportLayout =({
    apiParameter
}: CabletvApiArrayType)=>{
    return(
        <TabsContent 
            value="cabletv"
            className="w-full"
        >
            <TableLayout
                tableHeadRow={[
                    "S/N",
                    "Id",
                    "Name",
                    "coded",
                    "price",
                    "type",
                    "Code",
                    "Status",
                    "Discount",
                    "Server",
                    "Creation Date",
                    "Updated At",
                ]}
                caption={"CableTv Report"}
                hideAction={true}
            >
                {
                    apiParameter?.map((info,index)=>{
                        const{
                            id,
                            name,
                            coded,
                            price,
                            type,
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
                                        coded,
                                        price,
                                        type,
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