import { Router } from 'express';

import {
  send_message,
  send_message_group,
  send_message_trigger_mikrotik
} from '../controller/message/messageController';

const messageRoutes = Router();

/**
 * Rotas para Mensagem
 */
messageRoutes.post('/sendMessage', send_message);
messageRoutes.post('/sendMessageGroup', send_message_group);
messageRoutes.get('/sendMessageMikrotik/:groupId/:message/:identify', send_message_trigger_mikrotik);

export { messageRoutes };