export type TQuestion = {
    id: number
    text: string
    answer: string
    complite?: boolean
}

export type TAnswer = {
    id: number
    text: string
    answered: boolean
}
export interface IHistoryAnswer extends TAnswer {
    time: string
}
