import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type UserGroup = {
  createdAt: Date;
  id: string;
  manager?: UserWhereUniqueInput | null;
  updatedAt: Date;
};
