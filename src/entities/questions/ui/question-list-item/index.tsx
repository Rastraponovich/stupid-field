import Link from "next/link"
import { memo } from "react"
import { TQuestion } from "../../lib"

interface QuestionListItemProps {
    question: TQuestion
}

const QuestionListItem = ({ question }: QuestionListItemProps) => {
    return (
        <Link href={`/question/${question.id}`} shallow replace>
            <a className="flex flex-col p-2 rounded bg-gray-200 hover:bg-green-600 hover:text-white duration-150">
                {question.text}
            </a>
        </Link>
    )
}

export default memo(QuestionListItem)
