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

export interface McdApiObjectType {
    id: number,
    name: string,
    amount:string,
    status:string,
    description:string,
    date:string,
    user_name:string,
    ip_address:string,
    device_details:string,
    code:string,
    i_wallet:string,
    f_wallet:string,
    extra:string,
    token:string,
    ref:string,
    server:string,
    server_ref:string,
    server_response:string,
    created_at:  string,
    updated_at:  string,
}


export const MCD_Transactions=({
    apiParameter
}:{
    apiParameter:McdApiObjectType[]
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
    //     window.location.replace(`/mcd/transactions/${id}`)
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
            "Transactions"
        ]}
        >
            {
                isLoading?
                <Spinner/>:(
                    <>
                        <TableLayout
                            tableHeadRow={[
                                "S/N",
                                "Name",
                                "Amount",
                                "Status",
                                "Description",
                                "Date",
                                "User Name",
                                "Ip Address",
                                "Device Details",
                                "Code",
                                "I wallet",
                                "F wallet",
                                "Extra",
                                "Token",
                                "Reference",
                                "Server",
                                "Server Reference",
                                "Server Response",
                                "Creation Date"
                            ]}
                            caption={"Mega Cheap Data Transaction List"}
                            hideAction={true}
                        >
                            {
                                apiParameter?.map((info,index)=>{
                                    const{
                                        id,
                                        name,
                                        amount,
                                        status,
                                        description,
                                        date,
                                        user_name,
                                        ip_address,
                                        device_details,
                                        code,
                                        i_wallet,
                                        f_wallet,
                                        extra,
                                        token,
                                        ref,
                                        server,
                                        server_ref,
                                        server_response,
                                        created_at
                                    }=info;
                                    return(
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{index +1}</TableCell>
                                            {
                                                [
                                                    name,
                                                    amount,
                                                    status,
                                                    description,
                                                    date,
                                                    user_name,
                                                    ip_address,
                                                    device_details,
                                                    code,
                                                    i_wallet,
                                                    f_wallet,
                                                    extra,
                                                    token,
                                                    ref,
                                                    server,
                                                    server_ref,
                                                    server_response
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