import { combine, createEvent, createStore, sample } from "effector"
import { useStore } from "effector-react"
import { ChangeEvent } from "react"
import { TQuestion, __questions__ } from "../lib"

const $questions = createStore<TQuestion[]>(__questions__)

const $doneQuestions = $questions.map((item) =>
    item.filter((q) => q.complite).map((q1) => q1.id)
)
const $undoneQuestions = $questions.map((item) =>
    item.filter((q) => !q.complite).map((q1) => q1.id)
)

const selectQuestion = createEvent<number>()

const $selectedQestion = createStore<TQuestion>({ answer: "" } as TQuestion)

sample({
    clock: selectQuestion,
    source: $questions,
    filter: (questions, id) => questions.some((item) => item.id === id),
    fn: (questions, id) =>
        questions.find((item) => item.id === id) as TQuestion,
    target: $selectedQestion,
})

type TAnswer = {
    id: number
    text: string
    answered: boolean
}

const $answerArray = createStore<TAnswer[]>([]).on($selectedQestion, (_, q) =>
    q.answer
        .split("")
        .map((item, idx) => ({ id: ++idx, text: item, answered: false }))
)

const submit = createEvent<ChangeEvent<HTMLFormElement>>()

submit.watch((e) => e.preventDefault())

const setAnswerField = createEvent<ChangeEvent<HTMLInputElement>>()
const $answerField = createStore<string>("").on(
    setAnswerField,
    (state, event) => event.target.value
)

const checkAnswer = createEvent<string>()

sample({
    clock: submit,
    source: $answerField,
    target: checkAnswer,
})

sample({
    clock: checkAnswer,
    source: $answerArray,
    fn: (answerArray, answer) =>
        answerArray.map((item) => {
            const condition = item.text === answer
            if (condition) return { ...item, text: answer, answered: true }
            return item
        }) as TAnswer[],
    target: $answerArray,
})

const $answer = combine($answerArray, (question) => {
    return question.map((item, id) => ({
        id,
        text: item.answered ? item.text : "",
    }))
})

const $isDone = createStore<boolean>(false).reset($selectedQestion)

sample({
    clock: $answerArray,
    filter: (array) => array.every((item) => item.answered),

    fn: (array) => array.every((item) => item.answered),

    target: $isDone,
})

$answerField.reset($answer)

const useQuestions = () => useStore($questions)
const useDoneQuestions = () => useStore($doneQuestions)
const useUnDoneQuestions = () => useStore($undoneQuestions)

const useSelectedQuestion = () => useStore($selectedQestion)

const useAnswer = () => useStore($answer)

const useAnswerField = () => useStore($answerField)

const useIsDone = () => useStore($isDone)

export const selectors = {
    useQuestions,
    useDoneQuestions,
    useUnDoneQuestions,
    useSelectedQuestion,
    useAnswer,
    useIsDone,
    useAnswerField,
}

export const events = {
    selectQuestion,
    setAnswerField,
    submit,
}
