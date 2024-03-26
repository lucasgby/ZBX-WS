import { Request, Response } from "express";
import parserPhoneNumber, { isValidPhoneNumber } from 'libphonenumber-js';

import { client } from "./mainController";
import { BadRequestError } from "../model/api-errors";

const sendMessage = async (req: Request, res: Response) => {
  const { number, message } = req.body;

  if (!isValidPhoneNumber(number, "BR")) {
    throw new BadRequestError('This number is not valid');
  }

  let phoneNumber = parserPhoneNumber(number, "BR")?.format("E.164")?.replace("+", "") as string;

  phoneNumber = phoneNumber.includes("@c.us") ? phoneNumber : `${phoneNumber}@c.us`;

  const data = await client.sendMessage(phoneNumber, message);

  if (data) {
    return res.status(200).json({ message: "Message Sent Successfully" });
  }

  throw new BadRequestError("Erro ao enviar mensagem");
}

const sendMessageGroup = async (req: Request, res: Response) => {
  const { groupId, message } = req.body;

  const formatGroup = String(groupId).includes("@g.us") ? groupId : `${groupId}@g.us`;

  const data = await client.sendMessage(formatGroup, message);

  if (data) {
    return res.json({ message: "Message Sent Successfully" });
  }

  throw new BadRequestError("Error Sending Message, Check Group ID");
 
}

const sendMensageTrigger = async (groupId: string, message: string) => {
  try {
    const formatGroup = groupId.includes("@g.us") ? groupId : `${groupId}@g.us`;

    await client.sendMessage(formatGroup, message);
  } catch (error) {
    console.log("erro ao enviar mensagem para o whatsapp")
  }
}

const sendMessageTriggerMikrotik = async (req: Request, res: Response) => {
  const { groupId, message, identify } = req.params;

  try {
    var nowDate = new Date().toLocaleDateString("pt-br");

    const formatMessage = `Mensagem: ${message}` + '\n' + `Equipamento: *${identify}*` + '\n' + `Horário: ${nowDate}`

    await client.sendMessage(`${groupId}@g.us`, formatMessage);

    return res.status(200).json({ results: "" });
  } catch (error) {
    return res.status(404).json({ message: "Error send message" });

  }
}

export {
  sendMessage,
  sendMessageGroup,
  sendMensageTrigger,
  sendMessageTriggerMikrotik
}
