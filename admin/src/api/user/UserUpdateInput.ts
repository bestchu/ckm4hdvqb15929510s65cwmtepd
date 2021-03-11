export type UserUpdateInput = {
  password?: string;
  roles?: Array<string>;
  username?: string;
  name?: string | null;
};
