import { type InferInsertModel } from "drizzle-orm";
import { user, session, account, verification } from "./auth-schema";

export type User = InferInsertModel<typeof user>;
export type Session = InferInsertModel<typeof session>;
export type Account = InferInsertModel<typeof account>;
export type Verification = InferInsertModel<typeof verification>;
