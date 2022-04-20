import type { NextPage } from "next"
import { fork, serialize } from "effector"
import { gameModel } from "../entities/game"
import { StartGameButton } from "../feautres/start-game/ui"

const MainPage: NextPage = () => {
    const gameState = gameModel.selectors.useGameState()

    return (
        <main className="px-10 py-4 flex flex-col grow">
            <section className="flex flex-col items-center justify-center grow">
                <StartGameButton />
            </section>
        </main>
    )
}

export default MainPage

export const getServerSideProps = async () => {
    const scope = fork()
    const initialState = serialize(scope)

    return {
        props: { initialState },
    }
}
