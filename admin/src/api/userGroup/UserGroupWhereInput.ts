import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type UserGroupWhereInput = {
  createdAt?: Date;
  id?: string;
  manager?: UserWhereUniqueInput | null;
  updatedAt?: Date;
};
