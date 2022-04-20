import clsx from "clsx"
import dayjs from "dayjs"
import { memo } from "react"
import { questionsLib, questionsModel } from "../.."

export const HistoryAnswersList = () => {
    const history = questionsModel.selectors.useHistoryList()
    const Memo = memo(HistoryListItem)
    return (
        <ul className="flex flex-col bg-gray-200 rounded w-full mx-0">
            {history.map((item) => (
                <Memo answer={item} key={item.id} />
            ))}
        </ul>
    )
}

interface HistoryListItemProps {
    answer: questionsLib.IHistoryAnswer
}
const HistoryListItem = ({ answer }: HistoryListItemProps) => {
    return (
        <li
            className={clsx(
                "flex  text-white justify-between text-xs items-center p-1",
                answer.answered ? "bg-green-600 " : "bg-rose-600 "
            )}
        >
            <span className="after:content-['.']">{answer.id}</span>
            <span>{answer.text}</span>
            <span>{dayjs(answer.time).format("DD-MM-YYYYTHH:mm:ssZ[Z]")}</span>
        </li>
    )
}
