import React from 'react'
import { theMovieDbImages } from '../../endpoints'
import styles from './headerImg.module.css'

interface headerImgProps {
    title?: string,
    overview?: string
    image?: string,
    posterImg?:string,
}


export default function HeaderImg(props: headerImgProps) {

    return (
        <div className={styles.headerImg}
            style={{
                background: `url(${theMovieDbImages + props.image}) no-repeat`
            }}
        >

            {/* <div className={styles.headerDetailsposter}> */}
              {/* //  <img  className={styles.headerDetailsposter_img} src={theMovieDbImages + props.posterImg} /> */}
                {/* <Image  src={theMovieDbImages + props.posterImg} floated='right' size='medium' /> */}
            
            {/* </div> */}

         <div className={styles.headerImgoverlay}>
          
                <h3 className={styles.headerImgoverlay__title}>{props.title}</h3>
                <p className={styles.headerImgoverlay__desc}>{props.overview}</p>
            </div>
        </div>
    )



}