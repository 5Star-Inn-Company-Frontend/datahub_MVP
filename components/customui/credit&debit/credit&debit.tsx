"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select" 

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { AvatarIcon, BackpackIcon,ReloadIcon } from "@radix-ui/react-icons"
import { ViewLayout } from "../global/viewLayout"
import { IconInput } from "../global/iconInput"
import { Credit_Debit } from "@/actions/credit&debit/action"

const formSchema = z.object({
  email: z.string({
    required_error: "Email Field is required.",
  }),
  description: z.string({
    required_error: "Description Field is required.",
  }),
  amount: z.string({
    required_error: "Amount is required.",
  }),
  fund: z.string({
    required_error: "Fund Field is required.",
  })
})


export function Credit_And_Debit() {
    const { toast } = useToast()
    const[isVerified, setisVerified] = useState(false)
    const[isLoading, setIsLoading]=useState<boolean>(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            amount:"",
            description:"",
            fund:"Fund"

        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        const{
            amount,
            email,
            description,
            fund
        }=values;
        Credit_Debit(
            email,
            amount,
            description,
            fund
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
    <ViewLayout 
        navs={[
            "Credit/Debit Account"
        ]}
        >
        <Card className="shadow-none rounde border-white bg-white lg:w-[65%] xl:w-65%] md:w-[65%] sm:w-full xs:w-full">
            <CardHeader className="mb-0">
                <CardTitle>Credit/Debit </CardTitle>
                <CardDescription>Enter Transaction Details</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <IconInput
                                    icon={<AvatarIcon className="h-4 w-4" />}
                                >
                                    <Input
                                        type="email" 
                                        placeholder="email" {...field}
                                        className="w-full border-none" 
                                        required
                                    />
                                </IconInput>
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
                                <IconInput
                                    icon={<BackpackIcon className="h-4 w-4" />}
                                >
                                    <Input 
                                        placeholder="amount" {...field} 
                                        className="w-full border-none" 
                                        required
                                    />
                                </IconInput>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <IconInput
                                        icon={<BackpackIcon className="h-4 w-4" />}
                                    >
                                    <Input 
                                        placeholder="description" {...field} 
                                        className="w-full border-none" 
                                        required
                                    />
                                    </IconInput>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                        control={form.control}
                        name="fund"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Select Action</FormLabel>
                            <IconInput
                                icon={<BackpackIcon className="h-4 w-4" />}
                            >
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                required
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select fund" />
                                </SelectTrigger>
                                <SelectContent
                                    className="bg-white w-full border-none"
                                >
                                        <SelectItem value="Fund">Fund</SelectItem>
                                        <SelectItem value="Debit">Debit</SelectItem>
                                </SelectContent>
                            </Select>
                            </IconInput>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div className="flex justify-end items-end">
                            {
                                isLoading?
                                <Button disabled className="text-white">
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin text-white" />
                                    Please wait...
                                </Button>:
                                <Button type="submit" className="text-white" >Submit</Button>
                            }
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </ViewLayout>
  )
}