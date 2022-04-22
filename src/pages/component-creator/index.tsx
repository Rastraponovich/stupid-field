import type { NextPage } from "next"
import { fork, serialize } from "effector"

import { useEvent } from "effector-react/scope"
import { ElementType, useState } from "react"
import clsx from "clsx"

const ComponentCreator: NextPage = () => {
    const [height, setHeight] = useState(0)

    const backgroundColor = "green"
    const [width, setWidth] = useState(0)
    const [borderRadius, setBorderRadius] = useState(0)

    return (
        <main className="px-10 py-4 flex flex-col grow">
            <section className="flex flex-col grow">
                <div className="grid grid-cols-4 gap-4 grow">
                    <div className="col-span-2 border ">
                        <h2>preview</h2>
                        <Component
                            as="div"
                            style={{
                                backgroundColor,
                                height: `${height}px`,
                                width: `${width}px`,
                                borderRadius: `${borderRadius}%`,
                            }}
                        />
                    </div>
                    <div className="col-span-2 border-black border">
                        <input
                            type="range"
                            name=""
                            id="height"
                            max={1000}
                            value={height}
                            onChange={(e) => setHeight(Number(e.target.value))}
                        />
                        <input
                            type="range"
                            name=""
                            id="width"
                            max={1000}
                            value={width}
                            onChange={(e) => setWidth(Number(e.target.value))}
                        />
                        <input
                            type="range"
                            name=""
                            id="borderRadius"
                            max={50}
                            value={borderRadius}
                            onChange={(e) =>
                                setBorderRadius(Number(e.target.value))
                            }
                        />
                    </div>
                </div>
            </section>
        </main>
    )
}

interface ComponentProps {
    as: ElementType
    style?: Record<string, string>
}

const Component = ({ as: Comp, style }: ComponentProps) => {
    const styles = Object.entries(style!).map(([key, val]) => ({ key: val }))

    return (
        <Comp
            //className={clsx(styles.join(" "))}

            style={style}
        ></Comp>
    )
}

export default ComponentCreator

export const getServerSideProps = async () => {
    const scope = fork()
    const initialState = serialize(scope)

    return {
        props: { initialState },
    }
}
