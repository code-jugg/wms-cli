export type Product = {
  JAN: string;
  id: string;
  code: string;
  branch: string;
  name: string;
  MFD: string;
  BBE: string;
};
export type Location = {
  number: string;
  QTY: string;
};

export type User = {
  id: string;
  name: string;
};

export type Login = {
  id?: string | null;
  email?: string | null;
  password?: string | null;
};
