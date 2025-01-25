
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styles from './CardSkel.module.scss'

function CardSkeleton({ cards }) {
    return (
        <div className={styles['skeleton-wrap-container']}>
            {Array(cards).fill(0).map((_, i) => (
                <div key={i} className={styles['skeleton-container']}>
                    <div className={styles["card"]}>
                        <Skeleton
                            inline='true'
                            containerClassName={styles['flex-skeleton']}
                            className={styles['card-skeleton']}
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

export function GameSkeleton() {
    return (
        <>
            <div className={styles["main-skeleton-wrapper"]}>
                <div className={styles["game-skeleton-wrapper"]}>
                    <Skeleton
                        className={styles['text-skeleton']}
                        width={400}
                        height={50}
                        highlightColor='#fff'
                    />
                    <div className={styles['game-skeleton-container']}>
                        <div className={styles["card"]}>
                            <Skeleton
                                inline='true'
                                containerClassName={styles['flex-skeleton']}
                                className={styles['card-skeleton']}
                                width={500}
                                height={400}
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
                </div>
                <div className={styles["game-skeleton-wrapper"]}>
                    <Skeleton
                        className={styles['text-skeleton']}

                        height={50}
                        highlightColor='#fff'
                    />
                    <div className={`${styles['game-skeleton-container']} ${styles['req']}`}>
                        <div className={styles["card"]}>
                            <Skeleton
                                inline='true'
                                containerClassName={styles['flex-skeleton']}
                                className={styles['text-skeleton']}
                                height={30}
                                count={4}
                                highlightColor='#fff'
                            />
                        </div>
                    </div>
                    <Skeleton
                        className={styles['text-skeleton']}

                        height={50}
                        highlightColor='#fff'
                    />
                    <div className={`${styles['game-skeleton-container']} ${styles['req']}`}>
                        <div className={styles["card"]}>
                            <Skeleton
                                inline='true'
                                containerClassName={styles['flex-skeleton']}
                                className={styles['text-skeleton']}
                                width={200}
                                height={30}
                                count={4}
                                highlightColor='#fff'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default CardSkeleton;