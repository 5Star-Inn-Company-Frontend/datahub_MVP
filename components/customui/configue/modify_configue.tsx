"use client";
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select" 
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
import { ReloadIcon } from "@radix-ui/react-icons";
import { configObjectProp } from "./Configue_list";
import { ModifyConfgueAction } from "@/actions/configue/action";

const formSchema = z.object({
  ppkey: z.string({
    required_error: "PPkey field is required.",
  }),
  charges: z.string({
    required_error: "charges field is required.",
  }),
  status: z.string({
    required_error: "Status field is required.",
  })
})

interface profileFormPropType{
  id:number,
  modalCloseTrigger :React.MutableRefObject<any>,
  data:configObjectProp
}

type ModifyPropType={
  id:number,
  data:configObjectProp
}

export function ModifyConfigue({
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
            <DialogTitle>Modify Config</DialogTitle>
            <DialogDescription>
                {/* Edit user's informations. */}
            </DialogDescription>
          </DialogHeader>
            <ProfileForm 
              id={id}
              modalCloseTrigger={modalCloseTrigger}
              data={data}
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
        <Button variant="outline">Modify</Button>
      </DrawerTrigger>
      <DrawerContent className="bg-white p-4">
        <DrawerHeader className="text-left">
          <DrawerTitle>Modify Config</DrawerTitle>
          <DrawerDescription>
            {/* Edit user's informations. */}
          </DrawerDescription>
        </DrawerHeader>
            <ProfileForm 
              id={id}
              modalCloseTrigger={modalCloseTrigger}
              data={data}
            />
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
          status: (data?.status!==null)?data?.status?.toString():"null",
          ppkey:(data?.ppkey!==null)?data?.ppkey?.toString():"null",
          charges:(data?.charges!==null)?data?.charges?.toString():"null",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const {
            ppkey,
            status,
            charges,
        }=values;
        setIsLoading(true)
        ModifyConfgueAction(
            id,
            Number(status),
            ppkey,
            Number(charges),
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
        }).catch((error:any)=>{
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
              name="ppkey"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>PPkey</FormLabel>
                  <FormControl>
                      <Input placeholder="ppkey" {...field} type="text"/>
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="charges"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Charges</FormLabel>
                  <FormControl>
                      <Input placeholder="charges" {...field} type="text"/>
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Modify  Status" />
                    </SelectTrigger>
                    <SelectContent
                        className="bg-white"
                    >
                        <SelectItem value="1">Enable</SelectItem>
                        <SelectItem value="0">Disable</SelectItem>
                    </SelectContent>
                </Select>
                  <FormMessage />
                  </FormItem>
              )}
            />
            
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
  )
}