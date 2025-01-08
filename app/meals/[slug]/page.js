import {getmeal } from "@/lib/meals";
import classes from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";


export async function generateMetadata({params}){
  const data = getmeal(params.slug)

  return {
    title : data.title , 
    descrption : data.summary
  }

} 


export default function Dynamic({ params }) {

    const Meals = getmeal(params.slug)
    
    if(!Meals){
        notFound()
    }

    Meals.instructions = Meals.instructions.replace(/\n/g , '<br/>' )

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={Meals.image} alt={Meals.title}  fill />
        </div>
        <div className={classes.headerText}>
          <h1>{Meals.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${Meals.creator_email}`}>{Meals.creator}</a>
          </p>
          <p className={classes.summary}> {Meals.summary} </p>
        </div>
      </header>

      <main>
        <p className={classes.instructions} dangerouslySetInnerHTML={{__html: Meals.instructions}} />
      </main>
    </>
  );
}
