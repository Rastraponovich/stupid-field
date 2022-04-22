import { winnerWindowModel } from "@/src/feautres/show-winner"
import {
    createEffect,
    createEvent,
    createStore,
    forward,
    sample,
    scopeBind,
} from "effector"
import { useStore } from "effector-react"
import { debug, reset } from "patronum"
import { gameLib } from ".."
import { questionsModel } from "../../questions"

const startTimerFx = createEffect(() => {
    const callUpdate = scopeBind(updateTimer)
    return setInterval(() => {
        callUpdate()
    }, 10)
})
const startTimer = createEvent()
const stopTimer = createEvent()
export const $timer = createStore<number>(10).reset(startTimer)

const $timerId = createStore<any>(null).on(startTimer, (id, _) => {
    clearInterval(id)
    return null
})

sample({
    clock: startTimer,

    target: startTimerFx,
})

const updateTimer = createEvent()

sample({
    clock: updateTimer,
    source: $timer,
    filter: (state, _) => state > 0,
    fn: (state, _) => state - 0.01,
    target: $timer,
})

$timerId.on(startTimerFx.doneData, (_, timerId) => timerId)

sample({
    clock: $timer,
    source: $timerId,
    filter: (_, time) => time <= 0.01,
    fn: (id, _) => clearInterval(id),
})

debug($timerId)

const startGame = createEvent()
const $gameState = createStore<gameLib.TGameState>("stopped").on(
    startGame,
    () => "started"
)
sample({
    clock: $gameState,
    filter: (state) => state === "ended",
    target: winnerWindowModel.events.toggleShowWindow,
})

sample({
    //@ts-ignore
    clock: questionsModel.$isDone,
    //@ts-ignore

    filter: (done) => done,
    fn: () => "ended",
    target: $gameState,
})

sample({
    clock: startGame,
    target: questionsModel.events.clearHistory,
})

reset({
    clock: startGame,
    target: [questionsModel.$isDone],
})

export const events = {
    startGame,
    startTimer,
}

const useGameState = () => useStore($gameState)
const useTimer = () => useStore($timer)
export const selectors = {
    useGameState,
    useTimer,
}
