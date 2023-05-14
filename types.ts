export type Message = {
    role: Role;
    content: string;
}

export type Role = "user" | "system" | "assistant";