"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Text } from "../text"
import { LoginAction } from "@/actions/auth/signin"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import Link from "next/link"
import { AiOutlineUser } from "react-icons/ai"
import { ReloadIcon } from "@radix-ui/react-icons"

const formSchema = z.object({
  username: z.string({
    required_error: "UserName field is required.",
  }),
  amount: z.string({
    required_error: "Amount field is required.",
  }),
  fund: z.string({
    required_error: "Fund field is required.",
  }),
  bank_transfer: z.string({
    required_error: "Bank Transfer field is required.",
  }),
  description: z.string({
    required_error: "Description field is required.",
  }),
})

export function WalletFundingSection() {
    const[isLoading, setIsLoading]=useState<boolean>(false);
    const {toast} = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username:"",
            amount:"",
            fund:"",
            bank_transfer:"",
            description:""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        const {
            username,
            amount,
            bank_transfer,
            fund,
            description
        }=values;
        setIsLoading(true)
        // LoginAction({
        //     username,
        //     amount
        // }).then((response)=>{
        //     const{
        //         status,
        //         message,
        //         data
        //     }=response;
        //     setIsLoading(false)
        //     if(status){
        //         toast({
        //             description:`Authenticated as ${data?.user?.username}`
        //         })
        //         window.location.href ="/";
        //     }else{
        //         toast({
        //             variant: "destructive",
        //             description:message
        //         })
        //     }
        // }).catch((error)=>{
        //     setIsLoading(false);
        //     toast({
        //         variant: "destructive",
        //         title: "Uh oh! Something went wrong.",
        //         description:`${error}`
        //     })
        //     return{
        //         errorMessage:error,
        //     }
        // })
    }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
                <FormItem>
                <FormLabel>username</FormLabel>
                <FormControl>
                    <Input placeholder="shadcn" {...field} type="username"/>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
                <FormItem>
                <FormLabel>amount</FormLabel>
                <FormControl>
                    <Input placeholder="shadcn" {...field} type="amount"/>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <div className="flex items-center my-2">
                <Text
                    style="text-sm me-2"
                    value="Dont have an account?"
                />
                <Link href="/auth/register" className="text-sm">Register</Link>
            </div>
            <div className="flex justify-end items-end">
                {
                    isLoading?
                    <Button disabled className="w-full">
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Please wait...
                    </Button>:
                    <Button type="submit" className="text-white w-full text-center bg-black" >Submit</Button>
                }
            </div>
        </form>
    </Form>
  )
}