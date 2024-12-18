import { compare, hash } from "bcrypt";

export async function HashPassword(password: string): Promise<string> {
    const salt = 10

    return await hash(password, salt)
}

export async function ValidatePassword(password: string, passwordHash: string): Promise<boolean> {
    return await compare(password, passwordHash)
}