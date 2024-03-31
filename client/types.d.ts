type RoleProps =
  | "user"
  | "worker"
  | "painter"
  | "plumber"
  | "designer"
  | "electrician"
  | "packer"
  | "";

interface UserProps {
  id: string;
  name: string;
  email: string;
  role: string;
  phoneno: string;
  city: string;
  password: string;
}

interface ModalProps {
  isOn: boolean;
  toggleOn: () => void;
  children: ReactNode;
}

interface WorkerProps {
  name: string;
  email: string;
  role: string;
  phoneno: string;
  id: string;
  userId: string;
  price: string;
  isVerified: number;
  plan: number;
  experience: number;
  city: string;
}

interface RequestProps {
  name: string;
  email: string;
  role: string;
  phoneno: string;
  id: string;
  servicemanid: string;
  status: RequestStatus;
}

type RequestStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "completed"
  | "cancelled"
  | "atwork";
