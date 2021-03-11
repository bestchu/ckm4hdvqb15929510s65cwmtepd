export type User = {
  createdAt: Date;
  id: string;
  roles: Array<string>;
  updatedAt: Date;
  username: string;
  name: string | null;
};
