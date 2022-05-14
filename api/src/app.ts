import express = require("express");
import cors = require("cors");
import {
  couchbaseConnectTest,
  getCollection,
  getCluster,
} from "./couchbaseRepo";

const app = express();
app.use(cors()); //The high limit is in case of large photos attached.
app.use(express.json({ limit: "1000mb" }));

//health check endpoint
app.get("/api/v1/health", async (req, res) => {
  const connectionTest = await couchbaseConnectTest();
  res.send({
    alive: true,
    couchbase: connectionTest.connectionSuccessful,
  });
});

app.post("/api/v1/registration", async (req, res) => {
  try {
    const collection = await getCollection();

    const registration = req.body;
    //TODO: Add some server side validations to prevent malicious users (or perhaps a bug) from bypassing the client validations.
    await collection.insert(
      `registrations/${registration.email}`,
      registration,
      { timeout: 5000 }
    );

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

app.get("/api/v1/registrations", async (req, res) => {
  try {
    //Since this is loading every single record, we will be only loading the license photo lazily if necessary
    const db = await getCluster();
    const queryResult = await db.query(
      "SELECT firstName, lastName, dateOfBirth, phoneNumber, email, address, appointmentTime FROM patient_registration"
    );
    res.send(queryResult.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get("/api/v1/registration/license", async (req, res) => {
  try {
    const { email } = req.query;
    if (typeof email !== "string") {
      res.send(400);
      return;
    }
    const db = await getCollection();
    const record = await db.get(`registrations/${email}`);
    res.set({ "Content-Type": "image/png" });

    res.send(record.content.licensePhoto);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(80, () => {
  console.log(`were live!`);
});
