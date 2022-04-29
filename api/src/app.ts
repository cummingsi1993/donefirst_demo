import express = require("express");
import cors = require("cors");
import {
  couchbaseConnectTest,
  getCollection,
  getCluster,
} from "./couchbaseRepo";

const app = express();
app.use(cors());
app.use(express.json());

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
    await collection.insert(
      `registrations/${registration.email}`,
      registration
    );

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

app.get("/api/v1/registrations", async (req, res) => {
  try {
    const db = await getCluster();
    const queryResult = await db.query("SELECT * FROM patient_registration");
    res.send(queryResult.rows.map((row) => row.patient_registration));
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

app.listen(80, () => {
  console.log(`were live!`);
});
