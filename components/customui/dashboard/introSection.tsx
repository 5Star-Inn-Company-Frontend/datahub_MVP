import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import frame from "../../../public/Frame 1000002437.svg";
import frame1 from "../../../public/Frame 1000002437 (1).svg"
import frame2 from "../../../public/Frame 1000002437 (2).svg"
import frame3 from "../../../public/Frame 1000002437 (3).svg"
import frame4 from "../../../public/Frame 1000002437 (4).svg"
import Image from "next/legacy/image"
import frame5 from "../../../public/Frame 1000002437 (5).svg"
import {Text} from "../text"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"  


export const IntroSection=()=>{
    return(
        <>
        <div className="grid grid-flow-row-dense lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 sm:grid-rows-1 xs:grid-rows-1 w-full gap-4 mb-4">
            <div className="col-span-2 bg-white rounded p-4">
                <Text
                    style="text-md text-gray mb-2"
                    value="Here's what is happening today."
                />
                <Text
                    style="text-2xl mb-4 font-semibold"
                    value="Dashboard"
                />
                
                 {/**Account Info*/}
                <Tabs defaultValue="account" className="w-full">
                    <TabsList>
                        <TabsTrigger value="account" className="rounded px-8 py-2 bg-[#fef2f2] text-[#ff5718] font-semibold">Safe Haven</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account" className="w-full">
                        <div className="flex lg:flex-row xl:flex-row md:flex-row sm:flex-col xs:flex-col justify-between w-full mt-4">
                            <div>
                                <div className="flex mb-2">
                                    <span className="text-lg font-semibold">Account Number :</span>
                                    <span className="text-lg">8016864957</span>
                                </div>
                                <Text
                                    style="text-lg mb-2"
                                    value="TECHPLUSNETWORK / 5STAR IDOWU LAWAL"
                                />
                                <div className="flex mb-4">
                                    <span className="text-lg font-semibold">Bank Name :</span>
                                    <span className="text-lg">Safehaven</span>
                                </div>
                                <div className="flex flex-col justify-end items-end mt-4">
                                    <Text
                                        style="text-md mb-2"
                                        value="Automated bank Transfer"
                                    />
                                    <Text
                                        style="text-xs mb-2"
                                        value="Make transfer to this account to fund your wallet"
                                    />
                                </div>
                            </div>
                            {/** Select Service */}
                            <div className="flex flex-col justify-end items-end">
                                <Select>
                                    <SelectTrigger className="w-[180px] bg-[#181516] text-white">
                                        <SelectValue placeholder="Select service" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectItem value="buy_data_pin_coupon">Buy Data</SelectItem>
                                        <SelectItem value="buy_data">Buy Data</SelectItem>
                                        <SelectItem value="buy_airtime">Buy Airtime</SelectItem>
                                        <SelectItem value="airtime_to_cash">Airtime to Cash</SelectItem>
                                        <SelectItem value="cable_sub">Cable Subscription</SelectItem>
                                        <SelectItem value="ele_pay">Electricity Payment</SelectItem>
                                        <SelectItem value="recharge_card_pin">Recharge card printing</SelectItem>
                                        <SelectItem value="edu_pin">Education Pin</SelectItem>
                                        <SelectItem value="bulk_sim">Bulk Sim</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
            {/**Wallet*/}
            <div className=" lg:col-span-1 xl:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2 flex flex-col justify-between lg:w-auto xl:w-auto sm:w-full md:w-auto xs:w-full">
                <div className="bg-white rounded p-4 mb-4 w-full">
                    <div className="flex justify-end items-end mb-2">
                        <Button variant="outline" className="bg-[#8b5cf6] text-white">Fund Wallet</Button>
                    </div>
                    <Text
                        style="text-md mb-2"
                        value="SMART EARNER"
                    />
                    <Text
                        style="text-4xl font-semibold mb-2"
                        value="0"
                    />
                    <Text
                        style="text-md"
                        value="WALLET BALANCE"
                    />
                </div>
                <div className="bg-white rounded p-4">
                    <Text
                        style="text-lg mb-2"
                        value="Need some help?"
                    />
                    <Text
                        style="text-sm mb-2"
                        value="Have anything to say to us? Please contact our Support Team on Whatsapp"
                    />
                    <Button variant="outline" className="bg-[#8b5cf6] text-white">Contact Us</Button>
                </div>
            </div>
        </div>
        {/**Users Balance*/}
        <div className="grid lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 xs:grid-cols-1 gap-4">
            {
                [
                    {
                        amount:"0",
                        img:frame,
                        title:"WALLET"
                    },{
                        amount:"1",
                        img:frame1,
                        title:"MTN SME DATA"
                    },{
                        amount:"3",
                        img:frame2,
                        title:"MTN CG DATA"
                    },{
                        amount:"2",
                        img:frame3,
                        title:"MTN CG DATA"
                    },{
                        amount:"4",
                        img:frame4,
                        title:"AIRTEL CG DATA"
                    },{
                        amount:"5",
                        img:frame5,
                        title:"9MOBILE CG DATA"
                    }
                ]?.map((total_details,index)=>{
                    const{
                        amount,
                        img,
                        title
                    }=total_details;
                    return(
                    <div 
                        className="flex bg-white items-center p-4 rounded"
                        key={index}
                    >
                        <div className="me-2 relative w-[3rem] h-[3rem]">
                            <Image
                                src={img}
                                alt="object not found"
                                layout="fill"
                                className="w-full"
                            />
                        </div>
                        <div>
                            <Text
                                style="text-md font-semibold mb-2"
                                value={title}
                            />
                            <Text
                                style="text-sm"
                                value={amount}
                            />
                        </div>
                    </div>
                    )
                })
            }
        </div>
        </>
    )
}