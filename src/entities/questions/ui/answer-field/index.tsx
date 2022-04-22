import clsx from "clsx"
import { questionsModel } from "../.."
import { TAnswer } from "../../lib"

export const AnswerField = () => {
    const answer = questionsModel.selectors.useAnswer()
    return (
        <div className="flex justify-center space-x-2  bg-transparent py-2 self-center px-10">
            {answer.map((item, idx) => (
                <AnswerLetter answerLetter={item} key={idx} />
            ))}
        </div>
    )
}

interface AnswerLetterProps {
    answerLetter: TAnswer
}
const AnswerLetter = ({ answerLetter }: AnswerLetterProps) => {
    return (
        <span
            className={clsx(
                "flex items-center  justify-center border-white bg-blue-600 text-white rounded-sm p-2 border-2 h-12 w-10 text-center uppercase"
            )}
        >
            {answerLetter.text}
        </span>
    )
}
