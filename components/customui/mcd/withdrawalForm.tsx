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
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { AvatarIcon, BackpackIcon, IdCardIcon, ReloadIcon } from "@radix-ui/react-icons"
import { MakeWithdrawal, VerifyBank } from "@/actions/mcd/action"
import { ViewLayout } from "../global/viewLayout"
import { IconInput } from "../global/iconInput"

const formSchema = z.object({
  account_number: z.string({
    required_error: "Account Number Field is required.",
  }),
  bank_code: z.string({
    required_error: "Bank Code Field is required.",
  }),
  bank: z.string({
    required_error: "Bank Field is required.",
  }),
  amount: z.string({
    required_error: "Amount is required.",
  }),
  wallet: z.string({
    required_error: "Wallet Field is required.",
  })
})

export interface McdBankApiObjectType {
    id: number,
    name: string,
    slug:string,
    code:string,
    longcode:string,
    gateway:string,
    pay_with_bank:string,
    supports_transfer:string,
    active:string,
    country:string,
    currency:string,
    type:string,
    is_deleted:string,
    created_at:  string,
    updated_at:  string,
}

export interface McdBankApiArrayType{
    apiParameter:McdBankApiObjectType[]
}

export function WithdrawalFormView({
    apiParameter  
}:McdBankApiArrayType) {
    const { toast } = useToast()
    const[isVerified, setisVerified] = useState(false)
    const[isLoading, setIsLoading]=useState<boolean>(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            account_number: "",
            amount:"",
            bank_code:"",
            bank:"",
            wallet:""

        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        const{
            amount,
            account_number,
            bank_code,
            bank,
            wallet
        }=values;
        if(isVerified){
            MakeWithdrawal(
                amount,
                account_number,
                bank_code,
                bank,
                wallet
            ).then((response)=>{
                const{
                    message,
                    status,
                    data
                }=response;
                setIsLoading(false)
                if(status === 200){
                    toast({
                        description:data
                    })
                    setisVerified(false)
                }else{
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description:`${message}`
                    })
                }
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
        }else{
            VerifyBank(
                account_number,
                bank_code
            ).then((response)=>{
                const{
                    message,
                    status,
                    data
                }=response;
                setIsLoading(false)
                if(status === 200){
                    toast({
                        description:data
                    })
                    setisVerified(true)
                }else{
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description:`${message}`
                    })
                }
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
    }

  return (
    <ViewLayout 
        navs={[
            "make withdraw"
        ]}
        >
        <Card className="shadow-none rounded bg-white lg:w-[65%] xl:w-65%] md:w-[65%] sm:w-full xs:w-full">
            <CardHeader className="mb-0">
                <CardTitle>Mega Cheap Data Withdrawal</CardTitle>
                <CardDescription>Fill in Account Details</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <FormField
                        control={form.control}
                        name="account_number"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Account Number</FormLabel>
                            <FormControl>
                                <IconInput
                                    icon={<AvatarIcon className="h-4 w-4" />}
                                >
                                    <Input 
                                        placeholder="Account Number" {...field}
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
                            name="bank_code"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Bank Code</FormLabel>
                                <IconInput
                                    icon={<IdCardIcon className="h-4 w-4" />}
                                >
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        required
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="select bank code" />
                                        </SelectTrigger>
                                        <SelectContent
                                            className="bg-white w-full border-none"
                                        >
                                            {
                                                apiParameter?.map((banklist,index)=>{
                                                    const{
                                                        code,
                                                        name
                                                    }=banklist;
                                                    return(
                                                        <SelectItem value={code} key={index}>{name}</SelectItem>
                                                    )
                                                })
                                            }
                                        </SelectContent>
                                    </Select>
                                </IconInput>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        {
                            isVerified &&(
                                <>
                                <FormField
                                control={form.control}
                                name="bank"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Bank</FormLabel>
                                    <IconInput
                                        icon={<BackpackIcon className="h-4 w-4" />}
                                    >
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            required
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Bank" />
                                            </SelectTrigger>
                                            <SelectContent
                                                className="bg-white w-full border-none"
                                            >
                                                {
                                                    apiParameter.map((banklist,index)=>{
                                                        const{
                                                            name
                                                        }=banklist;
                                                        return(
                                                            <SelectItem value={name} key={index}>{name}</SelectItem>
                                                        )
                                                    })
                                                }
                                            </SelectContent>
                                        </Select>
                                    </IconInput>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <FormField
                                control={form.control}
                                name="wallet"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Wallet</FormLabel>
                                    <IconInput
                                        icon={<BackpackIcon className="h-4 w-4" />}
                                    >
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            required
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select wallet" />
                                            </SelectTrigger>
                                            <SelectContent
                                                className="bg-white w-full border-none"
                                            >
                                                 <SelectItem value="Wallet">Wallet</SelectItem>
                                                 <SelectItem value="Commission">Commission</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </IconInput>
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
                                                required/>
                                        </IconInput>
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                </>
                            )
                        }
                        
                        <div className="flex justify-end items-end">
                            {
                                isLoading?
                                <Button disabled className="text-white">
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin text-white" />
                                    Please wait...
                                </Button>:
                                <Button type="submit" className="text-white" >{isVerified?"Withdraw":"Verify Bank"}</Button>
                            }
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </ViewLayout>
  )
}