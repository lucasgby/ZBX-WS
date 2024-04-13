"use client";

import { useForm, FieldValues } from "react-hook-form";

import { ObjectSchema } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface Props {
  schemaYup: ObjectSchema<{}>;
}

function useSchemaValidade<T extends FieldValues>({ schemaYup }: Props) {

  //@ts-ignore
  const methods = useForm<T, any>({ resolver: yupResolver(schemaYup) });

  return methods;
}

export {
  useSchemaValidade
}