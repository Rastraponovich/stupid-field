import { memo, useEffect } from "react"
import { Switch } from "@headlessui/react"

interface ToggleProps {
    enabled: boolean
    onChange(): void
}
export const Toggle = memo(({ enabled, onChange }: ToggleProps) => {
    useEffect(() => {
        return () => console.log("unmount, toggle")
    }, [])
    return (
        <Switch
            as="div"
            checked={enabled}
            onChange={onChange}
            className={`${enabled ? "bg-green-600" : "bg-rose-600"}
          relative inline-flex flex-shrink-0 h-[18px] w-[34px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
            <span className="sr-only">Use setting</span>
            <span
                aria-hidden="true"
                className={`${enabled ? "translate-x-4" : "translate-x-0"}
            pointer-events-none inline-block h-[14px] w-[14px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
            />
        </Switch>
    )
})

Toggle.displayName = "Toggle"
