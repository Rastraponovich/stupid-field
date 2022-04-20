import { gameModel } from "@/src/entities/game"
import { useEvent } from "effector-react/scope"
import { useRouter } from "next/router"

export const StartGameButton = () => {
    const onStart = useEvent(gameModel.events.startGame)

    const router = useRouter()

    const handleStart = () => {
        onStart()
        router.push("/question/1")
    }

    return (
        <button
            onClick={handleStart}
            className="first-letter:uppercase px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-base rounded shadow-sm hover:shadow-lg duration-150"
        >
            начало игры
        </button>
    )
}
