import { TQuestion, __questions__ } from "@/src/entities/questions/lib"
import { randomIntFromInterval } from "@/src/shared/lib"
import type { NextApiRequest, NextApiResponse } from "next"

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<TQuestion>
) {
    const index = randomIntFromInterval(1, __questions__.length - 1)
    const question = __questions__.find((item) => item.id === index)

    res.status(200).json(question!)
}
