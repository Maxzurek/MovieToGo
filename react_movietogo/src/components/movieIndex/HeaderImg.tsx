import { theMovieDbImages } from '../../endpoints'
import styles from './headerImg.module.css'

interface headerImgProps {
    title?: string,
    overview?: string
    image?: string,
    posterImg?: string,
}


export default function HeaderImg(props: headerImgProps) {

    return (
        <div className={styles.container}>
            <img src={`${theMovieDbImages + props.image}`} alt="Test" style={{ width: '100%' }} />
            <div className={styles.top_left}>
                <div className={styles.headerImgoverlaytitle}>
                    <p>{props.title}</p>
                </div>
                <div className={styles.headerImgoverlaydesc}>
                    <p>{props.overview}</p>
                </div>
            </div>
        </div>
    )



}