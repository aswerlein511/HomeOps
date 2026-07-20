import cors from 'cors';
import express from 'express';

import { pcHealthRoutes } from './features/monitoring/pc-health';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/pc-health', pcHealthRoutes);

export default app;
