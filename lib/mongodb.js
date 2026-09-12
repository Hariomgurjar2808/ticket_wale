import { MongoClient } from "mongodb";

let client;
let clientPromise;

export function isMongoConnectionError(error) {
  if (!error) return false;

  const message = String(error?.message || "");
  return (
    error?.name === "MongoServerSelectionError" ||
    error?.name === "MongoNetworkError" ||
    error?.code === "ECONNREFUSED" ||
    message.includes("ECONNREFUSED") ||
    message.includes("MongoServerSelectionError") ||
    message.includes("connect ECONNREFUSED")
  );
}

function getMongoClientPromise() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  }

  if (!clientPromise) {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }

  return clientPromise;
}

const lazyClientPromise = {
  then(onFulfilled, onRejected) {
    return getMongoClientPromise().then(onFulfilled, onRejected);
  },
  catch(onRejected) {
    return getMongoClientPromise().catch(onRejected);
  },
  finally(onFinally) {
    return getMongoClientPromise().finally(onFinally);
  },
};

export default lazyClientPromise;