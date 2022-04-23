import { TQuestion, __questions__ } from "@/src/entities/questions/lib"
import type { NextApiRequest, NextApiResponse } from "next"

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<[TQuestion[], number]>
) {
    const questions = __questions__

    res.status(200).json([questions, questions.length])
}
