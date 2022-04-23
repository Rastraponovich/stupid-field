import { gameModel } from "@/src/entities/game"
import Image from "next/image"
import Link from "next/link"

export const Header = () => {
    const timer = gameModel.selectors.useTimer()
    return (
        <header className="grid grid-cols-3 px-4 py-2  text-gray-900 shadow-md items-center">
            <Link href="/">
                <a>
                    <Image
                        src="/assets/logo.png"
                        height={50}
                        width={120}
                        alt="logo"
                    />
                </a>
            </Link>
        </header>
    )
}
