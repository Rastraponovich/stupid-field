import { CircularProgress } from "@/src/shared/ui/circular-progress"
import { gameModel } from ".."

export const CountdownTimer = () => {
    const timer = gameModel.selectors.useTimer()

    return (
        <div className="bg-transparent p-4 -rotate-90 relative flex justify-center items-center">
            <CircularProgress
                max={10}
                progress={timer}
                radius={60}
                stroke={8}
            />
            <span
                className=" text-xl text-blue-700 z-20 absolute  rotate-90"
                x-text={timer.toFixed(2)}
            >
                {timer.toFixed(2)}
            </span>
        </div>
    )
}
