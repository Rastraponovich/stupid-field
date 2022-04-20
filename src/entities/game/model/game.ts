import { createEvent, createStore, sample } from "effector"
import { useStore } from "effector-react"
import { useRouter } from "next/router"
import { reset } from "patronum"
import { gameLib } from ".."
import { questionsModel } from "../../questions"

const startGame = createEvent()
const $gameState = createStore<gameLib.TGameState>("stopped").on(
    startGame,
    () => "started"
)

sample({
    //@ts-ignore
    clock: questionsModel.$isDone,
    //@ts-ignore

    filter: (done) => done,
    fn: () => "ended",
    target: $gameState,
})

sample({
    clock: $gameState,
    filter: (state) => state !== "started",
    target: questionsModel.events.clearHistory,
})

reset({ clock: startGame, target: questionsModel.$isDone })

export const events = {
    startGame,
}

const useGameState = () => useStore($gameState)
export const selectors = {
    useGameState,
}
