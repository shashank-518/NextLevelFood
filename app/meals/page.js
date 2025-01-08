import Link from "next/link";
import classes from './page.module.css'
import MealsGrid from "@/Components/meals/meals-grid";
import getmeals from "@/lib/meals";
import { Suspense } from "react";


async function GetMeals(){
    const meals = await getmeals()

    return  <MealsGrid meals={meals} />
}

export const metadata = {
    title: 'All Meals',
    descrption : 'This is a food list'
  }
  

export default async function Meals(){


    return (
       <>
       <header className={classes.header}>
            <h1>
                Delicious meals , Created by {' '}
                <span className={classes.highlight}>By you</span>
            </h1>
            <p>Choose your fav food and cook it yourself. It is easy and fun</p>
            <p className={classes.cta}>
                <Link href="/meals/share" >
                    Share Your Favourite recipe
                </Link>
            </p>
       </header>
       <main>
            <Suspense fallback = {<p className={classes.loading} >Fetching Meals</p>} >
                <GetMeals/>
            </Suspense>
       </main>
       </>
    )
}