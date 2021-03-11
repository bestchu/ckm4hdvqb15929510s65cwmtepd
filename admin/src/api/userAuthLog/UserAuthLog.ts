import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type UserAuthLog = {
  createdAt: Date;
  id: string;
  updatedAt: Date;
  user: UserWhereUniqueInput;
};
