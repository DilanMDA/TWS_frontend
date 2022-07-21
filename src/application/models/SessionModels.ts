export interface CreateSession {
    email?: string;
    password?: string;
}

export interface SessionResponse {
    accessToken: string;
    refreshToken: string;
}

export interface RefreshToken {
    refreshToken: string;
}

export interface TokenResponse {
    accessToken: string;
}
