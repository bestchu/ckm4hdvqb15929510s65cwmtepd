export type UserCreateInput = {
  password: string;
  roles: Array<string>;
  username: string;
  name?: string | null;
};
