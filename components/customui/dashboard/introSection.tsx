"use client";
import frame from "../../../public/Frame 1000002437.svg";
import frame1 from "../../../public/Frame 1000002437 (1).svg"
import frame2 from "../../../public/Frame 1000002437 (2).svg";
import frame3 from "../../../public/Frame 1000002437 (3).svg"
import {Text} from "../text"
import { Service_Select } from "./serviceModule/services";
import { TotalTransactionCard } from "../transactionModule/totalTransactionCard";
import { ReferAndEarn } from "../transactionModule/refer&earn";
import { DailyReport } from "../reportModule/dailyReportView/daily_report_view";
import Link from "next/link";

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
    userDetails:userDetailsProps
}
export const IntroSection=({
    trans_count,
    trans_sum,
    userDetails
}:propTypes)=>{
    console.log(userDetails);
    return(
        <>

        <Text
            style="text-md text-gray mb-2"
            value="Here's what is happening today."
        />
        <Text
            style="mb-4 font-semibold text-md"
            value="Dashboard"
        />
        <div className="grid grid-flow-row-dense lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 sm:grid-rows-1 xs:grid-rows-1 w-full gap-4 mb-4">
            <div className="col-span-2 bg-white rounded p-4">
                
                <div className="flex lg:flex-row xl:flex-row md:flex-row sm:flex-col xs:flex-col justify-between w-full mt-4">
                    <div>
                        <Text
                            style="text-md mb-2 text-grey-400 font-semibold"
                            value={userDetails?.firstname}
                        />
                        <Text
                            style="text-md mb-2 text-grey-400 font-semibold"
                            value={userDetails?.lastname}
                        />
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
                        amount:`${trans_sum}naira`,
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
        </div>

        <div className="grid grid-flow-row-dense lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 sm:grid-rows-1 xs:grid-rows-1 w-full gap-4 mb-4">
            <div className="col-span-2 bg-white rounded p-4 overflow-auto h-[34rem]">
                <DailyReport/>
            </div>
            <div className=" lg:col-span-1 xl:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2 flex flex-col justify-between lg:w-auto xl:w-auto sm:w-full md:w-auto xs:w-full">
                <div className="bg-white rounded p-4 w-full">
                    {
                        [
                            {
                                amount:`${trans_sum}naira`,
                                img:frame2,
                                title:"Total Wallet Fund",
                                route:"total_walletFund"
                            },{
                                amount:`${trans_count}`,
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
                                    <Link
                                        href={`transactions/${route}`}
                                        className="mb-4 text-sm cursor-pointer text-end"
                                    >view more
                                    </Link>
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