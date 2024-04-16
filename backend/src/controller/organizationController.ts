import { Request, Response } from "express";
import { prisma } from "../database/prismaClient";
import { createInitialUser } from "./userController";

async function createInitialOrganization() {
  const organization = await prisma.organization.findFirst();

  if (!organization) {

    const initialOrganization = await prisma.organization.create({
      data: {
        description: "ORGANIZACAO INICIAL",
      }
    });

    await createInitialUser(initialOrganization.id);

    console.log("Initial Organization Created");
    return;
  }

  console.log("Organization has created")
}

export { createInitialOrganization }