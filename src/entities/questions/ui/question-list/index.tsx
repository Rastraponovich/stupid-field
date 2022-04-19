import { questionsModel } from "../.."
import QuestionListItem from "../question-list-item"

export const QuestionList = () => {
    const questions = questionsModel.selectors.useQuestions()

    return (
        <div className="grid grid-cols-3 gap-4">
            {questions.map((item) => (
                <QuestionListItem key={item.id} question={item} />
            ))}
        </div>
    )
}
