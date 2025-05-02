import { TNameInputLogin, TNameInputRegister } from "@/types";

// Interface for data of input register
export interface IRegisterInput {
  label: string;
  name: TNameInputRegister;
  id: string;
  placeholder: string;
  type: string;
  validation: {
    required: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
  }
}

// Interface for data of countries
export interface ICountry {
  CountryId: number;
  CountryName: string;
}

// Interface for data of gender
export interface IGender {
  gender: number;
  genderType: string;
}

// Interface for data of input login
export interface ILoginInput {
  label: string;
  name: TNameInputLogin;
  id: string;
  placeholder: string;
  type: string;
  validation: {
    required: boolean;
    pattern?: RegExp;
  }
}


// Interface for Input Register
export interface RegisterFormValues {
  nationalNo: string;
  fname: string;
  sname: string;
  tname: string;
  lname: string;
  phonenumber: string;
  birthDate: string;
  address: string;
  email: string;
  password: string;
  confirmPassword: string;

}

// interface for error response
export interface IErrorResponse {
  error: {
    response: {
      data?: {
        messages?: string[];
        errors?: string[];
      }
    }
  }
  messages?: string[];
  errors?: string[];
}
export interface LoginFormValues {
  email: string;
  password: string;
}

export interface emailFormValues {
  email: string;
}


export interface passwordFormValues {
  password: string;
}

export interface ILocalServices {
  id: number;
  name: string;
  description: string;
  minAge: number;
  validityPeriod: number;
  fee: number;
}
