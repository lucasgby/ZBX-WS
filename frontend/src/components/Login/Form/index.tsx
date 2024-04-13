"use client";
import Image from "next/image";

import { useState } from "react";

import { EyeFilledIcon, LockUnlocked, EyeSlashFilledIcon, UserIcon } from "@/icons";

import nsoftLogo from "@/assets/NZBX_512.png"
import botIcon from "@/assets/bot.png";

import {
  Input
} from "@nextui-org/react";

import styles from "./styles.module.css";
import { useLoginController } from "@/controller/login";

export function Form() {
  const { loginController } = useLoginController();
  const controller = loginController();

  const { state, toggleVisibility } = controller;

  return (
    <div className={styles.content}>
      <Image
        src={nsoftLogo}
        alt="nsoft-log"
        height={60}
      />
      <h1 className={styles.title}>Welcome Back</h1>

      <p className={styles.subtitle}>Bem vindo de volta, Por favor entre com seus dados</p>

      <form className={styles['content-form']}>
        <Input
          isRequired
          label={"Login"}
          placeholder={"Insira seu Login/Email"}
          variant="bordered"
          labelPlacement={"outside"}
          size="lg"
          startContent={
            <UserIcon />
          }
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
        />

        <button
          className={styles.btn}
        >
          CONTINUE
        </button>
      </form>

      <Image
        src={botIcon}
        alt="bot-icon"
        height={80}
        width={80}
        className={styles['icon-bot']}
      />
    </div>
  )
}