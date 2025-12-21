import { PasswordExpiredResponse } from "./PasswordExpiredResponse";
import { UserResponse } from "./UserResponse";

export type SignInResponse =
  | UserResponse
  | PasswordExpiredResponse;
