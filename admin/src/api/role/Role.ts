import { ApplicationWhereUniqueInput } from "../application/ApplicationWhereUniqueInput";

export type Role = {
  app: ApplicationWhereUniqueInput;
  createdAt: Date;
  id: string;
  updatedAt: Date;
};
