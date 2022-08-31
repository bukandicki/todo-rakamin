/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { deleteItem, editItem } from "lib/api"
import { useComponentVisible } from "utils/clickOutsideElement"
import { deleteItemButton, editItemButton } from "./Card.constant"

import { ReactComponent as ExclamationIcon } from "icons/exclamation.svg"
import { ReactComponent as HorizontalDotsIcon } from "icons/more-horizontal.svg"


import Menu from "components/Menu/Menu.component"
import Progress from "components/Progress/Progress.component"

import styles from "./Card.module.sass"
import Form from "components/Form/Form.component"
import Modal from "components/Modal/Modal.component"

const Card = ({ itemDetail, title, percentage, taskLeft, taskRight, onUpdated }) => {
    const [editButtonObject, setEditButtonObject] = useState(null)
    const [deleteButtonObject, setDeleteButtonObject] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const menu = useComponentVisible(false)
    const deleteModal = useComponentVisible(false)
    const editModal = useComponentVisible(false)

    const handleHideDeleteModal = () => {
        deleteModal.setIsComponentVisible(false)
    }
    const handleHideEditModal = () => {
        editModal.setIsComponentVisible(false)
    }

    const handleDeleteItem = async () => {
        const { id, todo_id, name } = itemDetail

        setIsLoading(true)
        await deleteItem({ id: todo_id, target_todo_id: id, name })

        await onUpdated(todo_id)
        setIsLoading(false)
        handleHideDeleteModal()
    }

    const handleEditItem = async ({ move, progress_percentage }) => {
        const { id, todo_id } = itemDetail
        const validateMove = move !== undefined && move > 0

        if (!validateMove) return

        setIsLoading(true)
        await editItem({
            id: todo_id,
            target_todo_id: id,
            progress_percentage,
            move
        })

        await onUpdated(validateMove ? move : todo_id)
        setIsLoading(false)
        handleHideEditModal()
    }

    const drag = (e) => {
        const { id, todo_id } = itemDetail
        const payload = JSON.stringify({ id, todo_id }, null, 4)

        e.dataTransfer.setData("text", payload)
    }

    const dragEnd = async () => {
        await onUpdated(itemDetail.todo_id)
    }

    useEffect(() => {
        const deleteButton = deleteItemButton.call(null, handleHideDeleteModal, handleDeleteItem)
        const editButton = editItemButton.call(null, handleHideEditModal, handleEditItem)

        setDeleteButtonObject(deleteButton)
        setEditButtonObject(editButton)
    })

    return (
        <div
            className={styles.Card}
            ref={menu.ref}
            id={`item_${itemDetail.id}`}
            draggable={true}
            onDragStart={drag}
            onDragEnd={dragEnd}
        >
            <Modal
                title="Delete Task"
                show={deleteModal.isComponentVisible}
                icon={<ExclamationIcon />}
                button={deleteButtonObject}
                onClose={handleHideDeleteModal}
            >
                <p className={styles.Card_alert}>
                    Are you sure want to delete this task? your action can’t be reverted.
                </p>
            </Modal>
            <Modal
                title="Edit Task"
                show={editModal.isComponentVisible}
                onClose={handleHideEditModal}
            >
                <Form
                    name={title}
                    progress={percentage}
                    button={editButtonObject}
                    onSubmit={handleEditItem}
                />
            </Modal>
            <div className={styles.Card_title}>{title}</div>
            <div className={styles.Card_details}>
                <Progress progress={percentage}/>
                <div className={`${styles.Card_more} ${menu.isComponentVisible && styles.Card_more___active}`}>
                    <HorizontalDotsIcon onClick={() => menu.setIsComponentVisible(true)}/>
                    {
                        menu.isComponentVisible &&
                        <Menu
                            onMoveLeft={() => handleEditItem({ move: taskLeft })}
                            onMoveRight={() => handleEditItem({ move: taskRight })}
                            onEdit={() => editModal.setIsComponentVisible(true)}
                            onDelete={() => deleteModal.setIsComponentVisible(true)}
                        />
                    }
                </div>
            </div>
            {isLoading && (
                <p className={styles.Card_loading}>Loading...</p>
            )}
        </div>
    )
}

export default Card