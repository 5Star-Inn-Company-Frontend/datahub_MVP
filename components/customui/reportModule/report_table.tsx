"use client";
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { TableLayout } from "../global/tableLayout"
import { DataApiArrayType} from "./dataLayout";

export const ReportTable =({
    apiParameter
}:DataApiArrayType)=>{
    return(
        <TableLayout
            tableHeadRow={[
                "S/N",
                "User Id",
                "Reference",
                "Recipient",
                "Title",
                "Charges",
                "Commission",
                "Type",
                "Transaction Type",
                "Remark",
                "Token",
                "Previous Balance",
                "New Balance",
                "Server",
                "amount",
                "Status",
                "Creation Date",
            ]}
            hideAction={true}
        >
            {
                apiParameter?.map((info,index)=>{
                    const{
                        user_id,
                        reference,
                        recipient,
                        title,
                        charges,
                        commission,
                        type,
                        transaction_type,
                        remark,
                        token,
                        prev_balance,
                        new_balance,
                        server,
                        amount,
                        status,
                        created_at
                    }=info;
                    return(
                        <TableRow key={index}>
                            <TableCell className="font-medium">{index +1}</TableCell>
                            {
                                [
                                    user_id,
                                    reference,
                                    recipient,
                                    title,
                                    charges,
                                    commission,
                                    type,
                                    transaction_type,
                                    remark,
                                    token,
                                    prev_balance,
                                    new_balance,
                                    server,
                                    amount,
                                    status
                                ].map((bodyInfo,index)=><TableCell key={index}>{bodyInfo}</TableCell>)
                            }
                            <TableCell>{new Date(created_at).toLocaleString()}</TableCell>
                        </TableRow>
                    )
                })
            }
        </TableLayout>
    )
}