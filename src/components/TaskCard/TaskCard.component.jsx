import { useEffect, useState, useContext } from "react"
import { createItem, editItem } from "lib/api"
import { useComponentVisible } from "utils/clickOutsideElement"
import { RootContext } from "lib/context"

import { ReactComponent as PlusCircleIcon } from "icons/plus-circle.svg"

import Card from "components/Card/Card.component"
import Label from "components/Label/Label.component"

import styles from "./TaskCard.module.sass"
import Modal from "components/Modal/Modal.component"
import Form from "components/Form/Form.component"

const TaskCard = ({ title, desc, todoId, variant, taskLeft, taskRight }) => {
    let timeout

    const { dispatchEvent } = useContext(RootContext)
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)
    const [items, setItems] = useState([])

    const fetchItems = async (id) => {
        const dataItems = await dispatchEvent("GET_ITEMS", id)
        setItems(dataItems.reverse())
    }

    const handleCreateTask = async ({ name, progress_percentage }) => {

        await createItem({ id: todoId, name, progress_percentage })

        await fetchItems(todoId)
        setIsComponentVisible(false)
    }

    const drop = async (e) => {
        e.preventDefault()

        const id = parseInt(e.target.getAttribute('data-id'))
        const data = JSON.parse(e.dataTransfer.getData("text"))
        const emptyTask = document.createElement("div")

        emptyTask.setAttribute("class", styles.TaskCard_empty)
        emptyTask.setAttribute("id", `empty_${todoId}`)
        emptyTask.setAttribute("data-id", todoId)
        emptyTask.innerText = "No Task"

        const todosContainer = document.getElementById(`todos_${data.todo_id}`)
        const todoChild = document.getElementById(`item_${data.id}`)

        if (todoChild) todosContainer.removeChild(todoChild)
        if (!todosContainer.childElementCount) todosContainer.appendChild(emptyTask)

        await editItem({
            id: data.todo_id,
            target_todo_id: data.id,
            move: parseInt(id)
        })

        await fetchItems(id)
    }

    const allowDrop = (e) => {
        e.preventDefault()

        const emptyContainer = document.getElementById(`empty_${todoId}`)

        if (emptyContainer) {
            emptyContainer.innerText = "Drop task here"
            emptyContainer.style.borderStyle = "dashed"
            emptyContainer.style.borderWidth = "1px"
        }
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            if (emptyContainer) {
                emptyContainer.innerText = "No Task"
                emptyContainer.style.borderStyle = "solid"
                emptyContainer.style.borderWidth = "1px"
            }
        }, 100)
    }

    useEffect(() => {
        fetchItems(todoId)
    })

    const validateVariant = /^(primary|success|warning|danger)$/
    const variantClass = {
        primary: styles.TaskCard___primary,
        success: styles.TaskCard___success,
        warning: styles.TaskCard___warning,
        danger: styles.TaskCard___danger
    }
    const computeVariantClass = validateVariant.test(variant) ? variantClass[variant] : styles.TaskCard_primary
    const computeClass = `${styles.TaskCard} ${computeVariantClass}`

    const createTaskButton = {
        cancel: {
            title: "Cancel",
            handler: () => setIsComponentVisible(false)
        },
        confirm: {
            title: "Save Task",
            styles: {
                backgroundColor: "#01959F",
                color: "#fff"
            },
            handler: handleCreateTask
        }
    }

    return (
        <div className={computeClass} ref={ref} onDrop={drop} onDragOver={allowDrop} data-id={todoId}>
            <Modal
                title="Create Task"
                show={isComponentVisible}
                onClose={() => setIsComponentVisible(false)}
            >
                <Form
                    name=""
                    progress={0}
                    onSubmit={handleCreateTask}
                    button={createTaskButton}
                />
            </Modal>

            <Label text={title} variant={variant} data-id={todoId} />
            <div className={styles.TaskCard_desc} data-id={todoId}>{desc}</div>
            <div className={styles.TaskCard_todos} id={`todos_${todoId}`} data-id={todoId}>
                {items && items.map(item => (
                    <Card
                        key={item.id}
                        itemDetail={item}
                        taskLeft={taskLeft}
                        taskRight={taskRight}
                        title={item.name}
                        percentage={item.progress_percentage}
                        onUpdated={fetchItems}
                    />
                ))}
                {!items.length && (
                    <div className={styles.TaskCard_empty} id={`empty_${todoId}`} data-id={todoId}>
                        No Task
                    </div>
                )}
            </div>
            <button className={styles.TaskCard_action} onClick={() => setIsComponentVisible(true)} data-id={todoId}>
                <PlusCircleIcon />
                <span>New Task</span>
            </button>
        </div>
    )
}

export default TaskCard