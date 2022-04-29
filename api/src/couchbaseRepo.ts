import { connect, Cluster, Bucket, Collection } from "couchbase";

let cluster: Cluster | "not-loaded" = "not-loaded";
export const getCluster = async () => {
  if (cluster === "not-loaded") {
    console.log("connecting to couchbase for the first time.");
    console.log("loading bucket");
    cluster = await connect("localhost:11210", {
      username: "Administrator",
      password: "Password",
    });
  }
  return cluster;
};

let bucket: Bucket | "not-loaded" = "not-loaded";
export const getBucket = async () => {
  const cluster = await getCluster();
  if (bucket === "not-loaded") {
    bucket = cluster.bucket("patient_registration");
  }
  return bucket;
};

let collection: Collection | "not-loaded" = "not-loaded";
export const getCollection = async (): Promise<Collection> => {
  const bucket = await getBucket();
  if (collection === "not-loaded") {
    console.log("loading collection");
    collection = bucket.defaultCollection();
  }
  return collection;
};

export const couchbaseConnectTest = async (): Promise<
  { connectionSuccessful: true } | { connectionSuccessful: false; error: any }
> => {
  try {
    const _ = await getCollection();
    return {
      connectionSuccessful: true,
    };
  } catch (err) {
    return {
      connectionSuccessful: false,
      error: err,
    };
  }
};
