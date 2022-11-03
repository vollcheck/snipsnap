export type Snap = {
  id: number;
  user_id: number;
  name: string;
  content: string;
  language_id: number;
  create_date?: string;
  update_date?: string;
};

export type Snaps = [Snap];

export type User = {
  id: number;
  username: string;
  password: string;
  email: string;
  avatar?: string;
  bio?: string;
};

export type Users = [User];

export type Language = {
  id: number;
  name: string;
};
