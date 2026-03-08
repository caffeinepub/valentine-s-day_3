import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface LoveNote {
    message: string;
    timestamp: Time;
}
export type Time = bigint;
export interface backendInterface {
    getAllNotes(): Promise<Array<LoveNote>>;
    submitNote(message: string): Promise<void>;
}
