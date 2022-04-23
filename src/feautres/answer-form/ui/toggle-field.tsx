import { Toggle } from "@/src/shared/ui/toggle"
import { useEvent } from "effector-react/scope"
import { useEffect } from "react"
import { sendAnswerModel } from ".."

export const ToggleFiledFormat = () => {
    useEffect(() => {
        return () => console.log("unmount, toggleFiled")
    }, [])
    const fullField = sendAnswerModel.selectors.useFullField()
    const handleToggle = useEvent(sendAnswerModel.events.toggleFullField)

    return (
        <div className="flex space-x-2 items-center">
            <Toggle onChange={handleToggle} enabled={fullField} />
            <span>{!fullField ? "по буквам" : "все слово"}</span>
        </div>
    )
}
