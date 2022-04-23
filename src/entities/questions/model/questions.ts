import dayjs from "dayjs"
import {
    combine,
    createEffect,
    createEvent,
    createStore,
    sample,
} from "effector"
import { useStore } from "effector-react"
import { debug, reset } from "patronum"
import { IHistoryAnswer, TAnswer, TQuestion, __questions__ } from "../lib"
import { getAllQuestionsFx, getRandomQuestionFx } from "./api"

const getAllQuestions = createEvent()

sample({
    clock: getAllQuestions,
    target: getAllQuestionsFx,
})
const $questions = createStore<TQuestion[]>(__questions__).on(
    getAllQuestionsFx.doneData,
    (_, res) => res.data[0]
)

const $questionsCount = createStore(0).on(
    getAllQuestionsFx.doneData,
    (_, res) => res.data[1]
)

reset({ clock: getAllQuestions, target: [$questionsCount, $questions] })

const $doneQuestions = $questions.map((item) =>
    item.filter((q) => q.complite).map((q1) => q1.id)
)
const $undoneQuestions = $questions.map((item) =>
    item.filter((q) => !q.complite).map((q1) => q1.id)
)

const getRandomQuestion = createEvent()

sample({
    clock: getRandomQuestion,
    target: getRandomQuestionFx,
})

export const $selectedQestion = createStore<TQuestion>({
    answer: "",
} as TQuestion).on(getRandomQuestionFx.doneData, (_, res) => res.data)

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

export const $isDone = createStore<boolean>(false)

reset({
    clock: getRandomQuestion,
    target: [$isDone, $selectedQestion, $answerArray],
})

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
    clearHistory,
    checkAnswerLetter,
    getRandomQuestion,
    checkAnswerWord,
}
