require("dotenv").config();

const Person = require("./models/person");

const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const person = require("./models/person");
const { response } = require("express");
app.use(express.json());
morgan.token("content", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :content",
    {
      skip: function (req, res) {
        return !res.body;
      },
    }
  )
);
app.use(cors());
app.use(express.static("build"));

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
    console.log(persons);
  });
});

app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${
      persons.length
    } people</p> <p>${new Date()}</p>`
  );
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name) {
    return response.status(400).json({
      error: "name is missing",
    });
  }
  if (!body.number) {
    response.status(400).json({
      error: "number is missing",
    });
  }
  // Person.find({name: body.name}, (err, data) => {
  // if(err) {
  //     console.log(err)
  // }else {
  //     if(data.length) {
  //         return response.status(400).json({
  //             error: "name must be unique"
  //         })
  //     }

  // }
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });

  // })
});

app.put("/api/persons/:id", (request, response, next) => {
  body = request.body;
  Person.findByIdAndUpdate(request.params.id, body, (err, result) => {
    if (err) {
      response.send(err);
    } else {
      response.send(result);
    }
  });
});

app.delete("/api/persons/:id", (request, response, next) => {
  console.log(request);
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};

app.use(errorHandler);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
