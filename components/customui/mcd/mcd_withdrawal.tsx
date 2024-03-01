"use client";
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { TableLayout } from "../global/tableLayout"
import { ViewLayout } from "../global/viewLayout";
import { useEffect, useState } from "react";
import Spinner from "../global/spinner";
// import ReactPaginate from "react-paginate";

export interface McdWithdrawApiObjectType {
    id: number,
    amount:string,
    status:number,
    user_name:string,
    device_details:string,
    wallet:string,
    ref:string,
    account_number:string,
    bank:string,
    bank_code:string,
    version:string,
    created_at:  string,
    updated_at:  string,
}

export const MCD_Withrawals=({
    apiParameter
}:{
    apiParameter:McdWithdrawApiObjectType[]
})=>{
    const[
        isLoading,
        setIsLoading
    ]=useState(false);
    const[
        isMounted,
        setIsMounted
    ] = useState(false);

    // const handlePageClick = (event:any) => {
    //     let id=event.selected
    //     window.location.replace(`/mcd/withdrawals/withdrawalList/${id}`)
    // };

    useEffect(()=>{
        setIsMounted(true)
    },[])
    
    if(!isMounted){
        return <Spinner/>
    }

    return(
    <ViewLayout 
        navs={[
            "Withdrawals"
        ]}
        >
            {
                isLoading?
                <Spinner/>:(
                    <>
                        <TableLayout
                            tableHeadRow={[
                                "S/N",
                                "Id",
                                "Amount",
                                "Status",
                                "User Name",
                                "Device Details",
                                "Wallet",
                                "Reference",
                                "Account Number",
                                "Bank",
                                "Bank Code",
                                "Version",
                                "Creation Date"
                            ]}
                            hideAction={true}
                        >
                            {
                                apiParameter?.map((info,index)=>{
                                    const{
                                        id,
                                        amount,
                                        status,
                                        user_name,
                                        device_details,
                                        wallet,
                                        ref,
                                        account_number,
                                        bank,
                                        bank_code,
                                        version,
                                        created_at
                                    }=info;
                                    return(
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{index +1}</TableCell>
                                            {
                                                [
                                                    id,
                                                    amount,
                                                    status,
                                                    user_name,
                                                    device_details,
                                                    wallet,
                                                    ref,
                                                    account_number,
                                                    bank,
                                                    bank_code,
                                                    version
                                                ].map((bodyInfo,index)=><TableCell key={index}>{bodyInfo}</TableCell>)
                                            }
                                            <TableCell>{new Date(created_at).toLocaleString()}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableLayout>
                        {/* <ReactPaginate
                            breakLabel="..."
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={apiParameter?.last_page}
                            previousLabel="< previous"
                            renderOnZeroPageCount={null}
                        /> */}
                    </>
                    )
            }
    </ViewLayout>
    )
}