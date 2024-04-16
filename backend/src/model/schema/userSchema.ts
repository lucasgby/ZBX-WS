import { number, object, string } from "yup";

interface CreateUser {
  name: string;
  email: string;
  login: string;
  password: string;
  role: string;
  organization_id: number
}

const createUserSchema = object().shape({
  name: string().trim().lowercase().required("Name is Required"),
  email: string().email().lowercase().trim().required("Email is Required"),
  login: string().trim().lowercase().required("Login is Required"),
  password: string().trim().required("Password is Required"),
  role: string().trim().lowercase().required("Role is Required"),
  organization_id: number().required("Organization is Required")
});

export { CreateUser };
export { createUserSchema }
