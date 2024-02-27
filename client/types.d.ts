type RoleProps =
    | "user"
    | "worker"
    | "painter"
    | "plumber"
    | "designer"
    | "electrician"
    | "packer"
    | ""

interface UserProps {
    id: string
    name: string
    email: string
    role: string
    phone: string
}

interface ModalProps {
    isOn: boolean
    toggleOn: () => void
    children: ReactNode
}

interface WorkerProps {
    name: string
    email: string
    role: string
    phoneno: string
    id: string
    price: string
    isVerified: number
    plan: number
    experience: number
}

interface RequestProps {
    name: string
    email: string
    role: string
    phoneno: string
    id: string
    servicemanid: string
}
