'use client';
import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ReactNode } from "react"



type tableProps ={
    tableHeadRow: string[],
    children: ReactNode,
    hideAction?:boolean,
    caption?:string,
    handleChange?:(e?:any)=>void,
    handleSearch?:(e?:any)=>void
}

export const TableLayout =({
    tableHeadRow,
    children,
    hideAction,
    handleChange,
    handleSearch,
    caption
}:tableProps)=>{
    return(
        <div className="bg-white p-4 rounded">
        {/**Action container */}
        {
            !hideAction && (
                <div className="flex justify-end items-end mt-2 mb-4">
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input 
                            type="text" 
                            placeholder="Type query..."
                            onChange ={(e)=>handleChange && handleChange(e.target.value)} 
                        />
                        {
                            handleSearch &&(
                            <Button 
                                type="submit"
                                className="bg-black text-white"
                                onClick={handleSearch}
                                >Search
                            </Button>
                            )
                        }
                    </div>
                </div>
            )
        }
        <Table>
            { caption && <TableCaption>{caption}</TableCaption>}
            <TableHeader>
                <TableRow>
                    {tableHeadRow.map((heading,index)=><TableHead key={index}>{heading}</TableHead>)}
                </TableRow>
            </TableHeader>
            <TableBody>
                {children}
            </TableBody>
        </Table>
        </div>
    )
}