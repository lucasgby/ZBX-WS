import express, { Router } from 'express';

const staticImagesRoutes = Router();

staticImagesRoutes.use('/uploads', express.static('uploads'));
staticImagesRoutes.use('/reports', express.static('reports'));

export {
  staticImagesRoutes
}