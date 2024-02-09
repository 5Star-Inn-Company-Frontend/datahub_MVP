"use client";
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { TableCell } from "@/components/ui/table"
import { useMediaQuery } from "@uidotdev/usehooks";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { ModifyUser} from "@/actions/userModule/action";

const formSchema = z.object({
  phone: z.string({
    required_error: "phone field is required.",
  }),
  address: z.string({
    required_error: "address field is required.",
  }),
})

interface userIdPropType{
    id:number
}
export function ModifyUserComponent({
    id
}:userIdPropType) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("only screen and (min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant="outline">Modify</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Modify User</DialogTitle>
            <DialogDescription>
                Edit user's informations.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm id={id}/>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Modify</Button>
      </DrawerTrigger>
      <DrawerContent className="bg-white p-4">
        <DrawerHeader className="text-left">
          <DrawerTitle>Modify user</DrawerTitle>
          <DrawerDescription>
            Edit user's informations.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm id={id}/>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({ id }:userIdPropType) {

    const[isLoading, setIsLoading]=useState<boolean>(false);
    const {toast} = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phone:"",
            address:"",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        const {
            phone,
            address
        }=values;
        setIsLoading(true)
       ModifyUser(
            id,
            address,
            phone
        ).then((response)=>{
            const{
                message,
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
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                    <Input placeholder="phone" {...field} type="tel"/>
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
                    <Input placeholder="address" {...field} type="text"/>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <div className="flex justify-end items-end">
                {
                    isLoading?
                        <Button type="submit" disabled className="text-white w-full text-center bg-black" >Sending request...</Button>:
                        <Button type="submit" className="text-white w-full text-center bg-black" >Submit</Button>
                }
            </div>
        </form>
    </Form>
  )
}