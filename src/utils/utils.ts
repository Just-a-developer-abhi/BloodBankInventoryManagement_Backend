import { type } from "os";

export const allowedBloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const;

export type BloodGroupType = typeof allowedBloodGroups[number];