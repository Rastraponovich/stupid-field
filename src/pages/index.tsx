import type { NextPage } from "next"
import { fork, serialize } from "effector"
import { useEvent, useStore, useStoreMap } from "effector-react/scope"
import { QuestionList } from "../entities/questions"

const MainPage: NextPage = () => {
    return (
        <main className="px-10 py-4 flex flex-col grow">
            <h2 className="prose">Welcome to Stupid Field</h2>
            <section className="flex flex-col grow">
                <QuestionList />
            </section>
        </main>
    )
}

export default MainPage

export const getServerSideProps = async () => {
    const scope = fork()
    const initialState = serialize(scope)

    return {
        props: { initialState },
    }
}
