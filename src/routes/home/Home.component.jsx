import { useContext } from "react"
import { RootContext } from "lib/context"

import TaskCard from "components/TaskCard/TaskCard.component"

import styles from "./Home.module.sass"

const Home = () => {
    const { todos } = useContext(RootContext)

    const variants = ["primary", "success", "warning", "danger"]

    const renderTodos = () => {
        return todos.map((todo, idx) => {
            const taskLeft = todos[idx - 1]?.id
            const taskRight = todos[idx + 1]?.id
            const getRandomVariant = variants[Math.floor(Math.random() * variants.length)]

            return (
                <TaskCard
                    key={todo.id}
                    title={todo.title}
                    taskLeft={taskLeft}
                    taskRight={taskRight}
                    desc={todo.description}
                    variant={getRandomVariant}
                    todoId={todo.id}
                />
            )
        })
    }

    return (
        <main className={styles.HomePage}>
            <section className={styles.HomePage_section}>
                {todos && renderTodos()}
                {!todos.length && <h1>Loading...</h1>}
            </section>
        </main>
    )
}

export default Home