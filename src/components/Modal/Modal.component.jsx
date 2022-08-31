import { ReactComponent as CloseIcon } from "icons/close.svg"

import styles from "./Modal.module.sass"

const Modal = ({ title, icon, show, children, button, onClose }) => {
    const computeClass = show ? `${styles.Modal} ${styles.Modal___show}` : styles.Modal

    return (
        <div className={computeClass}>
            <div className={styles.Modal_wrapper}>
                <div className={styles.Modal_header}>
                    <div className={styles.Modal_title}>
                        {icon}
                        <span>{title}</span>
                    </div>
                    <CloseIcon onClick={onClose} />
                </div>
                <div className={styles.Modal_body}>
                    {children}
                </div>
                {button && (
                    <div className={styles.Modal_actions}>
                        <button
                            className={styles.Modal_cta}
                            style={button.cancel.styles}
                            onClick={button.cancel.handler}
                        >
                            {button.cancel.title}
                        </button>
                        <button
                            className={styles.Modal_cta}
                            style={button.confirm.styles}
                            onClick={button.confirm.handler}
                        >
                            {button.confirm.title}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Modal
