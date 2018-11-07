const Cluster = require("../models/cluster.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Cluster content can't be empty"
    });
  }
  let size = {};
  switch (req.body.size) {
    case "SMALL":
      size = {
        master_node: 1,
        infra_node: 1,
        app_node: 2
      };
      break;
    case "MEDIUM":
      size = {
        master_node: 1,
        infra_node: 1,
        app_node: 3
      };
      break;
    case "LARGE":
      size = {
        master_node: 1,
        infra_node: 1,
        app_node: 5
      };
      break;
    default:
      size = {
        master_node: 1,
        infra_node: 1,
        app_node: 3
      };
      break;
  }
  const cluster = new Cluster({
    env_id: req.body.env_id.toLowerCase(),
    customer_id: req.body.customer_id.toLowerCase(),
    logging: req.body.logging,
    metrics: req.body.metrics,
    size: size,
    ha: req.body.ha,
    ocp_version: req.body.ocp_version,
    hosting_platform: req.body.hosting_platform
  });

  cluster
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occured."
      });
    });
};

exports.findAll = (req, res) => {
  Cluster.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occured."
      });
    });
};

exports.findOne = (req, res) => {
  if (!req.params.env_id) {
    res.status(400).send({
      message: "You must provide an environment id parameter."
    });
    return;
  }
  Cluster.find({ env_id: req.params.env_id.toLowerCase() })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occured."
      });
    });
};

exports.update = (req, res) => {
  if (!req.params.env_id) {
    res.status(400).send({
      message: "You must provide an environment id parameter."
    });
    return;
  }
  Cluster.updateOne({ env_id: req.params.env_id.toLowerCase() }, req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occured."
      });
    });
};

exports.delete = (req, res) => {
  if (!req.params.env_id) {
    res.status(400).send({
      message: "You must provide an environment id parameter."
    });
    return;
  }
  Cluster.deleteOne({ env_id: req.params.env_id.toLowerCase() })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occured."
      });
    });
};
