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
import { PostOwnWebsite } from "@/actions/transactionModule/ownawebsite"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

const formSchema = z.object({
  name: z.string({
    required_error: "Business Name is required.",
  }),
  logo: z.string({
    required_error: "Business Logo Url is required.",
  }),
  web_address: z.string({
    required_error: "Website address is required.",
  }),
  phone: z.string({
    required_error: "Business contact number is required.",
  }),
})

export function Request_website() {
    const { toast } = useToast()
    const[isLoading, setIsLoading]=useState<boolean>(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            logo:"",
            phone:"",
            web_address:""

        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        PostOwnWebsite(
            {
                business_name:values?.name,
                business_logo_url:values?.logo,
                website_address:values?.web_address,
                business_phone_no:values?.phone 
            }
        ).then((response)=>{
            const{
                message
            }=response;
            setIsLoading(false)
            console.log(message)
            toast({
                description:message
            })
        }).catch((error)=>{
            setIsLoading(false)
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description:`${error}`
            })
            return{
                errorMessage:error,
            }
        })
    }

  return (
    <Card  className="shadow-none rounded border">
        <CardHeader className="mb-0">
            <CardTitle>Request a website</CardTitle>
            <CardDescription>kindly provide the required informations</CardDescription>
        </CardHeader>
        <CardContent className="mb-0">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input placeholder="Business Name" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input placeholder="Business Logo Url" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="web_address"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input placeholder="Website Address" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input placeholder="Business Contact Phone Number" {...field} type="tel"/>
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
