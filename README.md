# React Template
React template created using [create-react-app](https://github.com/facebook/create-react-app) with the goal of having a minimal React application to bootstrap new projects.  
It consists of a simple two-page application (login + main page).
## Features
The following features are implemented:
- [x] Routing (to switch among pages)
- [x] Redux (to store authentication data)
- [x] Axios (to send HTTP requests)
- [x] Only functional components
- [x] SCSS (for styling)
- [ ] Typescript
- [ ] Material-UI framework (for UI)

## Usage
It can be run using the Dockerfiles provided or by using ```npm start``` locally after installing the required dependencies.  
The following code snippet can be copied in a node.js application to test the interaction with the server:
```js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.post("/session", (req, res) => {
  console.log("User is trying to login...");

  res.status(200).send({
    email: "username-test",
    token: "token-test",
  });
});

app.get("/test", (req, res) => {
  console.log("User is asking for data...");

  res.status(200).send([
    {
      id: 1,
      title: "First Example",
      description: "This is a short example.",
    },
    {
      id: 2,
      title: "Second Example",
      description: "Yet another example.",
    },
  ]);
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});

```
