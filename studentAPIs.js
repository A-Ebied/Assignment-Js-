const http = require("node:http");
const fs = require("node:fs");

const server = http.createServer((req, res) => {
  const { url, method } = req;
  res.setHeader("Content-Type", "application/json");
  if (url === "/students" && method === "GET") {
    res.end(fs.readFileSync("students.json"));
  } else if (url.startsWith("/students/") && method === "GET") {
    let urlId = +url.split("/")[2];
    let students = JSON.parse(fs.readFileSync("students.json", "utf-8"));
    let idx = students.findIndex((x) => x.id === urlId);
    res.end(JSON.stringify(students[idx]));
  } else if (url === "/students" && method === "POST") {
    let students = JSON.parse(fs.readFileSync("students.json", "utf-8"));
    let body;
    req.on("data", (chunk) => {
      body = JSON.parse(chunk);
    });
    req.on("end", () => {
      isUniqeEmail = students.find((x) => x.email === body.email);
      if (isUniqeEmail === undefined) {
        students.push(body);
        fs.writeFileSync("students.json", JSON.stringify(students));
        res.end("Added");
      } else {
        res.end("Email already in use..!");
      }
    });
  } else if (url.startsWith("/students") && method === "PUT") {
    let urlId = +url.split("/")[2];
    let students = JSON.parse(fs.readFileSync("students.json", "utf-8"));
    let idx = students.findIndex((x) => x.id === urlId);
    let body;
    req.on("data", (chunk) => {
      body = JSON.parse(chunk);
    });
    req.on("end", () => {
      students[idx] = body;
      fs.writeFileSync("students.json", JSON.stringify(students));
      res.end("Updated");
    });
  } else if (url.startsWith("/students") && method === "DELETE") {
    let urlId = +url.split("/")[2];
    let students = JSON.parse(fs.readFileSync("students.json", "utf-8"));
    let idx = students.findIndex((x) => x.id === urlId);
    students.splice(idx, 1);
    fs.writeFileSync("students.json", JSON.stringify(students));
    res.end("deleted");
  } else if (url === "/studentsC" && method === "GET") {
    let courses = JSON.parse(fs.readFileSync("courses.json", "utf-8"));
    let students = JSON.parse(fs.readFileSync("students.json", "utf-8"));
    // reading json files
    let studentsWithCourses;
    studentsWithCourses = students.map((student) => {
      //edit every student and add his course by department ID
      let id = student.departmentId;
      let studentCourse = courses.find((c) => c.departmentId === id);
      student.courses = studentCourse;
      return student;
    });

    res.end(JSON.stringify(studentsWithCourses));
  } else {
    return res.end(`invalid url ${req.url} with method ${req.method}`);
  }
});

server.listen(3000, (err) => {
  if (err) return console.log("error");
  console.log("Server is Running ...");
});
