"use client";
import frame from "../../../public/Frame 1000002437.svg";
import frame1 from "../../../public/Frame 1000002437 (1).svg"
import {Text} from "../text"
import { Service_Select } from "./serviceModule/services";
import { TotalTransactionCard } from "../transactionModule/totalTransactionCard";
import { TransactionTypes } from "../transactionModule/transactionTypes";
import { Request_website } from "../transactionModule/requestWebsite";
import { ReferAndEarn } from "../transactionModule/refer&earn";
import { DailyReport } from "../reportModule/dailyReportView/daily_report_view";
import { Button } from "@/components/ui/button";

interface userDetailsProps{
    id:number,
    firstname:string,
    lastname:string,
    address:string,
    phone:string,
    gender:string,
    dob:string,
    email:string,
    email_verified_at:null|string,
    status:number,
    status_reason:null|string,
    package:string,
    pin:string,
    role_id:number,
    bvn:null|string,
    bank_code:null|string,
    account_name:null|string,
    account_number:null|string,
    created_at:string,
    updated_at:string
}

interface propTypes {
    trans_count:number,
    trans_types:string[],
    trans_sum:number,
    userDetails:userDetailsProps
}
export const IntroSection=({
    trans_count,
    trans_types,
    trans_sum,
    userDetails
}:propTypes)=>{
    return(
        <>

        <Text
            style="text-md text-gray mb-2"
            value="Here's what is happening today."
        />
        <Text
            style="text-2xl mb-4 font-semibold"
            value="Dashboard"
        />
        <div className="grid grid-flow-row-dense lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 sm:grid-rows-1 xs:grid-rows-1 w-full gap-4 mb-4">
            <div className="col-span-2 bg-white rounded p-4">
                
                <div className="flex lg:flex-row xl:flex-row md:flex-row sm:flex-col xs:flex-col justify-between w-full mt-4">
                    <div>
                        <div className="flex mb-2">
                            <span className="text-lg font-semibold">Account Number :</span>
                            <span className="text-lg">{userDetails?.account_number}</span>
                        </div>
                        <div className="flex mb-4">
                            <span className="text-lg font-semibold">Account Name :</span>
                            <span className="text-lg">{userDetails?.account_name}</span>
                        </div>
                        <div className="flex flex-col justify-end items-end mt-4">
                            <Text
                                style="text-md mb-2"
                                value={userDetails?.package}
                            />
                            <Text
                                style="text-xs mb-2"
                                value={userDetails?.email}
                            />
                        </div>
                    </div>
                    {/** Select Service */}
                    <div className="flex flex-col justify-end items-end">
                        <Service_Select/>
                    </div>
                </div>
            </div>
            <div className=" lg:col-span-1 xl:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2 flex flex-col justify-between lg:w-auto xl:w-auto sm:w-full md:w-auto xs:w-full">
            {
                [
                    {
                        amount:trans_sum,
                        img:frame,
                        title:"Total Transaction Sum"
                    },{
                        amount:trans_count,
                        img:frame1,
                        title:"Total Transaction Count"
                    }
                ]?.map((total_details,index)=>{
                    const{
                        amount,
                        img,
                        title
                    }=total_details;
                    return(
                        <TotalTransactionCard
                            amount={amount}
                            img={img}
                            title={title}
                            key={index}
                        />
                    )
                })
            }
            </div>
        </div>

        <div className="grid grid-flow-row-dense lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 sm:grid-rows-1 xs:grid-rows-1 w-full gap-4 mb-4">
            <div className="col-span-2 bg-white rounded p-4 overflow-auto h-[28rem]">
                <DailyReport/>
            </div>
            <div className=" lg:col-span-1 xl:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2 flex flex-col justify-between lg:w-auto xl:w-auto sm:w-full md:w-auto xs:w-full">
                <div className="bg-white rounded p-4 w-full">
                   <TransactionTypes 
                        ApiResponse={trans_types}
                    />
                </div>
            </div>
        </div>

        <div className="grid grid-flow-row-dense lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 sm:grid-rows-1 xs:grid-rows-1 w-full gap-4 mb-4">
            <div className="col-span-2 bg-white rounded p-4">
                <div className="grid lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 sm:grid-rows-1 xs:grid-rows-1 w-full gap-4">
                    <ReferAndEarn/>
                    <Request_website/>
                </div>
            </div>
            {/**Wallet*/}
            <div className=" lg:col-span-1 xl:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2 flex flex-col justify-between lg:w-auto xl:w-auto sm:w-full md:w-auto xs:w-full">
                <div className="bg-white rounded p-4 mb-4 w-full h-[10rem]">
                    <div className="flex justify-end mb-2">
                        <Button 
                            variant="outline" 
                            className="bg-[#8b5cf6] text-white"
                            onClick={()=>window.location.replace("/transactions/total_walletCharge")}
                        >Wallet charge</Button>
                    </div>
                    <Text
                        style="text-4xl font-semibold mb-2"
                        value={""}
                    />
                    <Text
                        style="text-md"
                        value="TOTAL WALLET CHARGE"
                    />
                </div>
                <div className="bg-white rounded p-4 h-[10rem]">
                    <Text
                        style="text-4xl font-semibold mb-2"
                        value={""}
                    />
                    <Text
                        style="text-md"
                        value="TOTAL WALLET FUND"
                    />
                    
                    <div className="flex justify-end mb-2">
                        <Button 
                            variant="outline" 
                            className="bg-[#8b5cf6] text-white"
                            onClick={()=>window.location.replace("/transactions/total_walletFund")}
                        >Wallet Fund
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}