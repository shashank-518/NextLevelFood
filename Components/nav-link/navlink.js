"use client";
import Link from "next/link"
import classes from './navlink.module.css'
import { usePathname } from "next/navigation"

export default function Navlink({href , children}){
    const path = usePathname()

    return(
        <Link href={href} className={path.startsWith(href) ? classes.active : undefined} > {children} </Link>
    )
}