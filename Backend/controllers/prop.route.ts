import User from "../models/user";
import express, { Request, Response } from "express";
import { WhereOptions } from "sequelize";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import auth from "../middlewares/auth";
import * as dotenv from "dotenv";
import client from "../config/redis";
import Property from "../models/property";
dotenv.config();


const propRouter=express.Router()

propRouter.post("/property", auth, async (req: Request, res: Response) => {
  //   let data=req.body
  let { name, address, price,album, type, availableroom, hostId } = req.body;
    try {
    //   let prop=  Property.build({ name, address, price, type, availableroom, hostId })
    let data=Property.build({ name, address,album, price, type, availableroom, hostId })
      await data.save()
      res.send(data)

    } catch (error) {
      console.log(error.message);
            res.status(400).send({ msg: error.message });
    }
});



export default propRouter