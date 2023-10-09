import { User } from "../../gql/graphql"

export interface IUserState {
    id: number | undefined
    avatarUrl: string | null
    fullname: string
    email?: string
    updateProfileImage: (image: string) => void
    updateUsername: (name: string) => void
    setUser: (user: User) => void
}