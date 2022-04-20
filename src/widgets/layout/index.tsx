import { WinnerWindow } from "@/src/feautres/show-winner"
import { ReactNode } from "react"
import { Footer } from ".."
import { Header } from ".."

interface LayoutProps {
    children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Header />
            {children}

            <WinnerWindow />
            <Footer />
        </>
    )
}
