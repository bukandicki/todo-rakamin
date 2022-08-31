import { useEffect, useState } from "react"
import styles from "./Form.module.sass"

const Form = ({ name, progress, onSubmit, common }) => {
    let timeout

    const [commonForm, setCommonForm] = useState(true)
    const [nameValue, setNameValue] = useState("")
    const [title, setTitleValue] = useState("")
    const [description, setDescriptionValue] = useState("")
    const [progressValue, setProgressValue] = useState(0)

    useEffect(() => {
        if (common === undefined) return

        setCommonForm(false)
    }, [common])

    useEffect(() => {
        if (name === undefined || progress === undefined) return

        setNameValue(name)
        setProgressValue(progress)
    }, [name, progress])

    const handleNameChange = (event) => {
        setNameValue(event.target.value)
    }

    const handleProgressChange = (event) => {
        setProgressValue(event.target.value)
    }

    const handleTitleChange = (event) => {
        setTitleValue(event.target.value)
    }

    const handleDescriptionChange = (event) => {
        setDescriptionValue(event.target.value)
    }

    const handleOnSubmit = (event) => {
        event.preventDefault()
        clearTimeout(timeout)
        // Prevent user send bulk data at the same time
        timeout = setTimeout(() => {
            const name = nameValue
            const progress_percentage = parseInt(progressValue)

            if ((commonForm && !name) || (!commonForm && (!title || !description))) return

            const payload = commonForm ? { name, progress_percentage } : { title, description }

            onSubmit(payload)
            setNameValue("")
            setTitleValue("")
            setDescriptionValue("")
            setProgressValue(0)
        }, 500)
    }

    const renderCommonField = () => (
        <>
            <div className={styles.Form_field}>
                <label
                    className={styles.Form_label}
                    aria-label="Task Name"
                >
                    Task Name
                </label>
                <input
                    type="text"
                    value={nameValue}
                    className={styles.Form_input}
                    id="nameInput"
                    placeholder="Input task name..."
                    onChange={handleNameChange}
                    required
                    autoFocus
                />
            </div>
            <div className={styles.Form_field}>
                <label
                    className={styles.Form_label}
                    aria-label="Progress"
                >
                    Progress
                </label>
                <input
                    type="number"
                    value={progressValue}
                    className={styles.Form_input}
                    id="progressInput"
                    placeholder="Input progress..."
                    onChange={handleProgressChange}
                    required
                />
            </div>
        </>
    )

    const renderGroupField = () => (
        <>
            <div className={styles.Form_field}>
                <label
                    className={styles.Form_label}
                    aria-label="Group Title"
                >
                    Group Title
                </label>
                <input
                    type="text"
                    value={title}
                    className={styles.Form_input}
                    id="titleInput"
                    placeholder="Input group title..."
                    onChange={handleTitleChange}
                    required
                    autoFocus
                />
            </div>
            <div className={styles.Form_field}>
                <label
                    className={styles.Form_label}
                    aria-label="Description"
                >
                    Description
                </label>
                <input
                    type="text"
                    value={description}
                    className={styles.Form_input}
                    id="descInput"
                    placeholder="Input description..."
                    onChange={handleDescriptionChange}
                    required
                    autoFocus
                />
            </div>
        </>
    )

    return (
        <form className={styles.Form} onSubmit={handleOnSubmit}>
            {commonForm ? renderCommonField() : renderGroupField() }
            <input type="submit" className={styles.Form_submit} />
        </form>
    )
}

export default Form
