"use client";
import frame from "../../../public/Frame 1000002437.svg";
import frame1 from "../../../public/Frame 1000002437 (1).svg"
import frame2 from "../../../public/Frame 1000002437 (2).svg";
import frame3 from "../../../public/Frame 1000002437 (3).svg"
import frame4 from "../../../public/Frame 1000002437 (4).svg"
import frame5 from "../../../public/Frame 1000002437 (5).svg";
import {Text} from "../text"
// import { Service_Select } from "./serviceModule/services";
import { BackpackIcon } from "@radix-ui/react-icons"
import { TotalTransactionCard } from "../transactionModule/totalTransactionCard";
import { ReferAndEarn } from "../transactionModule/refer&earn";
import { DailyReport } from "../reportModule/dailyReportView/daily_report_view";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface propTypes {
    trans_count:number,
    trans_sum:number,
    total_charge:number,
    total_fund:number,
    balance:balancePropType
}
interface balancePropType{
    wallet:string,
    commission:number,
    fundingAccount:string
}
export const IntroSection=({
    trans_count,
    trans_sum,
    total_charge,
    total_fund,
    balance
}:propTypes)=>{
    return(
        <>
        <div className="flex justify-between flex-wrap items-baseline justify-between mb-2">
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
            <div className="flex flex-col justify-end items-end ">
                <Button
                    onClick={()=>window.location.replace("/dashboard/mcd/withdrawals/createWithdrawals")}
                    className="bg-black text-white border-white"
                >
                    <BackpackIcon className="mr-2 h-4 w-4 text-white" /> Withdraw MCD Wallet
                </Button>
            </div>
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
        <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex justify-between item-baseline mb-4 ">
            {
                [
                    {
                        amount:`₦${balance?.wallet}`,
                        img:frame4,
                        title:"MCD Wallet"
                    },{
                        amount:`${balance?.commission}`,
                        img:frame5,
                        title:"MCD Commission"
                    },{
                        amount:balance?.fundingAccount,
                        img:frame,
                        title:"MCD Funding Account"
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
                            modifyWidth="w-[24.5rem]"
                        />
                    )
                })
            }
        </div>
        <ScrollBar orientation="horizontal" />
        </ScrollArea>
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
                                        clickFunc={()=> window.location.replace(`/dashboard/transactions/${route}`)}
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