import { Router } from 'express';

import {
  sendMessage,
  sendMessageGroup,
  sendMessageTriggerMikrotik
} from '../controller/messageController';

const messageRoutes = Router();

/**
 * Rotas para Mensagem
 */
messageRoutes.post('/sendMessage', sendMessage);
messageRoutes.post('/sendMessageGroup', sendMessageGroup);
messageRoutes.get('/sendMessageMikrotik/:groupId/:message/:identify', sendMessageTriggerMikrotik);

export { messageRoutes };