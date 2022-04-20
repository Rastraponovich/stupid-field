import dayjs from "dayjs"
import { combine, createEvent, createStore, sample } from "effector"
import { useStore } from "effector-react"
import { IHistoryAnswer, TAnswer, TQuestion, __questions__ } from "../lib"

const $questions = createStore<TQuestion[]>(__questions__)

const $doneQuestions = $questions.map((item) =>
    item.filter((q) => q.complite).map((q1) => q1.id)
)
const $undoneQuestions = $questions.map((item) =>
    item.filter((q) => !q.complite).map((q1) => q1.id)
)

const selectQuestion = createEvent<number>()

export const $selectedQestion = createStore<TQuestion>({
    answer: "",
} as TQuestion)

sample({
    clock: selectQuestion,
    source: $questions,
    filter: (questions, id) => questions.some((item) => item.id === id),
    fn: (questions, id) =>
        questions.find((item) => item.id === id) as TQuestion,
    target: $selectedQestion,
})

const $answerArray = createStore<TAnswer[]>([]).on($selectedQestion, (_, q) =>
    q.answer
        .split("")
        .map((item, idx) => ({ id: ++idx, text: item, answered: false }))
)

const checkAnswerLetter = createEvent<string>()
const checkAnswerWord = createEvent<string>()

export const $currentLetter = createStore<string>("").on(
    checkAnswerLetter,
    (_, letter) => letter
)

export const $wrongAnswer = createStore<Record<string, any>>({
    error: false,
    letter: "",
})

sample({
    clock: checkAnswerLetter,
    source: $answerArray,
    filter: (answers, letter) =>
        answers.every(
            (item) => item.text.toLowerCase() !== letter.toLowerCase()
        ),

    fn: (answerArray, letter) => ({ error: true, letter }),

    target: $wrongAnswer,
})

sample({
    clock: checkAnswerLetter,
    source: $answerArray,
    filter: (answers, letter) =>
        answers.some(
            (item) => item.text.toLowerCase() === letter.toLowerCase()
        ),

    fn: (answerArray, letter) =>
        answerArray.map((item) => {
            const condition = item.text.toLowerCase() === letter.toLowerCase()
            if (condition) return { ...item, text: letter, answered: true }
            return item
        }) as TAnswer[],
    target: $answerArray,
})

const $answer = combine($answerArray, (question) => {
    return question.map((item, id) => ({
        id,
        text: item.answered ? item.text : "",
    })) as TAnswer[]
})

export const $isDone = createStore<boolean>(false).reset($selectedQestion)

sample({
    clock: $answerArray,
    filter: (array) => array.every((item) => item.answered),

    fn: (array) => array.every((item) => item.answered),

    target: $isDone,
})
const clearHistory = createEvent()
const $historyList = createStore<IHistoryAnswer[]>([]).reset(clearHistory)

sample({
    clock: checkAnswerLetter,
    source: [$answerArray, $historyList],
    fn: ([letters, history], letter) => {
        const condition = letters.some((item) => item.text === letter)
        return [
            ...history,
            {
                id: +history.length,
                text: letter,
                time: dayjs().format(),
                answered: condition,
            },
        ] as IHistoryAnswer[]
    },
    target: $historyList,
})

sample({
    clock: checkAnswerWord,
    source: $answerArray,
    filter: (array, word) =>
        array
            .map((a) => a.text)
            .join("")
            .toLowerCase() === word.toLowerCase(),
    fn: (array, _) => array.map((item) => ({ ...item, answered: true })),

    target: $answerArray,
})

sample({
    clock: checkAnswerWord,
    source: $answerArray,
    filter: (array, word) =>
        array
            .map((a) => a.text)
            .join("")
            .toLowerCase() !== word.toLowerCase(),
    fn: () => ({ error: true, text: "" }),
    target: $wrongAnswer,
})

const useQuestions = () => useStore($questions)
const useDoneQuestions = () => useStore($doneQuestions)
const useUnDoneQuestions = () => useStore($undoneQuestions)

const useSelectedQuestion = () => useStore($selectedQestion)

const useAnswer = () => useStore($answer)

const useIsDone = () => useStore($isDone)

const useWrongAnswer = () => useStore($wrongAnswer)

const useHistoryList = () => useStore($historyList)

export const selectors = {
    useQuestions,
    useDoneQuestions,
    useUnDoneQuestions,
    useSelectedQuestion,
    useAnswer,
    useIsDone,
    useWrongAnswer,
    useHistoryList,
}

export const events = {
    selectQuestion,
    clearHistory,
    checkAnswerLetter,
    checkAnswerWord,
}
