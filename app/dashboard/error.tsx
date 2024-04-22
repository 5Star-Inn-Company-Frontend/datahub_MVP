'use client' // Error components must be Client Components
import { Button } from "@/components/ui/button";
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-center text-md mb-4">Unable to load this page!</h2>
      <h2 className="text-center text-sm mb-4">{error.message ||  "Something went wrong!"}</h2>
      <Button
            onClick={()=>reset()}
            className="bg-black text-white border-white"
        >
           Try Again
        </Button>
    </div>
  )
}