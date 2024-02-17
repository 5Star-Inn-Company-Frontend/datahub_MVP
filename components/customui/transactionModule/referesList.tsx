import { TableCell, TableRow } from "@/components/ui/table";
import { TableLayout } from "../global/tableLayout";
import { ViewLayout } from "../global/viewLayout";

interface ApiResponse{
    data:string[]
}
export const ReferesList=({
    data
}:ApiResponse)=>{
    return(
        <ViewLayout 
            navs={[
                "Referers"
            ]}
        >
            <TableLayout
                tableHeadRow={[
                    "S/N",
                    "Email"
                ]}
                caption={"A List of all referers"}
                hideAction={true}
            >
                {
                    data?.map((info,index)=>{
                        return(
                            <TableRow key={index}>
                                <TableCell className="font-medium">{index +1}</TableCell>
                                <TableCell>{info}</TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableLayout>
        </ViewLayout>
    )
}