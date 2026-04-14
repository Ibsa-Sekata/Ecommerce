import express from 'express';
import { sequelize } from '../models/index.js';
import { seedDefaultData } from '../defaultData/seedData.js';

const router = express.Router();

router.post('/', async (req, res) => {
  await sequelize.sync({ force: true });
  await seedDefaultData();

  res.status(204).send();
});

export default router;
