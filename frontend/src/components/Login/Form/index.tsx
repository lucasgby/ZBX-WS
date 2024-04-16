"use client";

import { EyeFilledIcon, LockUnlocked, EyeSlashFilledIcon, UserIcon } from "@/icons";

import {
  Input
} from "@nextui-org/react";

import { useLoginController } from "@/controller/login";

import styles from "./styles.module.css";

export function Form() {
  const { loginController } = useLoginController();
  const controller = loginController();

  const { state, toggleVisibility, handleSignIn, yupForm } = controller;

  const { errors, handleSubmit, register } = yupForm;

  return (
    <form
      className={styles['content-form']}
      onSubmit={handleSubmit(handleSignIn)}
    >
      <Input
        isRequired
        label={"Login"}
        placeholder={"Insira seu Login/Email"}
        variant="bordered"
        labelPlacement={"outside"}
        size="lg"
        errorMessage={errors.login?.message}
        startContent={
          <UserIcon />
        }
        {...register("login")}
      />

      <Input
        isRequired
        label={"Password"}
        placeholder={"Insira sua senha"}
        variant="bordered"
        labelPlacement={"outside"}
        type={state.isVisible ? "text" : "password"}
        size="lg"
        startContent={
          <LockUnlocked />
        }
        endContent={
          <button className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {state.isVisible ? (
              <EyeSlashFilledIcon className={styles['icon-eye']} />
            ) : (
              <EyeFilledIcon className={styles['icon-eye']} />
            )}

          </button>
        }
        {...register("password")}
        errorMessage={errors.password?.message}
      />

      <button
        className={styles.btn}
      >
        CONTINUE
      </button>
    </form>
  )
}