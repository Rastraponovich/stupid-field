import ModalWindow from "@/src/shared/ui/modal-window"
import { useEvent } from "effector-react/scope"
import { winnerWindowModel } from ".."

export const WinnerWindow = () => {
    const handleClose = useEvent(winnerWindowModel.events.toggleShowWindow)
    const showWindow = winnerWindowModel.selectors.useShowWindow()
    const answer = winnerWindowModel.selectors.useAnswer()

    return (
        <ModalWindow show={showWindow} onClose={handleClose}>
            <div className="flex flex-col space-y-2">
                <p>
                    правильный ответ:{" "}
                    <span className="font-bold text-base">{answer}</span>
                </p>
            </div>
        </ModalWindow>
    )
}
