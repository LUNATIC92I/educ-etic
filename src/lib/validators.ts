import { z } from "zod";

export const registerParentSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(60),
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

export const loginSchema = z.object({
  identifier: z.string().min(2, "Identifiant requis"),
  password: z.string().min(1, "Mot de passe requis"),
});

export const createChildSchema = z.object({
  name: z.string().min(2, "Le prénom doit contenir au moins 2 caractères").max(40),
  username: z
    .string()
    .min(3, "L'identifiant doit contenir au moins 3 caractères")
    .max(20)
    .regex(/^[a-z0-9_]+$/i, "Lettres, chiffres et _ uniquement"),
  password: z.string().min(4, "Le code doit contenir au moins 4 caractères"),
  avatarEmoji: z.string().min(1).max(8).optional(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Adresse email invalide"),
});
