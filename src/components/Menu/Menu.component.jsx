import { ReactComponent as ArrowRightIcon } from "icons/arrow-right.svg"
import { ReactComponent as ArrowLeftIcon } from "icons/arrow-left.svg"
import { ReactComponent as EditIcon } from "icons/edit-alt.svg"
import { ReactComponent as TrashIcon } from "icons/trash-alt.svg"

import styles from "./Menu.module.sass"

const Menu = ({ onMoveRight, onMoveLeft, onEdit, onDelete }) => {
    return (
        <div className={styles.Menu}>
            <ul className={styles.Menu_actions}>
                <li
                    role="button"
                    className={styles.Menu_actions__item}
                    onClick={onMoveRight}
                >
                    <ArrowRightIcon />
                    <span>Move Right</span>
                </li>
                <li
                    role="button"
                    className={styles.Menu_actions__item}
                    onClick={onMoveLeft}
                >
                    <ArrowLeftIcon />
                    <span>Move Left</span>
                </li>
                <li
                    role="button"
                    className={styles.Menu_actions__item}
                    onClick={onEdit}
                >
                    <EditIcon />
                    <span>Edit</span>
                </li>
                <li
                    role="button"
                    className={styles.Menu_actions__item}
                    onClick={onDelete}
                >
                    <TrashIcon />
                    <span>Delete</span>
                </li>
            </ul>
        </div>
    )
}

export default Menu
