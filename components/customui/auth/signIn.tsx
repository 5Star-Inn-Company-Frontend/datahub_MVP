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
  email: z.string({
    required_error: "email field is required.",
  }),
  password: z.string({
    required_error: "password field is required.",
  }),
})

export function SignIn() {
    const[isLoading, setIsLoading]=useState<boolean>(false);
    const {toast} = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email:"",
            password:"",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        const {
            email,
            password
        }=values;
        setIsLoading(true)
        LoginAction({
            email,
            password
        }).then((response)=>{
            const{
                status,
                message,
                data
            }=response;
            setIsLoading(false)
            if(status){
                toast({
                    description:`Authenticated as ${data?.user?.email}`
                })
                window.location.href ="/";
            }else{
                toast({
                    variant: "destructive",
                    description:message
                })
            }
        }).catch((error)=>{
            setIsLoading(false);
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
    <div className="h-screen m-auto flex flex-col justify-center items-center lg:w-[33%] xl:w-[33%] md:w-[33%] sm:w-full xs:w-full p-4">
        <Card className="shadow-none rounded bg-white w-full">
            <CardHeader className="mb-0">
                <CardTitle>
                    <div className="flex flex-col justify-center items-center">
                        <div className="rounded-full p-4 bg-[#ff5718]">
                            <AiOutlineUser 
                                size="2rem"
                                color="white"
                            />
                        </div>
                        <Text
                            style="text-center font-semibold text-2xl mt-4"
                            value="Welcome Admin!"
                        />
                    </div>
                </CardTitle>
                <CardDescription className="text-center">kindly login to your account</CardDescription>
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
                                <Input placeholder="shadcn" {...field} type="email"/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} type="password"/>
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
            </CardContent>
        </Card>
    </div>
  )
}