import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select" 
export const Service_Select =()=>{
    return(
        <>
            <Select
                onValueChange={(value)=>window.location.replace(`/service/${value}`)}>
                <SelectTrigger className="w-[180px] bg-[#181516] text-white">
                    <SelectValue placeholder="Service Control" />
                </SelectTrigger>
                <SelectContent
                    className="bg-white"
                >
                    <SelectItem value="airtime">Modify Airtime</SelectItem>
                    <SelectItem value="data">Modify Data</SelectItem>
                    <SelectItem value="tvplan">Modify Tv Plan</SelectItem>
                    <SelectItem value="electricity">Modify Electricity</SelectItem>
                    <SelectItem value="betting">Modify Betting</SelectItem>
                    <SelectItem value="airtime2cash">Modify Airtime to Cash</SelectItem>
                </SelectContent>
            </Select>
        </>
    )
}