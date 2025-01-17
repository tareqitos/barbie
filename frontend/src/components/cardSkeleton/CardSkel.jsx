
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styles from './CardSkel.module.scss'

function CardSkeleton({ cards }) {
    return (
        <div className={styles['skeleton-wrap-container']}>
            {Array(cards).fill(0).map((_, i) => (
                <div key={i} className={styles['skeleton-container']}>
                    <div className="card">
                        <Skeleton
                            inline='true'
                            containerClassName={styles['flex-skeleton']}
                            className={styles['card-skeleton']}
                            width={250}
                            height={200}
                            baseColor='#c6c6c6'
                            highlightColor='#ffffff'
                        />
                        <Skeleton 
                            inline='true'
                            containerClassName={styles['flex-skeleton']}
                            className={styles['text-skeleton']}
                            width={200}
                            height={30}
                            count={2}
                            highlightColor='#fff'
                        />

                    </div>
                </div>
            ))}
        </div>


    )
}

export default CardSkeleton;