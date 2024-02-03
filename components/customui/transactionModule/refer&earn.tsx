"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PostRefer } from "@/actions/transactionModule/refer&Earn"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

const formSchema = z.object({
  refer_text: z.string({
    required_error: "Refer filed is required.",
  }),
  amount: z.string({
    required_error: "Amount is required.",
  }),
})

export function ReferAndEarn() {
    const { toast } = useToast()
    const[isLoading, setIsLoading]=useState<boolean>(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            refer_text: "",
            amount:""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        console.log(values)
        PostRefer(
            {
                refer:values?.refer_text,
                amount_to_earn:values?.amount   
            }
        ).then((response)=>{
            const{
                message
            }=response;
            setIsLoading(false)
            toast({
                description:message
            })
        }).catch((error)=>{
            setIsLoading(false)
            console.log("error:",error)
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        })
    }

  return (
    <Card className="shadow-none rounded border">
        <CardHeader className="mb-0">
            <CardTitle>Refer And Earn Details</CardTitle>
            <CardDescription>kindly enter the refer text and the amount</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <FormField
                    control={form.control}
                    name="refer_text"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Refer</FormLabel>
                        <FormControl>
                            <Input placeholder="refer" {...field} />
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
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                            <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                     <div className="flex justify-end items-end">
                        {
                            isLoading?
                                <Button type="submit" disabled className="text-white" >Sending request...</Button>:
                                    <Button type="submit" className="text-white" >Submit</Button>
                        }
                    </div>
                </form>
             </Form>
        </CardContent>
    </Card>
  )
}
