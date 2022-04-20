import { questionsModel } from "../.."

export const ErrorText = () => {
    const wrongAnswer = questionsModel.selectors.useWrongAnswer()
    return (
        <span className="text-base text-rose-600">
            {wrongAnswer.letter && `неверная буква: ${wrongAnswer.letter}`}
        </span>
    )
}
