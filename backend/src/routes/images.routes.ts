import express, { Router } from 'express';

const staticImagesRoutes = Router();

staticImagesRoutes.use('/uploads', express.static('uploads'));

export {
  staticImagesRoutes
}