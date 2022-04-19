import type { GetServerSideProps, NextPage } from "next"
import { allSettled, fork, serialize } from "effector"
import { useEvent, useStore, useStoreMap } from "effector-react/scope"
import { questionsModel } from "@/src/entities/questions"
import clsx from "clsx"

const Question: NextPage = () => {
    const question = questionsModel.selectors.useSelectedQuestion()

    const handleChange = useEvent(questionsModel.events.setAnswerField)
    const onSubmit = useEvent(questionsModel.events.submit)
    const value = questionsModel.selectors.useAnswerField()
    const isDone = questionsModel.selectors.useIsDone()

    const answer = questionsModel.selectors.useAnswer()
    console.log(answer)

    return (
        <main className="px-10 py-4 flex flex-col grow">
            <h2 className="prose">Welcome to Stupid Field</h2>
            <section className="flex flex-col grow">
                <p>{question.text}</p>

                <h1>Answer</h1>
                <div className="flex justify-center space-x-2 rounded-sm bg-gray-400 py-2">
                    {answer.map((item, idx) => (
                        <span
                            className={clsx(
                                "border-white bg-blue-600 text-white rounded-sm p-2 border-2 h-12 w-10 text-center"
                            )}
                            key={idx}
                        >
                            {item.text}
                        </span>
                    ))}
                </div>
                <form
                    onSubmit={onSubmit}
                    className="flex flex-col space-y-2 items-start"
                >
                    <label className="flex flex-col">
                        <span>Введите ответ</span>
                        <input
                            type="text"
                            className="px-2 py-1 border text-sm"
                            onChange={handleChange}
                            value={value}
                            disabled={isDone}
                        />
                    </label>
                    <button
                        type="submit"
                        className="px-2 py-1 bg-green-600 text-white text-center text-sm rounded"
                    >
                        send
                    </button>
                </form>
            </section>

            <section className="flex"></section>
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
