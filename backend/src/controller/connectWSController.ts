import { Request, Response } from "express";

import { getClient, getQrCode, startVenomSession } from "../service/venomService";

const connectWS = async (req: Request, res: Response) => {
  try {
    // Iniciar a sessão do Venom e obter o cliente
    const client = await startVenomSession();

    return res.status(200).send(client)

  } catch (error) {
    return res.status(500).json({
      message: "Erro in Generate QRCode",
      error
    });
  }
}

export {
  connectWS
}