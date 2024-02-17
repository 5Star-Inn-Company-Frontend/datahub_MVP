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
  DialogClose,
  DialogFooter,
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
import { ModifyUser} from "@/actions/userModule/action";
import { UserDetailsPropType } from "../transactionModule/users/active/activeUsers";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
  phone: z.string({
    required_error: "phone field is required.",
  }),
  address: z.string({
    required_error: "address field is required.",
  }),
  email: z.string({
    required_error: "Email field is required.",
  }),
  status: z.number({
    required_error: "Status field is required.",
  }),
  status_reason: z.string({
    required_error: "Status reason field is required.",
  }),
  pin: z.string({
    required_error: "Pin field is required.",
  }),
  bvn: z.string(),
  bank_code: z.string({
    required_error: "Bank Code field is required.",
  }),
  account_name: z.string({
    required_error: "Account Number field is required.",
  }),
  account_number: z.string({
    required_error: "Account Name field is required.",
  }),
})

interface profileFormPropType{
  id:number,
  modalCloseTrigger :React.MutableRefObject<any>,
  data:UserDetailsPropType
}

type ModifyPropType={
  id:number,
  data:UserDetailsPropType
}

export function ModifyUserComponent({
    id,
    data
}:ModifyPropType) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("only screen and (min-width: 768px)");
  const modalCloseTrigger = React.useRef(null);

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
          <div className="h-[50vh] w-full overflow-y-auto p-2">
            <ProfileForm 
              id={id}
              modalCloseTrigger={modalCloseTrigger}
              data={data}
            />
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button 
                type="button" 
                variant="secondary"
                ref={modalCloseTrigger}
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
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
        <ScrollArea className="h-[50vh] w-full">
            <ProfileForm 
              id={id}
              modalCloseTrigger={modalCloseTrigger}
              data={data}
            />
        </ScrollArea>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline" ref={modalCloseTrigger}>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({ 
  id,
  modalCloseTrigger,
  data
}:profileFormPropType) {

    const[isLoading, setIsLoading]=useState<boolean>(false);
    const {toast} = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          phone:(data?.phone!==null)?data?.phone:"null",
          address:(data?.address!==null)?data?.address:"null",
          email:(data?.email!==null)?data?.email:"null",
          status: data?.status,
          status_reason:(data?.status_reason!==null)?data?.status_reason:"null",
          pin:(data?.pin!==null)?data?.pin:"null",
          bvn: (data?.bvn!==null)?data?.bvn:"null",
          bank_code: (data?.bank_code!==null)?data?.bank_code:"null",
          account_name: (data?.account_name!==null)?data?.account_name:"null",
          account_number:(data?.account_number!==null)?data?.account_number:"null"
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const {
            phone,
            address,
            email,
            status,
            status_reason,
            pin,
            bvn,
            bank_code,
            account_name,
            account_number
        }=values;
        setIsLoading(true)
       ModifyUser(
            id,
            address,
            phone,
            email,
            status,
            status_reason,
            pin,
            bvn,
            bank_code,
            account_name,
            account_number
        ).then((response)=>{
            const{
                message,
            }=response;
            setIsLoading(false)
            if(modalCloseTrigger.current){
              modalCloseTrigger.current?.click();
            }
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
            <FormField
              control={form.control}
              name="bvn"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Bvn</FormLabel>
                  <FormControl>
                      <Input placeholder="bvn" {...field} type="text"/>
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                      <Input placeholder="status" {...field} type="text"/>
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status_reason"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Status Reason</FormLabel>
                  <FormControl>
                      <Input placeholder="status reason" {...field} type="text"/>
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
              name="pin"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Pin</FormLabel>
                  <FormControl>
                      <Input placeholder="pin" {...field} type="text"/>
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
                  <FormControl>
                      <Input placeholder="bank code" {...field} type="text"/>
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="account_name"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Account Name</FormLabel>
                  <FormControl>
                      <Input placeholder="account name" {...field} type="text"/>
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="account_number"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                      <Input placeholder="account Number" {...field} type="text"/>
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