export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  phone?: number;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: number;
  country?: string;
  urlImage?: string;

  email_token?: string;
  codLogin?: number;
  email_verificado?: boolean;
  admin?: boolean;
}
