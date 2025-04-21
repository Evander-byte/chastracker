
export interface EmailType {
    name: string
    email: string
    token: string
}

export interface TrasnportConfig {
    host: string
    port: number
    auth: {
        user: string
        pass: string
    }
}