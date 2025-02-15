import express from 'express';
import healthCheck from './healthcheck';

const api = express.Router();

api.use(`/healthcheck`, healthCheck)
//add more

export default api;