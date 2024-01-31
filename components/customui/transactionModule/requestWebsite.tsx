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

const formSchema = z.object({
  refer_text: z.string({
    required_error: "Referer number is required.",
  }),
  amount: z.number({
    required_error: "Amount is required.",
  }),
})

export function Request_website() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            refer_text: "",
            amount:0
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

  return (
    <Card  className="shadow-none rounded border">
        <CardHeader className="mb-0">
            <CardTitle>Request a website</CardTitle>
            <CardDescription>kindly enter the request text and the amount</CardDescription>
        </CardHeader>
        <CardContent className="mb-0">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <FormField
                    control={form.control}
                    name="refer_text"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Request</FormLabel>
                        <FormControl>
                            <Input placeholder="request" {...field} />
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
                        <Button type="submit" className="text-white" >Submit</Button>
                    </div>
                </form>
             </Form>
        </CardContent>
    </Card>
  )
}
