import { ApplicationWhereUniqueInput } from "../application/ApplicationWhereUniqueInput";

export type Permission = {
  createdAt: Date;
  id: string;
  updatedAt: Date;
  app: ApplicationWhereUniqueInput;
};
