import { questionsModel } from "@/src/entities/questions"
import { createEvent, createStore, sample } from "effector"
import { useStore } from "effector-react"
import { debug, debounce, reset, delay } from "patronum"
import { ChangeEvent } from "react"

const sendAnswer = createEvent<ChangeEvent<HTMLFormElement>>()
sendAnswer.watch((e) => e.preventDefault())

const changeField = createEvent<ChangeEvent<HTMLInputElement>>()

const $field = createStore<string>("").on(changeField, (_, e) => e.target.value)

const toggleFullField = createEvent()
const $fullField = createStore<boolean>(false).on(
    toggleFullField,
    (state, _) => !state
)

sample({
    clock: sendAnswer,
    source: [$field, $fullField],
    filter: ([letter, full], _) => !full,
    fn: ([letter, full], _) => letter as string,
    target: questionsModel.events.checkAnswerLetter,
})

sample({
    clock: sendAnswer,
    source: [$field, $fullField],
    filter: ([letter, full], _) => full as boolean,
    fn: ([letter, full], _) => letter as string,
    target: questionsModel.events.checkAnswerWord,
})

reset({ clock: changeField, target: questionsModel.$wrongAnswer })
reset({
    clock: [
        questionsModel.$currentLetter,
        questionsModel.$selectedQestion,
        questionsModel.$isDone,
        $fullField,
    ],
    target: $field,
})
reset({
    clock: [questionsModel.$wrongAnswer, questionsModel.$isDone],
    target: $fullField,
})

const useFiled = () => useStore($field)
const useFullField = () => useStore($fullField)
export const selectors = {
    useFiled,
    useFullField,
}
export const events = {
    changeField,
    sendAnswer,
    toggleFullField,
}
