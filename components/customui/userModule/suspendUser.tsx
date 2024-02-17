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
import { SuspendUser } from "@/actions/userModule/action";

const formSchema = z.object({
  reason: z.string({
    required_error: "reason field is required.",
  }),
  address: z.string({
    required_error: "address field is required.",
  }),
})

interface userIdPropType{
    id:number,
    modalCloseTrigger :React.MutableRefObject<any>
}

type SuspendPropType={
  id:number
}
export function SuspendUserComponent({
    id
}:SuspendPropType) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("only screen and (min-width: 768px)");
  const modalCloseTrigger = React.useRef(null);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
        <Button variant="outline">Suspend</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Suspend User</DialogTitle>
            <DialogDescription>
                State the reason for user suspension.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm 
            id={id}
            modalCloseTrigger={modalCloseTrigger}
          />
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
        <Button variant="outline">Suspend</Button>
      </DrawerTrigger>
      <DrawerContent className="bg-white p-4">
        <DrawerHeader className="text-left">
          <DrawerTitle>Suspend user</DrawerTitle>
          <DrawerDescription>
            State the reason for user suspension.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm 
          id={id}
          modalCloseTrigger={modalCloseTrigger}
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button 
              variant="outline"
              ref={modalCloseTrigger}
              >Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({ 
    id,
    modalCloseTrigger 
  }:userIdPropType
) {

    const[isLoading, setIsLoading]=useState<boolean>(false);
    const {toast} = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            reason:"",
            address:"",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const {
            reason,
            address
        }=values;
        setIsLoading(true)
        SuspendUser(
            reason,
            id
        ).then((resp)=>{
            const{
                message,
            }=resp;
            setIsLoading(false);
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
            name="reason"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Reason</FormLabel>
                <FormControl>
                    <Input placeholder="reason" {...field} type="text"/>
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
