import type { NextPage } from "next"
import { fork, serialize } from "effector"
import { LockClosedIcon, XCircleIcon } from "@heroicons/react/outline"

import { useEvent } from "effector-react/scope"
import { ElementType, useState } from "react"
import clsx from "clsx"
import { TQuestion } from "@/src/entities/questions/lib"

const ComponentCreator: NextPage = () => {
    const [question, setQuestion] = useState<TQuestion>({
        text: "",
        answer: "",
    } as TQuestion)

    const [submitted, setSubmitted] = useState<TQuestion>({} as TQuestion)

    const handleSubmit = () => setSubmitted(question)
    return (
        <main className="px-10 py-4 flex flex-col grow">
            <section className="flex flex-col grow">
                <div className="grid grid-cols-4 gap-4 grow">
                    <div className="col-span-2 border flex flex-col items-center py-10 ">
                        <h2>preview</h2>
                        <Component as="div" question={submitted} />
                        <div className="grow"></div>
                        <button className=" px-4 py-2 bg-green-600 text-white text-xl font-bold rounded hover:bg-green-500 hover:shadow-xl shadow-lg duration-75 uppercase self-center">
                            сохранить
                        </button>
                    </div>
                    <div className="col-span-2 border-black border flex flex-col space-y-4 p-2">
                        <label className="flex flex-col space-y-2 p-4 bg-gray-400 rounded ">
                            <span>text</span>
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    className="px-2 py-1 w-full"
                                    id="text"
                                    value={question.text}
                                    onChange={(e) =>
                                        setQuestion({
                                            ...question,
                                            [e.target.id]: e.target.value,
                                        })
                                    }
                                />
                                <button
                                    onClick={() =>
                                        setQuestion({ ...question, text: "" })
                                    }
                                    className="absolute bottom-1 right-2"
                                >
                                    <XCircleIcon
                                        className={clsx(
                                            "h-6 w-6",
                                            question.text.length > 0
                                                ? "text-gray-900"
                                                : "text-gray-400"
                                        )}
                                    />
                                </button>
                            </div>
                        </label>
                        <label className="flex flex-col space-y-2 p-4 bg-gray-400 rounded">
                            <span>answer</span>
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    id="answer"
                                    className="px-2 py-1 w-full"
                                    value={question.answer}
                                    onChange={(e) =>
                                        setQuestion({
                                            ...question,
                                            [e.target.id]: e.target.value,
                                        })
                                    }
                                />
                                <button
                                    onClick={() =>
                                        setQuestion({ ...question, answer: "" })
                                    }
                                    className="absolute bottom-1 right-2"
                                >
                                    <XCircleIcon
                                        className={clsx(
                                            "h-6 w-6",
                                            question.answer.length > 0
                                                ? "text-gray-900"
                                                : "text-gray-400"
                                        )}
                                    />
                                </button>
                            </div>
                        </label>

                        <button
                            onClick={handleSubmit}
                            className="text-white bg-green-600 hover:bg-green-400 duration-75 uppercase text-xl rounded px-4 py-2 self-center shadow-md hover:shadow-xl"
                        >
                            применить
                        </button>
                    </div>
                </div>
            </section>
        </main>
    )
}

interface ComponentProps {
    as: ElementType
    question: TQuestion
}

const Component = ({ as: Comp, question }: ComponentProps) => {
    return (
        <Comp className="flex flex-col p-10  bg-gray-100 rounded w-4/6 text-gray-900 prose">
            <h3 className="text-xl font-bold">{question.text}</h3>

            {question.answer && (
                <p className="p-2 bg-gray-200 italic rounded">
                    {question.answer}
                </p>
            )}
        </Comp>
    )
}

export default ComponentCreator

export const getServerSideProps = async () => {
    const scope = fork()
    const initialState = serialize(scope)

    return {
        props: { initialState },
    }
}
