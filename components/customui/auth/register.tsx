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
import { RegisterAction } from "@/actions/auth/register"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AiOutlineUser } from "react-icons/ai"

const formSchema = z.object({
  firstname: z.string({
    required_error: "first name field is required.",
  }),
  lastname: z.string({
    required_error: "last name field is required.",
  }),
  address: z.string({
    required_error: "address field is required.",
  }),
  phone: z.string({
    required_error: "phone number field is required.",
  }),
  gender: z.string({
    required_error: "gender field is required.",
  }),
  dob: z.string({
    required_error: "date of birth field is required.",
  }),
  email: z.string({
    required_error: "email field is required.",
  }).email("Inavlid email address"),
  password: z.string({
    required_error: "password field is required.",
  }).min(6,{ message:"Password must be at least 6 characters"}),
  cpassword: z.string({
    required_error: "password field is required.",
  }).min(6,{ message:"Password must be at least 6 characters"}),
}).refine((data)=>data.password === data.cpassword,{
    path:['cpassword'],
    message:"Passwords does not match"
})

export function Register() {
    const[isLoading, setIsLoading]=useState<boolean>(false);
    const router = useRouter()
    const {toast} = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
            lastname:"",
            email:"",
            phone:"",
            dob:"",
            password:"",
            cpassword:"",
            address:"",
            gender:""

        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const {
            firstname,
            lastname,
            address,
            phone,
            gender,
            dob,
            email,
            password
        }=values
        console.log(values)
        setIsLoading(true)
        RegisterAction({
            firstname,
            lastname,
            address,
            phone,
            gender,
            dob,
            email,
            password
        }).then((response)=>{
            const{
                status,
                message
            }=response;
            setIsLoading(false)
            if(status){
                toast({
                    description:message
                })
            router.push("/auth/signin")
            }else{
                toast({
                    variant: "destructive",
                    description:`${message?.email !=="undefined" && message?.email}${" "}${message?.phone !=="undefined" && message?.phone}`
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

  return (
    <div className="h-screen m-auto flex flex-col justify-center items-center lg:w-[33%] xl:w-[33%] md:w-[33%] sm:w-full xs:w-full p-4">
        <ScrollArea className="flex flex-col justify-between h-[80%] w-full">
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
                            style="text-center font-semibold text-md text-2xl"
                            value="Welcome Admin!"
                        />
                    </div>
                </CardTitle>
                <CardDescription className="text-center">kindly Create An Account</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input placeholder="enter first name" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input placeholder="lastname" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="email" {...field} type="email"/>
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
                                <Input placeholder="password" {...field} type="password"/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="cpassword"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input placeholder="confirm the password entered" {...field} type="password"/>
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
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input placeholder="phone number" {...field} type="tel"/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <FormControl>
                                <Input placeholder="gender" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input placeholder="address" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl>
                                <Input placeholder="date" {...field} type="date"/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div className="flex items-center my-2">
                            <Text
                                style="text-sm me-2"
                                value="Already have an account?"
                            />
                            <Link href="/auth/signin" className="text-sm">Login</Link>
                        </div>
                        <div className="flex justify-end items-end">
                            {
                                isLoading?
                                <Button type="submit" disabled className="text-white w-full text-center bg-black" >Sending request...</Button>: 
                                <Button type="submit" className="text-white w-full text-center bg-black" >Submit</Button>
                            }
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
        </ScrollArea>
    </div>
  )
}