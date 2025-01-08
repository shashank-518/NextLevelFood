import logoimg from '@/assets/logo.png'
import Link from 'next/link'
import classes from './main-header.module.css'
import Image from 'next/image'
import Navlink from './nav-link/navlink'

export default function Mainheader(){
    
    return(
        <header className=  {classes.header}>
            <Link href="/" className= {classes.logo} > 
                <Image src= {logoimg} alt='Food  on Plate'  priority /> NextLevel Food
            </Link>
        <nav className= {classes.nav} >
            <ul>
                <li>
                    <Navlink href="/meals" >Meals</Navlink>
            
                </li>
                <li>
                <Navlink href="/community" >Foodies Community</Navlink>
                    
                </li>
                
            </ul>

        </nav>
        </header>


    )

}