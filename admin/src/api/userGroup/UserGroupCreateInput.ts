import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type UserGroupCreateInput = {
  manager?: UserWhereUniqueInput | null;
};
