import { create } from "zustand"
import { persist } from "zustand/middleware"
import { IUserState } from "./userState.interface"



export const useUserStore = create<IUserState>()(
    persist(
        (set) => ({
            id: undefined,
            fullname: "",
            email: "",
            avatarUrl: null,

            updateProfileImage: (image: string) => set({ avatarUrl: image }),
            updateUsername: (name: string) => set({ fullname: name }),
            setUser: (user) =>
                set({
                    id: user.id || undefined,
                    avatarUrl: user.avatarUrl,
                    fullname: user.fullname,
                    email: user.email,
                }),
        }),
        {
            name: "user-store",
        }
    )
)