const http = require("node:http");
const fs = require("node:fs");

const server = http.createServer((req, res) => {
  const { url, method } = req;
  res.setHeader("Content-Type", "application/json");
  // const departments = JSON.parse(fs.readFileSync("./department.json"));
  const sendResponse = (code, msg) => {
    res.statusCode = code;
    return res.end(JSON.stringify(msg));
  };

  if (url === "/department" && method === "GET") {
    res.end(fs.readFileSync("department.json"));
  } else if (url.startsWith("/department") && method === "GET") {
    let urlId = +url.split("/")[2];
    let department = JSON.parse(fs.readFileSync("department.json", "utf-8"));
    let idx = department.findIndex((x) => x.id === urlId);
    res.end(JSON.stringify(department[idx]));
  } else if (url === "/department" && method === "POST") {
    let department = JSON.parse(fs.readFileSync("department.json", "utf-8"));
    let body;
    req.on("data", (chunk) => {
      body = JSON.parse(chunk);
    });
    req.on("end", () => {
      department.push(body);
      fs.writeFileSync("department.json", JSON.stringify(department));
      res.end("Added");
    });
  } else if (url.startsWith("/department") && method === "PUT") {
    let urlId = +url.split("/")[2];
    let department = JSON.parse(fs.readFileSync("department.json", "utf-8"));
    let idx = department.findIndex((x) => x.id === urlId);
    let body;
    req.on("data", (chunk) => {
      body = JSON.parse(chunk);
    });
    req.on("end", () => {
      department[idx].department = body.department;
      fs.writeFileSync("department.json", JSON.stringify(department));
      res.end("Updated");
    });
  } else if (url.startsWith("/department") && method === "DELETE") {
    let urlId = +url.split("/")[2];
    let department = JSON.parse(fs.readFileSync("department.json", "utf-8"));
    let idx = department.findIndex((x) => x.id === urlId);
    department.splice(idx, 1);
    fs.writeFileSync("department.json", JSON.stringify(department));
    res.end("deleted");
  } else {
    sendResponse(404, { message: "Not Found" });
  }
});

server.listen(3000, (err) => {
  if (err) return console.log("error");
  console.log("Server is Running ...");
});
