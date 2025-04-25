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
      }
    }
  }
  messages?: string[];
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

