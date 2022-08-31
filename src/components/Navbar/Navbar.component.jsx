import { useComponentVisible } from "utils/clickOutsideElement"
import { createTodo } from "lib/api"
import { ReactComponent as PlusIcon } from "icons/plus.svg"

import Form from "components/Form/Form.component"
import Modal from "components/Modal/Modal.component"

import styles from "./Navbar.module.sass"

const Navbar = ({ onUpdated }) => {
    let timeout
    const { isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

    const handleSubmit = async ({ title, description }) => {
        clearTimeout(timeout)
        timeout = setTimeout(async () => {
            await createTodo({ title, description })
            await onUpdated()
            setIsComponentVisible(false)
        }, 500)
    }

    const buttonConfig = {
        cancel: {
            title: "Cancel",
            handler: () => setIsComponentVisible(false)
        },
        confirm: {
            title: "Create Group",
            styles: {
                backgroundColor: "#01959F",
                color: "#fff"
            }
        }
    }

    return (
        <nav className={styles.Navbar}>
            <Modal
                title="Add New Group"
                show={isComponentVisible}
                onClose={() => setIsComponentVisible(false)}
            >
                <Form button={buttonConfig} onSubmit={handleSubmit} common={false} />
            </Modal>
            <h1 className={styles.Navbar_title}>Product Roadmap</h1>
            <button className={styles.Navbar_button} onClick={() => setIsComponentVisible(true)}>
                <PlusIcon />
                <label>Add New Group</label>
            </button>
        </nav>
    )
}

export default Navbar