"use client"
import { useEffect} from "react";
import { useRouter } from "next/navigation";
import { LogOutUser } from "@/actions/logOut";

type style ={
    style?:string
}

export const Nav =({
    style
}:style)=>{

    const router = useRouter();
    useEffect(() => {
        const init = async () => {
          const { Sidenav, Ripple,Tab,initTE} = await import("tw-elements");
          initTE({ Sidenav, Ripple,Tab});
        };
        init();
      }, []);

    return(
        <nav
            id={`${style?"":"full-screen-example"}`}
            className={`${style?style:"bg-white fixed left-0 top-0 z-[1035] h-screen w-60 -translate-x-full overflow-hidden shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:translate-x-0 dark:bg-zinc-800"}`}
            data-te-sidenav-init
            data-te-sidenav-content="#content">
            <div>
                <ul
                    className="relative m-0 list-none px-[0.2rem]"
                    data-te-sidenav-menu-ref
                    >
                    <li className="relative">
                        <a
                            className="group flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-[#ff5718]-400/10 hover:text-[#ff5718]-600 hover:outline-none focus:bg-[#ff5718]-400/10 focus:text-[#ff5718]-600 focus:outline-none active:bg-[#ff5718]-400/10 active:text-[#ff5718]-600 active:outline-none data-[te-sidenav-state-active]:text-[#ff5718]-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                            href="/"
                            data-te-sidenav-link-ref
                        >
                            <span
                                className="mr-4 [&>svg]:h-3.5 [&>svg]:w-3.5  [&>svg]:transition [&>svg]:duration-300 [&>svg]:ease-linear group-hover:[&>svg]:border-[#ff5718]-600 group-focus:[&>svg]:border-[#ff5718]-600 group-active:[&>svg]:border-[#ff5718]-600 group-[te-sidenav-state-active]:[&>svg]:border-[#ff5718]-600 motion-reduce:[&>svg]:transition-none dark:[&>svg]:fill-gray-300 dark:group-hover:[&>svg]:fill-gray-300 ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                                </svg>
                            </span>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li className="relative">
                        <a
                            className="group flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-[#ff5718]-400/10 hover:text-[#ff5718]-600 hover:outline-none focus:bg-[#ff5718]-400/10 focus:text-[#ff5718]-600 focus:outline-none active:bg-[#ff5718]-400/10 active:text-[#ff5718]-600 active:outline-none data-[te-sidenav-state-active]:text-[#ff5718]-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                            href="#!"
                            data-te-sidenav-link-ref>
                            <span
                                className="mr-4 [&>svg]:h-4 [&>svg]:w-4  [&>svg]:transition [&>svg]:duration-300 [&>svg]:ease-linear group-hover:[&>svg]:border-[#ff5718]-600 group-focus:[&>svg]:border-[#ff5718]-600 group-active:[&>svg]:border-[#ff5718]-600 group-[te-sidenav-state-active]:[&>svg]:border-[#ff5718]-600 motion-reduce:[&>svg]:transition-none dark:[&>svg]:fill-gray-300 dark:group-hover:[&>svg]:fill-gray-300 ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </span>
                            <span>User Module</span>
                            <span
                                className="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 motion-reduce:transition-none [&>svg]:h-3 [&>svg]:w-3 [&>svg]:fill-gray-600 group-hover:[&>svg]:border-[#ff5718]-600 group-focus:[&>svg]:border-[#ff5718]-600 group-active:[&>svg]:border-[#ff5718]-600 group-[te-sidenav-state-active]:[&>svg]:border-[#ff5718]-600 dark:[&>svg]:fill-gray-300"
                                data-te-sidenav-rotate-icon-ref>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512">
                                    <path
                                    d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                                </svg>
                            </span>
                        </a>
                        <ul
                            className="show !visible relative m-0 hidden list-none p-0 data-[te-collapse-show]:block"
                            data-te-sidenav-collapse-ref>
                            <li className="relative">
                                <a
                                    className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-[#ff5718]-400/10 hover:text-[#ff5718]-600 hover:outline-none focus:bg-[#ff5718]-400/10 focus:text-[#ff5718]-600 focus:outline-none active:bg-[#ff5718]-400/10 active:text-[#ff5718]-600 active:outline-none data-[te-sidenav-state-active]:text-[#ff5718]-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                                    data-te-sidenav-link-ref
                                    href="#"
                                    onClick={()=>router.push("/user_module/all_users")}
                                    >All Users</a
                                >
                            </li>
                        </ul>
                    </li>
                    <li className="relative">
                        <a
                            className="group flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-[#ff5718]-400/10 hover:text-[#ff5718]-600 hover:outline-none focus:bg-[#ff5718]-400/10 focus:text-[#ff5718]-600 focus:outline-none active:bg-[#ff5718]-400/10 active:text-[#ff5718]-600 active:outline-none data-[te-sidenav-state-active]:text-[#ff5718]-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                            href="#!"
                            data-te-sidenav-link-ref>
                            <span
                                className="mr-4 [&>svg]:h-4 [&>svg]:w-4  [&>svg]:transition [&>svg]:duration-300 [&>svg]:ease-linear group-hover:[&>svg]:border-[#ff5718]-600 group-focus:[&>svg]:border-[#ff5718]-600 group-active:[&>svg]:border-[#ff5718]-600 group-[te-sidenav-state-active]:[&>svg]:border-[#ff5718]-600 motion-reduce:[&>svg]:transition-none dark:[&>svg]:fill-gray-300 dark:group-hover:[&>svg]:fill-gray-300 ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
                                </svg>
                            </span>
                            <span>Report</span>
                            <span
                                className="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 motion-reduce:transition-none [&>svg]:h-3 [&>svg]:w-3 [&>svg]:fill-gray-600 group-hover:[&>svg]:border-[#ff5718]-600 group-focus:[&>svg]:border-[#ff5718]-600 group-active:[&>svg]:border-[#ff5718]-600 group-[te-sidenav-state-active]:[&>svg]:border-[#ff5718]-600 dark:[&>svg]:fill-gray-300"
                                data-te-sidenav-rotate-icon-ref>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512">
                                    <path
                                    d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                                </svg>
                            </span>
                        </a>
                        <ul
                            className="show !visible relative m-0 hidden list-none p-0 data-[te-collapse-show]:block"
                            data-te-sidenav-collapse-ref>
                            <li className="relative">
                                <a
                                    className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-[#ff5718]-400/10 hover:text-[#ff5718]-600 hover:outline-none focus:bg-[#ff5718]-400/10 focus:text-[#ff5718]-600 focus:outline-none active:bg-[#ff5718]-400/10 active:text-[#ff5718]-600 active:outline-none data-[te-sidenav-state-active]:text-[#ff5718]-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                                    data-te-sidenav-link-ref
                                    href="/report/monthly"
                                    >Monthly Report
                                </a>
                            </li>
                            <li className="relative">
                                <a
                                    className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-[#ff5718]-400/10 hover:text-[#ff5718]-600 hover:outline-none focus:bg-[#ff5718]-400/10 focus:text-[#ff5718]-600 focus:outline-none active:bg-[#ff5718]-400/10 active:text-[#ff5718]-600 active:outline-none data-[te-sidenav-state-active]:text-[#ff5718]-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                                    data-te-sidenav-link-ref
                                    href="/report/yearly"
                                    >Yearly Report
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="relative">
                        <a
                            className="group flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-[#ff5718]-400/10 hover:text-[#ff5718]-600 hover:outline-none focus:bg-[#ff5718]-400/10 focus:text-[#ff5718]-600 focus:outline-none active:bg-[#ff5718]-400/10 active:text-[#ff5718]-600 active:outline-none data-[te-sidenav-state-active]:text-[#ff5718]-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                            href="#!"
                            data-te-sidenav-link-ref>
                            <span
                                className="mr-4 [&>svg]:h-4 [&>svg]:w-4  [&>svg]:transition [&>svg]:duration-300 [&>svg]:ease-linear group-hover:[&>svg]:border-[#ff5718]-600 group-focus:[&>svg]:border-[#ff5718]-600 group-active:[&>svg]:border-[#ff5718]-600 group-[te-sidenav-state-active]:[&>svg]:border-[#ff5718]-600 motion-reduce:[&>svg]:transition-none dark:[&>svg]:fill-gray-300 dark:group-hover:[&>svg]:fill-gray-300 ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                                </svg>
                            </span>
                            <span>Transactions</span>
                            <span
                                className="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 motion-reduce:transition-none [&>svg]:h-3 [&>svg]:w-3 [&>svg]:fill-gray-600 group-hover:[&>svg]:border-[#ff5718]-600 group-focus:[&>svg]:border-[#ff5718]-600 group-active:[&>svg]:border-[#ff5718]-600 group-[te-sidenav-state-active]:[&>svg]:border-[#ff5718]-600 dark:[&>svg]:fill-gray-300"
                                data-te-sidenav-rotate-icon-ref>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512">
                                    <path
                                    d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                                </svg>
                            </span>
                        </a>
                        <ul
                            className="show !visible relative m-0 hidden list-none p-0 data-[te-collapse-show]:block"
                            data-te-sidenav-collapse-ref>
                            <li className="relative">
                            <ul
                                className="relative m-0 list-none px-[0.2rem]"
                                data-te-sidenav-menu-ref
                                >
                                <li className="relative">
                                    <a
                                        className="group flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.82rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-[#ff5718]-400/10 hover:text-[#ff5718]-600 hover:outline-none focus:bg-[#ff5718]-400/10 focus:text-[#ff5718]-600 focus:outline-none active:bg-[#ff5718]-400/10 active:text-[#ff5718]-600 active:outline-none data-[te-sidenav-state-active]:text-[#ff5718]-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                                        href="#!"
                                        data-te-sidenav-link-ref>
                                        <span>Users</span>
                                        <span
                                            className="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 motion-reduce:transition-none [&>svg]:h-3 [&>svg]:w-3 [&>svg]:fill-gray-600 group-hover:[&>svg]:border-[#ff5718]-600 group-focus:[&>svg]:border-[#ff5718]-600 group-active:[&>svg]:border-[#ff5718]-600 group-[te-sidenav-state-active]:[&>svg]:border-[#ff5718]-600 dark:[&>svg]:fill-gray-300"
                                            data-te-sidenav-rotate-icon-ref>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 448 512">
                                                <path
                                                d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                                            </svg>
                                        </span>
                                    </a>
                                    <ul
                                        className="show !visible relative m-0 hidden list-none p-0 data-[te-collapse-show]:block"
                                        data-te-sidenav-collapse-ref>
                                        <li className="relative">
                                            <a
                                                className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-[#ff5718]-400/10 hover:text-[#ff5718]-600 hover:outline-none focus:bg-[#ff5718]-400/10 focus:text-[#ff5718]-600 focus:outline-none active:bg-[#ff5718]-400/10 active:text-[#ff5718]-600 active:outline-none data-[te-sidenav-state-active]:text-[#ff5718]-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                                                data-te-sidenav-link-ref
                                                href="/transactions/users/active"
                                                > Active</a
                                            >
                                        </li>
                                        <li className="relative">
                                            <a
                                                className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-[#ff5718]-400/10 hover:text-[#ff5718]-600 hover:outline-none focus:bg-[#ff5718]-400/10 focus:text-[#ff5718]-600 focus:outline-none active:bg-[#ff5718]-400/10 active:text-[#ff5718]-600 active:outline-none data-[te-sidenav-state-active]:text-[#ff5718]-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                                                data-te-sidenav-link-ref
                                                href="/transactions/users/dormant"
                                                > Dormant</a
                                            >
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li className="relative">
                            <a
                                className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-[#ff5718]-400/10 hover:text-[#ff5718]-600 hover:outline-none focus:bg-[#ff5718]-400/10 focus:text-[#ff5718]-600 focus:outline-none active:bg-[#ff5718]-400/10 active:text-[#ff5718]-600 active:outline-none data-[te-sidenav-state-active]:text-[#ff5718]-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                                data-te-sidenav-link-ref
                                href="/transactions/pending_trasactions"
                                >Pending Transactions</a
                            >
                        </li>
                        <li className="relative">
                            <a
                                className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-[#ff5718]-400/10 hover:text-[#ff5718]-600 hover:outline-none focus:bg-[#ff5718]-400/10 focus:text-[#ff5718]-600 focus:outline-none active:bg-[#ff5718]-400/10 active:text-[#ff5718]-600 active:outline-none data-[te-sidenav-state-active]:text-[#ff5718]-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                                data-te-sidenav-link-ref
                                href="/transactions/reversed_transactions"
                                >Reversed Transactions</a
                            >
                        </li>
                        <li className="relative">
                            <a
                                className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-[#ff5718]-400/10 hover:text-[#ff5718]-600 hover:outline-none focus:bg-[#ff5718]-400/10 focus:text-[#ff5718]-600 focus:outline-none active:bg-[#ff5718]-400/10 active:text-[#ff5718]-600 active:outline-none data-[te-sidenav-state-active]:text-[#ff5718]-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                                data-te-sidenav-link-ref
                                href="/transactions/airtime_to_cash"
                                >Airtime to Cash</a
                            >
                        </li>
                        <li className="relative">
                            <a
                                className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-[#ff5718]-400/10 hover:text-[#ff5718]-600 hover:outline-none focus:bg-[#ff5718]-400/10 focus:text-[#ff5718]-600 focus:outline-none active:bg-[#ff5718]-400/10 active:text-[#ff5718]-600 active:outline-none data-[te-sidenav-state-active]:text-[#ff5718]-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                                data-te-sidenav-link-ref
                                href="/transactions/virtual_account"
                                >Virtual Accounts</a
                            >
                        </li>
                        <li className="relative">
                            <a
                                className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-[#ff5718]-400/10 hover:text-[#ff5718]-600 hover:outline-none focus:bg-[#ff5718]-400/10 focus:text-[#ff5718]-600 focus:outline-none active:bg-[#ff5718]-400/10 active:text-[#ff5718]-600 active:outline-none data-[te-sidenav-state-active]:text-[#ff5718]-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                                data-te-sidenav-link-ref
                                href="/transactions/all_transactions"
                                >All Transactions</a
                            >
                        </li>
                        </ul>
                    </li>
                </ul>
                <hr className="border-gray-300" />
                <ul className="relative m-0 list-none px-[0.2rem]">
                    <li className="relative">
                        <a
                            className="group flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-[#ff5718]-400/10 hover:text-[#ff5718]-600 hover:outline-none focus:bg-[#ff5718]-400/10 focus:text-[#ff5718]-600 focus:outline-none active:bg-[#ff5718]-400/10 active:text-[#ff5718]-600 active:outline-none data-[te-sidenav-state-active]:text-[#ff5718]-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                            href="#"
                            data-te-sidenav-link-ref
                            onClick={()=>{
                                LogOutUser()
                            }}
                        >
                            <span
                                className="mr-4 [&>svg]:h-3.5 [&>svg]:w-3.5  [&>svg]:transition [&>svg]:duration-300 [&>svg]:ease-linear group-hover:[&>svg]:border-[#ff5718]-600 group-focus:[&>svg]:border-[#ff5718]-600 group-active:[&>svg]:border-[#ff5718]-600 group-[te-sidenav-state-active]:[&>svg]:border-[#ff5718]-600 motion-reduce:[&>svg]:transition-none dark:[&>svg]:fill-gray-300 dark:group-hover:[&>svg]:fill-gray-300 ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                            </svg>
                            </span>
                            <span>Log Out</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
