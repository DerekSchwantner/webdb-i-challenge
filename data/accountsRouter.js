const express = require("express");
const knex = require("knex");

const db = require("./dbConfig");
const router = express.Router();

router.get("/", (req, res) => {
  db("accounts")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .first()
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "post with that id does not exist" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/", (req, res) => {
  const account = req.body;
  db("accounts")
    .insert(account, "id")
    .then(arrayOfIds => {
      const idOfLastInserted = arrayOfIds[0];
      res.status(201).json(idOfLastInserted);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.put("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: `${count} record updated` });
      } else {
        res
          .status(404)
          .json({ message: "account with that id does not exist" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .delete()
    .then(count => {
      res.status(200).json({ message: `${count} record deleted` });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
module.exports = router;
