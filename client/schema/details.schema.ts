import { number, object, string, TypeOf } from "zod"

export const detailsSchema = object({
    price: number(),
    dob: string(),
    experience: number(),
})

export type DetailsInputProps = TypeOf<typeof detailsSchema>
