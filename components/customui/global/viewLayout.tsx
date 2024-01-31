"use client"
import { ReactNode } from "react"

type navType={
    navs:string[],
    children:ReactNode
}
export const ViewLayout =({
    navs,
    children
}:navType)=>{
    return(
        <div>
            <div className="mb-4">
                <nav
                    className="w-full rounded-md px-5 py-3 text-[#ff5718] text-sm ">
                    <ol className="list-reset flex">
                        <li>
                            <a
                                href="/"
                                className="text-[#ff5718] text-sm  transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                                >Dashboard
                            </a>
                        </li>
                        <li>
                            <span className="mx-2 text-[#ff5718]-text-sm dark:text-[#ff5718]-text-sm">{">"}</span>
                        </li>
                        {
                            navs.map((link:string,index:any)=>{
                                if(index === (navs.length -1) || navs.length ===1){
                                    return(
                                        <li 
                                            className="flex"
                                            key={index}
                                        > 
                                            <div className="text-neutral-500 dark:text-neutral-300">
                                                {link}
                                            </div>
                                        </li>
                                    )
                                }else{
                                    return(
                                        <li 
                                            className="flex"
                                            key={index}
                                        > 
                                            <div className="text-neutral-500 dark:text-neutral-300 text-sm">
                                                {link}
                                            </div>
                                            <div>
                                                <span className="mx-2 text-neutral-500 dark:text-neutral-300 text-sm">{">"}</span>
                                            </div>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ol>
                </nav>
            </div>
            <div className="w-full overflow-auto pb-4 px-4">
                {children}
            </div>
        </div>
    )
}