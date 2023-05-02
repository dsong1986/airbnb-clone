import { User } from "@prisma/client";

export type SafeUser = Omit<
    User,
    'createAt' | 'updatedAt' | 'emailVerified'
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
}