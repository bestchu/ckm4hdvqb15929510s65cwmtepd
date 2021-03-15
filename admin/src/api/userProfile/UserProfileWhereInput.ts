import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type UserProfileWhereInput = {
  createdAt?: Date;
  id?: string;
  updatedAt?: Date;
  user?: UserWhereUniqueInput;
};
