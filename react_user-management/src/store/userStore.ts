import { create } from "zustand";
import type { User } from "../types/user";


interface UserStore {
    users: User[];
  addUser: (data: CreateUserDto) => void;
  updateUser: (id: string, data: UpdateUserDto) => void;
  deleteUser: (id: string) => void;
}

export type CreateUserDto = Omit<User,"id">;

export type UpdateUserDto = Partial<CreateUserDto>;

export const useUserStore = create<UserStore>((set, get) => ({
    users: [
        {
            id: 'user20251612001',
            name: 'To Minh Nhat',
            email: 'tominhat@cyberlogitec.com',
            status: 'ACTIVE',
        },
        {
            id: 'user20251612002',
            name: 'Hoang Manh Ha',
            email: 'hoangmanhha@cyberlogitec.com',
            status: 'ACTIVE',
        },
    ],

    addUser: (user) => {
        set((state) => {
            const newUser: User = {
            id: crypto.randomUUID(),
            ...user,
            };

            return {
            users: [...state.users, newUser],
            };
        });
    },
    updateUser: (id, data) => {
        set((state) => ({
            users: state.users.map((user) =>
            user.id === id
                ? { ...user, ...data }
                : user
            ),
        }));
    },

    deleteUser: (id) => {
        set((state) => ({
            users: state.users.filter((user) => user.id !== id),
        }));
    },

   
}));