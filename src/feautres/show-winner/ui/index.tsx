import { questionsModel } from "@/src/entities/questions"
import { AnswerField } from "@/src/entities/questions/ui/answer-field"
import ModalWindow from "@/src/shared/ui/modal-window"
import { useEvent } from "effector-react/scope"
import { useRouter } from "next/router"
import { winnerWindowModel } from ".."

export const WinnerWindow = () => {
    const handleClose = useEvent(winnerWindowModel.events.toggleShowWindow)
    const showWindow = winnerWindowModel.selectors.useShowWindow()

    const router = useRouter()

    const handleEnd = () => {
        handleClose()
        router.replace("/")
    }

    const isDone = questionsModel.selectors.useIsDone()

    return (
        <ModalWindow
            show={showWindow}
            onClose={handleClose}
            title={isDone ? "Победа" : ""}
            titleClassName="bg-green-600 text-white py-2 px-4"
        >
            <h3>правильный ответ:</h3>
            <AnswerField />

            <div className="mt-4 flex justify-center">
                <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={handleEnd}
                >
                    закончить
                </button>
            </div>
        </ModalWindow>
    )
}
