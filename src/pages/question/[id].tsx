import type { GetServerSideProps, NextPage } from "next"
import { allSettled, fork, serialize } from "effector"
import { ErrorText, questionsModel } from "@/src/entities/questions"
import { AnswerField } from "@/src/entities/questions/ui/answer-field"
import { AnswerForm } from "@/src/feautres/answer-form"
import { HistoryAnswersList } from "@/src/entities/questions/ui/history-list"
import { useRouter } from "next/router"
import { gameModel } from "@/src/entities/game"
import { useEffect } from "react"

const Question: NextPage = () => {
    const question = questionsModel.selectors.useSelectedQuestion()

    const router = useRouter()

    const gameState = gameModel.selectors.useGameState()

    useEffect(() => {
        if (gameState === "ended") router.replace("/")
    }, [gameState])

    return (
        <main className="px-10 py-4 flex flex-col grow bg-gray-100">
            <div className="grid grid-cols-4 grow gap-8">
                <section className="col-span-3 flex flex-col space-y-4">
                    <article className="flex flex-col prose ">
                        <h2 className="first-letter:uppercase">вопрос</h2>
                        <p className="p-2 bg-gray-200 rounded">
                            {question.text}
                        </p>
                    </article>

                    <AnswerField />
                    <ErrorText />
                    <div className="self-center">
                        <AnswerForm />
                    </div>
                </section>

                <aside className="flex col-span-1 col-end-5 w-full">
                    <HistoryAnswersList />
                </aside>
            </div>
        </main>
    )
}

export default Question

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const scope = fork()

    await allSettled(questionsModel.events.selectQuestion, {
        scope,
        params: Number(params!.id),
    })
    const initialState = serialize(scope)

    return {
        props: { initialState },
    }
}
