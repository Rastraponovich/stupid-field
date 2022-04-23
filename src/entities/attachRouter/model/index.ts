import {
    createEvent,
    createEffect,
    restore,
    attach,
    forward,
    sample,
} from "effector"
import { NextRouter, Router } from "next/router"
import { debug } from "patronum"
import axios from "axios"

export const attachRouter = createEvent<NextRouter>()
const $router = restore<NextRouter>(attachRouter, null)

const pushFx = attach({
    source: $router,
    effect: (router, param) => {
        return router!.push(`/question/${param}`)
    },
})

export const callFetch = createEvent<any>()

const fxFetch = createEffect(
    async (params?: string) => await axios.get(params!)
)

forward({ from: callFetch, to: fxFetch })

sample({ clock: fxFetch.doneData, fn: (res) => res.data.id, target: pushFx })
