const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  // Courses API

  const { url, method } = req;
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

    //Department API
  } else if (url === "/department" && method === "GET") {
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
  }

  //Studens API
  else if (url === "/students" && method === "GET") {
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
    let studentsWithCourses = students.map((student) => {
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
server.listen(3000, () => {
  console.log("server is running...");
});
