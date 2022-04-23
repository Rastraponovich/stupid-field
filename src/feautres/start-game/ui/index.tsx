import { attachRouterModel } from "@/src/entities/attachRouter"
import { gameModel } from "@/src/entities/game"
import { useEvent } from "effector-react/scope"
import { useRouter } from "next/router"
import { useEffect } from "react"

export const StartGameButton = () => {
    const onStart = useEvent(gameModel.events.startGame)
    const onStop = useEvent(gameModel.events.stopTimer)
    const timer = gameModel.selectors.useTimer()
    const handleStartTimer = useEvent(gameModel.events.startTimer)

    const { attachRouter, callFetch } = attachRouterModel

    const attachRouterEvent = useEvent(attachRouter)
    const callFetchEvent = useEvent(callFetch)

    const router = useRouter()

    const handleStart = () => {
        onStart()
        // router.replace("/question/1")
        callFetchEvent("/api/questions/random")
    }
    //@ts-ignore
    useEffect(() => {
        attachRouterEvent(router)
        //@ts-ignore
        return () => attachRouterEvent(null)
    }, [router, attachRouterEvent])

    useEffect(() => {
        if (timer <= 0.01) handleStart()
    }, [timer])

    return (
        <button
            onClick={handleStartTimer}
            className="first-letter:uppercase px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-base rounded shadow-sm hover:shadow-lg duration-150"
        >
            начало игры
        </button>
    )
}
