import { boolean, number, object, string } from "yup";
import { RolesType } from "../roles";

interface CreateUser {
  name: string;
  email: string;
  login: string;
  password: string;
  role: RolesType;
  organization_id: number
}

interface UpdateUser {
  name?: string;
  email?: string;
  login?: string;
  role?: RolesType;
  organization_id?: number;
  is_active?: boolean
}

interface UpdatePasswordUser {
  password?: string
}

const createUserSchema = object().shape({
  name: string().trim().required("Name is Required"),
  email: string().email("Invalid format email").lowercase().trim().required("Email is Required"),
  login: string().trim().lowercase().required("Login is Required"),
  password: string().trim().required("Password is Required"),
  role: string()
  .trim()
  .lowercase()
  .oneOf(Object.values(RolesType), "Role not Found")
  .required("Role is Required"),
  organization_id: number().required("Organization is Required")
});

const updateUserSchema = object().shape({
  name: string().trim(),
  email: string().email().lowercase().trim(),
  login: string().trim().lowercase(),
  role: string()
  .trim()
  .lowercase()
  .oneOf(Object.values(RolesType), "Role not Found"),
  organization_id: number(),
  is_active: boolean()
});

const updatePasswordSchema = object().shape({
  password: string().trim()
});

export { CreateUser, UpdateUser, UpdatePasswordUser };
export { createUserSchema, updateUserSchema, updatePasswordSchema }
