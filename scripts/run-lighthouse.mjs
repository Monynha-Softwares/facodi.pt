import { spawn } from "child_process";
import { mkdir } from "fs/promises";
import { resolve } from "path";

const run = (command, args, options = {}) =>
  new Promise((resolvePromise, rejectPromise) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      shell: process.platform === "win32",
      ...options,
    });
    child.on("close", (code) => {
      if (code === 0) {
        resolvePromise(undefined);
      } else {
        rejectPromise(new Error(`${command} exited with code ${code}`));
      }
    });
  });

const startServer = (command, args, options = {}) => {
  const child = spawn(command, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
    ...options,
  });
  return child;
};

const delay = (ms) => new Promise((resolvePromise) => setTimeout(resolvePromise, ms));

async function main() {
  const reportDir = resolve("reports", "lighthouse");
  await mkdir(reportDir, { recursive: true });

  await run("npm", ["run", "build"]);

  const server = startServer("npx", ["next", "start", "-p", "4000"]);
  await delay(4000);

  const reportPath = resolve(reportDir, "report.json");
  await run("npx", [
    "lighthouse",
    "http://localhost:4000/pt",
    "--output=json",
    `--output-path=${reportPath}`,
    "--quiet",
    "--enable-error-reporting=false",
    "--chrome-flags=--headless=new",
    "--chrome-flags=--no-sandbox",
  ]);

  server.kill("SIGINT");
  console.info(`Lighthouse report saved to ${reportPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
