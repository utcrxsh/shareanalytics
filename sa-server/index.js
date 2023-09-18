// setting up server

import express from "express";
import http from "http";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import schema from './models/authschema.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dbconfig from './config/dbconfig.js'; // necessary to import

import cors from "cors";

// importing swagger dependencies

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

// importing routes

import authroute from './routes/authroute.js';

// configuring dotenv variables

dotenv.config();

// creating an express app

const app = express();

// starting the server

const httpApp = http.Server(app);

// parsing incoming request data - Middleware Plugin

const allowedOrigins = ["https://shareanalyticsfront.vercel.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the origin is allowed
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json()); // necessary to use as we are passing json data from frontend

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// setting up routes

app.use("/auth", authroute);

const PORT = process.env.PORT || 5000;

httpApp.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);
})

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Authenticate user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *       401:
 *         description: Unauthorized
 */




/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - User Registration
 *     requestBody:
 *       description: User registration details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: User registration failed due to validation errors
 */