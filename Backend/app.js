import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config(); // <- Replaces require()

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(json());

// Routes
import bookingsRoutes from './routes/bookings.routes.js';
app.use('/bookings', bookingsRoutes);

import guestsRoutes from './routes/guests.routes.js';
app.use('/guests', guestsRoutes);

import paymentsRoutes from './routes/payments.routes.js';
app.use('/payments', paymentsRoutes);

import reviewroutes from './routes/review.routes.js';
app.use('/reviews', reviewroutes);

import roomsRoutes from './routes/rooms.routes.js';
app.use('/rooms', roomsRoutes);

import staffroutes from './routes/staff.routes.js';
app.use('/staff', staffroutes);

import usersRoutes from './routes/users.routes.js';
app.use('/users', usersRoutes);

export default app;
