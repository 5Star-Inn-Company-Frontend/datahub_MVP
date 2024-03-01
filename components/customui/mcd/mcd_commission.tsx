"use client";
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { TableLayout } from "../global/tableLayout"
import { ViewLayout } from "../global/viewLayout";
import { useEffect, useState } from "react";
import Spinner from "../global/spinner";
import { McdApiObjectType } from "./mcd_transacations";

export const MCD_Commissions=({
    apiParameter
}:{
    apiParameter:McdApiObjectType[]
})=>{
    const[
        isMounted,
        setIsMounted
    ] = useState(false);

    // const handlePageClick = (event:any) => {
    //     let id=event.selected +1;
    //     console.log(id)
    //     window.location.replace(`/mcd/commission/${id}`);
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
            "Commissions"
        ]}
        >
            <TableLayout
                tableHeadRow={[
                    "S/N",
                    "Id",
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
                caption={"Mega Cheap Data Commission List"}
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
                                        server_response
                                    ].map((bodyInfo,index)=><TableCell key={index}>{bodyInfo}</TableCell>)
                                }
                                <TableCell>{new Date(created_at).toLocaleString()}</TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableLayout>
                        {/* {apiParameter?.last_page}
                        {apiParameter?.current_page}
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={apiParameter?.last_page}
                            initialPage={apiParameter?.current_page-1}
                            disableInitialCallback={true}
                            previousLabel="< previous"
                            renderOnZeroPageCount={null}
                            containerClassName="flex m-2"
                            activeClassName=" border text-white bg-success"
                            previousClassName="p-2 border"
                            nextClassName="p-2 border"
                            pageClassName="px-4 py-2"
                        /> */}
                    
    </ViewLayout>
    )
}