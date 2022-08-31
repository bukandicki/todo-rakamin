import { ReactComponent as PlusIcon } from "icons/plus.svg"

import Form from "components/Form/Form.component"
import Modal from "components/Modal/Modal.component"

import styles from "./Navbar.module.sass"
import { useComponentVisible } from "utils/clickOutsideElement"
import { createTodo } from "lib/api"

const Navbar = () => {
    const { isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

    const handleSubmit = async ({ title, description }) => {
        await createTodo({ title, description })
        setIsComponentVisible(false)
    }

    return (
        <nav className={styles.Navbar}>
            <Modal
                title="Add New Group"
                show={isComponentVisible}
                onClose={() => setIsComponentVisible(false)}
            >
                <Form onSubmit={handleSubmit} common={false} />
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