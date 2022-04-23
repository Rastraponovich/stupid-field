import { TQuestion, __questions__ } from "@/src/entities/questions/lib"
import type { NextApiRequest, NextApiResponse } from "next"

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<TQuestion>
) {
    const question = __questions__.find(
        (item) => item.id === Number(req.query.id)
    )

    if (question) res.status(200).json(question)

    res.status(200).json({} as TQuestion)
}
