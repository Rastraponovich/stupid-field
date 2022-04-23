import axios, { AxiosResponse } from "axios"
import { TQuestion } from "./models"

export const getRandomQuestion = async (): Promise<AxiosResponse<TQuestion>> =>
    await axios.get("http://localhost:3000/api/questions/random")

export const getAllQuestions = async (): Promise<
    AxiosResponse<[TQuestion[], number]>
> => await axios.get("http://localhost:3000/api/questions")
