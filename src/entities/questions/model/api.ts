import { createEffect } from "effector"
import { getAllQuestions, getRandomQuestion } from "../lib"

export const getRandomQuestionFx = createEffect(getRandomQuestion)

export const getAllQuestionsFx = createEffect(getAllQuestions)
