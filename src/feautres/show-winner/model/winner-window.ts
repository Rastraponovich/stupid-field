import { questionsModel } from "@/src/entities/questions"
import { createEvent, createStore, sample } from "effector"
import { useStore } from "effector-react"

const toggleShowWindow = createEvent()
const $showWindow = createStore<boolean>(false)
    .on(toggleShowWindow, (state, _) => !state)
    .on(questionsModel.$isDone, () => true)

const $answer = createStore<string>("")

sample({
    clock: questionsModel.$selectedQestion,
    fn: (q) => q.answer,
    target: $answer,
})

export const events = {
    toggleShowWindow,
}
const useAnswer = () => useStore($answer)
const useShowWindow = () => useStore($showWindow)
export const selectors = {
    useShowWindow,
    useAnswer,
}
