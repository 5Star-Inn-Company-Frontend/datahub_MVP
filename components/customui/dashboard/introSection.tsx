"use client";
import frame from "../../../public/Frame 1000002437.svg";
import frame1 from "../../../public/Frame 1000002437 (1).svg"
import frame2 from "../../../public/Frame 1000002437 (2).svg";
import frame3 from "../../../public/Frame 1000002437 (3).svg"
import {Text} from "../text"
// import { Service_Select } from "./serviceModule/services";
import { TotalTransactionCard } from "../transactionModule/totalTransactionCard";
import { ReferAndEarn } from "../transactionModule/refer&earn";
import { DailyReport } from "../reportModule/dailyReportView/daily_report_view";

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
    trans_sum:number,
    total_charge:number,
    total_fund:number,
    userDetails:userDetailsProps
}
export const IntroSection=({
    trans_count,
    trans_sum,
    total_charge,
    total_fund,
    userDetails
}:propTypes)=>{
    return(
        <>
        <div className="flex jsutify-between flex-wrap items-baseline justify-between">
            <div> 
                <Text
                    style="text-md text-gray mb-2"
                    value="Here's what is happening today."
                />
                <Text
                    style="mb-4 font-semibold text-md"
                    value="Dashboard"
                />
            </div>
            {/* <div className="flex flex-col justify-end items-end">
                <Service_Select/>
            </div> */}
        </div>
        <div className="grid lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 sm:grid-rows-1 xs:grid-rows-1 w-full gap-4 mb-4">
            {
                [
                    {
                        amount:`₦${trans_sum}`,
                        img:frame,
                        title:"Total Transaction Sum"
                    },{
                        amount:`${trans_count}`,
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

        <div className="grid grid-flow-row-dense lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 sm:grid-rows-1 xs:grid-rows-1 w-full gap-4 mb-4">
            <div className="col-span-2 bg-white rounded p-4 overflow-auto h-[36rem]">
                <DailyReport/>
            </div>
            <div className=" lg:col-span-1 xl:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2 flex flex-col justify-between lg:w-auto xl:w-auto sm:w-full md:w-auto xs:w-full">
                <div className="bg-white rounded p-4 w-full">
                    {
                        [
                            {
                                amount:`₦${total_fund}`,
                                img:frame2,
                                title:"Total Wallet Fund",
                                route:"total_walletFund"
                            },{
                                amount:`₦${total_charge}`,
                                img:frame3,
                                title:"Total Wallet Charge",
                                route:"total_walletCharge"
                            }
                        ]?.map((total_details,index)=>{
                            const{
                                amount,
                                img,
                                title,
                                route
                            }=total_details;
                            return(
                                <div key={index}>
                                    <TotalTransactionCard
                                        amount={amount}
                                        img={img}
                                        title={title}
                                    />
                                    <Text
                                        style="text-sm mb-4 text-grey-400 text-end cursor-pointer"
                                        value="View more"
                                        clickFunc={()=> window.location.replace(`transactions/${route}`)}
                                    />
                                </div>
                            )
                        })
                    }
                    <ReferAndEarn/>
                </div>
            </div>
        </div>
        </>
    )
}