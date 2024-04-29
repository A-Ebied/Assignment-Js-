const http = require("node:http");
const fs = require("node:fs");

const server = http.createServer((req, res) => {
  const { url, method } = req;
  res.setHeader("Content-Type", "application/json");
  // const courses = JSON.parse(fs.readFileSync("./course.json"));
  const sendResponse = (code, msg) => {
    res.statusCode = code;
    return res.end(JSON.stringify(msg));
  };
  if (url === "/courses" && method === "GET") {
    let courses = JSON.parse(fs.readFileSync("courses.json", "utf-8"));
    res.end(JSON.stringify(courses));
  } else if (url === "/courses" && method === "POST") {
    let body;
    req.on("data", (chunk) => {
      body = JSON.parse(chunk);
    });
    req.on("end", () => {
      let courses = JSON.parse(fs.readFileSync("courses.json", "utf-8"));
      courses.push(body);
      fs.writeFileSync("courses.json", JSON.stringify(courses));
      res.end("added");
    });
  } else if (url.startsWith("/courses") && method === "PUT") {
    let urlId = +url.split("/")[2];
    let courses = JSON.parse(fs.readFileSync("courses.json", "utf8"));
    let idx = courses.findIndex((x) => x.id === urlId);
    let body;
    req.on("data", (chunk) => {
      body = JSON.parse(chunk);
    });
    req.on("end", () => {
      courses[idx].course = body.course;
      fs.writeFileSync("courses.json", JSON.stringify(courses));
      res.end("updated");
    });
  } else if (url.startsWith("/courses") && method === "DELETE") {
    let urlId = url.split("/")[2];
    let courses = JSON.parse(fs.readFileSync("courses.json", "utf-8"));
    let idx = courses.findIndex((x) => x.id === urlId);
    let body;
    req.on("data", (chunk) => {
      body = JSON.parse(chunk);
    });
    req.on("end", () => {
      courses.splice(idx, 1);
      fs.writeFileSync("courses.json", JSON.stringify(courses));
      res.end("deleted");
    });
  } else if (url.startsWith("/courses") && method === "GET") {
    let urlId = +url.split("/")[2];
    let courses = JSON.parse(fs.readFileSync("courses.json", "utf-8"));
    let idx = courses.findIndex((x) => x.id === urlId);
    res.end(JSON.stringify(courses[idx]));
  } else {
    sendResponse(404, { message: "Not Found" });
  }
});

server.listen(3000, (err) => {
  if (err) return console.log("error");
  console.log("Server is Running ...");
});
