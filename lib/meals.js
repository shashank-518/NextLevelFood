
import fs from 'node:fs'
import sql from 'better-sqlite3'
import slugify from 'slugify'
import xss from 'xss'


const db = sql('meals.db')

export default async function getmeals() {
    await  new Promise(resolve => setTimeout(resolve , 2000))
    return db.prepare('SELECT * FROM meals').all()
}

export  function getmeal(slug){
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug)
}

export async function saveMeal(meals){

    meals.slug = slugify(meals.title , {lower:true});
    meals.instructions = xss(meals.instructions)

    const extension = meals.image.name.split('.').pop()
    const fileName = `${meals.slug}.${extension}`

    console.log(fileName)

    const fileStream = fs.createWriteStream(`public/images/${fileName}`)

    const bufferedImage = await meals.image.arrayBuffer()

    fileStream.write(Buffer.from(bufferedImage) , (error)=>{
        if(error){
            throw new Error('Saving Image Failed');
        }
    })

    meals.image = `/images/${fileName}`


    db.prepare(`
        INSERT INTO meals 
        (slug , title , image , summary , instructions , creator , creator_email )
        values(
        @slug,
         @title,
         @image,
         @summary,
         @instructions,
         @creator,
         @creator_email
        )
        `).run(meals)

}

