"use client"

import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { ReloadIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { ModifyPendingStatus } from "@/actions/transactionModule/pending_transactions/server/action"

type Checked = DropdownMenuCheckboxItemProps["checked"]
type dropdownPropType ={
    id:number
}
export function PendingStatusDropdownMenuCheckboxes({
    id
}:dropdownPropType) {
  const { toast } = useToast();
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)
  const [showPending, setShowPending] = React.useState<Checked>(false);
  const [showFailed, setShowFailed] = React.useState<Checked>(false);
  const [isLoading, setIsLoading] = React.useState<Checked>(false);
  const MarkStatus =(modifyto:string)=>{
    setIsLoading(true);
    ModifyPendingStatus(
        id,
        modifyto
    ).then((response)=>{
        const{
            message,
            error
        }=response;
        setIsLoading(false);
        if(error){
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description:`${error}`
            }) 
            return;
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
    <div>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <DotsHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          {/* Status */}
        </DropdownMenuLabel>
        {
          isLoading?
            <Button disabled>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
            </Button>:
            (
              <>
              <DropdownMenuCheckboxItem
              checked={showStatusBar}
              onCheckedChange={()=>{
                setShowStatusBar((prevState)=>{
                    return !prevState
                })
                MarkStatus("4")
              }
            }
            >
              Reverse Transaction
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showPanel}
              onCheckedChange={()=>{
                setShowPanel((prevState)=>{
                    return !prevState
                })
                MarkStatus("1")
                }
            }
            >
              Mark as SuccessFull
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showPending}
              onCheckedChange={()=>{
                setShowPending((prevState)=>{
                    return !prevState
                })
                MarkStatus("0")
                }
            }
            >
              Mark as Pending
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showFailed}
              onCheckedChange={()=>{
                setShowFailed((prevState)=>{
                    return !prevState
                })
                MarkStatus("2")
                }
            }
            >
              Mark as Failed
            </DropdownMenuCheckboxItem>
            </>
            )
        }
        {/* <DropdownMenuSeparator /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
  )
}

