import { questionsModel } from "@/src/entities/questions"
import { createEvent, createStore, sample } from "effector"
import { useStore } from "effector-react"
import { debug } from "patronum"

const toggleShowWindow = createEvent()
export const $showWindow = createStore<boolean>(false).on(
    toggleShowWindow,
    (state, _) => !state
)

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
