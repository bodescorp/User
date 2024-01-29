export interface ICreateUserParams {
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
  imageProfile?: string;

  admin?: boolean;
}

export interface IVerifyEmailParams {
  codLogin: number;
  email_token: string;
}

export interface IUpdateUserParams {
  password?: string;
  phone?: number;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: number;
  country?: string;
}

export interface IAuthenticateParams {
  email: string;
  password: string;
}

export interface IPayload {
  sub: string;
}
