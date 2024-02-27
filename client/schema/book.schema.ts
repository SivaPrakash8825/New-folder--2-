import { object, string, TypeOf } from "zod"

export const bookServiceSchema = object({
    name: string().min(1, "Name is Required"),
    email: string().email(),
    phoneno: string().min(1, "Phone No. is Required"),
    // address: string().min(1, "Address is Required"),
})

export type BookServiceProps = TypeOf<typeof bookServiceSchema>
