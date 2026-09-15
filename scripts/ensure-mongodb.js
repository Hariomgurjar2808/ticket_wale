const net = require("node:net");
const { spawn } = require("node:child_process");

const host = process.env.MONGODB_HOST || "127.0.0.1";
const port = Number(process.env.MONGODB_PORT || 27017);
const dbPath = process.env.MONGODB_DB_PATH || "/opt/homebrew/var/mongodb";

function isMongoDBRunning() {
  return new Promise((resolve) => {
    const socket = net.createConnection({ host, port });
    socket.once("connect", () => {
      socket.end();
      resolve(true);
    });
    socket.once("error", () => resolve(false));
  });
}

async function waitForMongoDB(timeoutMs = 10000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    if (await isMongoDBRunning()) return true;
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  return false;
}

async function main() {
  if (await isMongoDBRunning()) {
    console.log("MongoDB is already running");
    return;
  }

  console.log(`Starting MongoDB on ${host}:${port}`);
  const mongoProcess = spawn("mongod", ["--dbpath", dbPath, "--bind_ip", host], {
    detached: true,
    stdio: "ignore",
  });

  mongoProcess.unref();

  if (!(await waitForMongoDB())) {
    console.error(`MongoDB did not start. Check the data directory: ${dbPath}`);
    process.exitCode = 1;
    return;
  }

  console.log("MongoDB started successfully");
}

main().catch((error) => {
  console.error("Unable to start MongoDB:", error.message);
  process.exitCode = 1;
});