import type { NextPage } from "next"
import { fork, serialize } from "effector"
import { CountdownTimer, gameModel } from "../entities/game"
import { StartGameButton } from "../feautres/start-game/ui"
import { useEvent } from "effector-react/scope"

const MainPage: NextPage = () => {
    return (
        <main className="px-10 py-4 flex flex-col grow">
            <section className="flex flex-col items-center justify-center grow">
                <CountdownTimer />

                <StartGameButton />
            </section>
        </main>
    )
}

export default MainPage

export const getServerSideProps = async () => {
    const scope = fork({ [gameModel.$timer.sid!]: 10 })
    const initialState = serialize(scope)

    return {
        props: { initialState },
    }
}
