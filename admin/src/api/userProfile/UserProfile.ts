import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type UserProfile = {
  createdAt: Date;
  id: string;
  updatedAt: Date;
  user: UserWhereUniqueInput;
};
