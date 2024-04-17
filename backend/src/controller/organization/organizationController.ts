import { prisma } from "../../database/prismaClient";
import { createInitialUser } from "../user/userController";

export async function getOrganization(description: string) {
  const organization = await prisma.organization.findUnique({ where: { description: description.toUpperCase() } });

  return organization;
}

export async function getOrganizationById(id: number) {
  const organization = await prisma.organization.findUnique({ 
    where: { id },
    include: {
      _count: true
    } 
  });

  return organization;
}

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

export {
  createInitialOrganization,
}