export type AppConfig = {
    backendURL: string
}

const appConfig: AppConfig = {
    backendURL: process.env.backendURL ?? 'http://localhost:8000/graphql'
}

export default appConfig;

