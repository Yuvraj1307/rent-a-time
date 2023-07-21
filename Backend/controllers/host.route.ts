import Host from "../models/host";
import express, { Request, Response } from "express";
import { WhereOptions } from "sequelize";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import auth from "../middlewares/auth";
import * as dotenv from "dotenv";
import client from "../config/redis";
// import { Property } from "../models/property";
dotenv.config();

const HostRouter = express.Router();

enum HostRole {
  Admin = "admin",
  Host = "host",
  User = "user",
}

interface HostAttributes {
  id: string;
  name: string;
  email: string;
  mobile: number;
  password: string;
  role: HostRole;
}

//<<<<<<<<<<<<<<<<<<-------------to get hosts----------------->>>>>>>>>>>>>>>>

HostRouter.get("/", async (req, res) => {
  let hosts = await Host.findAll();
  res.status(200).send(hosts);
});

//<<<<<<<<<<<<<<<<------------to create host-------------->>>>>>>>>>>>>>>>

HostRouter.post("/register", async (req: Request, res: Response) => {
  const { name, email, mobile, password, role } = req.body as HostAttributes;
  try {
    let data = await Host.findOne({ where: { email } });

    if (data) {
      return res
        .status(200)
        .send({ msg: "host already registered Please login first" });
    }

    bcrypt.hash(password, 5, async function (err, hash) {
      if (err) {
        console.log(err.message);
        return res.status(404).send({ msg: "something went wrong", err });
      } else {
        console.log(hash);
        let host = Host.build({
          name,
          email,
          mobile,
          password: hash,
          role,
        });
        await host.save();
        return res.status(201).send("host registered successfully");
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: error.message });
  }
});

//<<<<<<<<<<<<--------------login host ------------->>>>>>>>>>>>

HostRouter.post("/login", async (req: Request, res: Response) => {
  interface logindata {
    email: string;
    password: string;
  }

  let { email, password } = req.body as logindata;

  try {
    let host = await Host.findOne({ where: { email } });

    if (!host) {
      return res.status(404).send({ msg: "host not found" });
    }
    // remember to check for id
    bcrypt.compare(password, host.dataValues.password, function (err, result) {
      if (result) {
        var token = jwt.sign(
          { userID: host.dataValues.id, email: host.dataValues.email },
          process.env.secret_key,
          { expiresIn: "2h" }
        );
        console.log(token);
        res
          .status(201)
          .send({ msg: "logi success", token, name: host.dataValues.name });
      } else {
        console.log(err);
        res.status(404).send({ mag: "Incorrect pasword" });
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: error.message });
  }
});

// <<<<<<<<<<<<<-----------------logout host---------------------->>>>>>>>>>>>>>>>

HostRouter.get("/logout", auth, async (req: Request, res: Response) => {
  let token = req.body.token;
  let expiryInSeconds = 10;
  await client.SADD("tokenBlacklist", token);

  await client.expire("tokenBlacklist", expiryInSeconds);

  res.send({ msg: "logout successful" });
});

//<<<<<<<<<<<<<<<<<----------------property creation-------------------->>>>>>>>>>>>>>>

// HostRouter.post("/property", auth, async (req: Request, res: Response) => {
//   //   let data=req.body
//   let { name, address, price,album, type, availableroom, hostId } = req.body;
//     try {
//     //   let prop=  Property.build({ name, address, price, type, availableroom, hostId })
//     let data=Property.build({ name, address,album, price, type, availableroom, hostId })
//       await data.save()
//       res.send(data)

//     } catch (error) {
//       console.log(error.message);
//             res.status(400).send({ msg: error.message });
//     }
// });

//<<<<<<<<<<<<<<<------------to delete something--------------->>>>>>>>>>>>>>>>>

HostRouter.delete("/:id", async (req: Request, res: Response) => {
  let id = req.params.id;

  try {
    let host = await Host.destroy({
      where: { id: id },
    });

    res.status(200).send({ msg: "host is deleted", host });
  } catch (error) {
    console.log(error.message);
    res.status(404).send({ msg: "can't delete host", error });
  }
});

//<<<<<<<<<<---------------to update something--------------->>>>>>>>>>>>>>>

HostRouter.patch("/:id", async (req: Request, res: Response) => {
  let id = req.params.id;
  let data = req.body;
  try {
    const whereClause: WhereOptions<HostAttributes> = {
      id: id as unknown as HostAttributes["id"],
    };
    let host = await Host.update(data, {
      where: { id: id },
    });

    res.status(201).send({ msg: "updation successful", host });
  } catch (error) {
    console.log(error.message);
    res.status(404).send({ msg: "can't update host", error });
  }
});

//<<<<<<<<<<<<<-----------delete a table----------->>>>>>>>>>>>>>>

HostRouter.delete("/delete/D", async (req: Request, res: Response) => {
  try {
    await Host.drop();
    res.send("table is drouped");
  } catch (error) {
    res.send("can't droup table");
  }
});




HostRouter.delete("/delete/P", async (req: Request, res: Response) => {
    try {
      await Host.drop();
      res.send("table is drouped");
    } catch (error) {
      res.send("can't droup table");
    }
  });
 export default HostRouter;
