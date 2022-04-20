import { questionsModel } from "@/src/entities/questions"
import Toggle from "@/src/shared/ui/toggle"
import clsx from "clsx"
import { useEvent } from "effector-react"
import { sendAnswerModel } from ".."
import { ToggleFiledFormat } from "./toggle-field"

export const AnswerForm = () => {
    const isDone = questionsModel.selectors.useIsDone()
    const value = sendAnswerModel.selectors.useFiled()

    const fullField = sendAnswerModel.selectors.useFullField()

    const onSubmit = useEvent(sendAnswerModel.events.sendAnswer)
    const handleChange = useEvent(sendAnswerModel.events.changeField)

    return (
        <form
            onSubmit={onSubmit}
            className="flex flex-col space-y-2 justify-center"
        >
            <ToggleFiledFormat />
            <div className="flex space-x-2 items-center">
                <label className="flex items-center space-x-2">
                    <span>Введите ответ</span>
                    <input
                        type="text"
                        className={clsx(
                            "px-2 py-1 border text-md h-10   bg-transparent",
                            !fullField && "w-10 text-center"
                        )}
                        onChange={handleChange}
                        value={value}
                        disabled={isDone}
                        maxLength={!fullField ? 1 : 100}
                    />
                </label>
                <button
                    type="submit"
                    disabled={isDone}
                    className="px-2 py-1 bg-green-400 text-white text-center text-sm rounded first-letter:uppercase hover:bg-green-600 duration-150"
                >
                    отправить
                </button>
            </div>
        </form>
    )
}
