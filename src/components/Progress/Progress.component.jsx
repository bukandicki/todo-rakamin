import { ReactComponent as XIcon } from "icons/x-circle.svg"
import { ReactComponent as CheckIcon } from "icons/checklist.svg"

import styles from "./Progress.module.sass"

const Progress = ({ progress }) => {
    return (
        <div className={styles.Progress}>
            <div className={styles.Progress_bar}>
                <div
                    className={styles.Progress_value}
                    style={{
                        width: `${progress}%`,
                        backgroundColor: progress >= 100 ? "#43936C" : "#01959F"
                    }}
                />
            </div>
            <div className={styles.Progress_status}>
                {progress >= 100 ? <CheckIcon /> : `${progress > 100 ? 100 : progress}%` }
            </div>
        </div>
    )
}

export default Progress
