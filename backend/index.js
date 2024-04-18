const express = require("express");
const fs = require("fs");
const path = require("path");
const mergeFiles = require("merge-files");
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const app = express();
app.use(express.static("public"));
const port = 3911;
/*
'use strict';
const SSH = require('simple-ssh');

function run(sshConfig, script) {
  return new Promise((resolve, rejectnub) => {
    let scriptOutput = '';
    const sshFtw = new SSH(sshConfig);
    sshFtw.exec(script,
      { out: console.log.bind(console) })
      .on('error', (err) => reject(err))
      .on('close', () => resolve(scriptOutput))
      .start();
  });
};
*/
// respond with "hello world" when a GET request is made to the homepage
app.get("/ligand_viewer", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.sendFile(path.join(__dirname, "/ligand.html"));
});
app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.send("Docking Project v1 Backend");
});
app.get("/download", (req, res) => {
  file = req.query.filePath;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  console.log(file.split("/")[file.split("/").length - 1]);
  res.download(__dirname + file, file.split("/")[file.split("/").length - 1]);
});
app.get("/complex_viewer", (req, res) => {
  protein = req.query.protein;
  complex = req.query.complex;
  model = 0 || parseInt(req.query.model) - 1;
  hide_protein = false || parseInt(req.query.hide_protein)
  console.log(__dirname + "/public/data/Complex/" + protein + "/" + protein + "_" + complex + ".pdb");
  console.log(__dirname + "/public/data/proteins/" + protein + ".pdb");


  const complex_file = fs.readFileSync(__dirname + "/public/data/Complex/" + protein + "/" + protein + "_" + complex + ".pdb", { encoding: "utf8", flag: "r" });
  const protein_file = fs.readFileSync(__dirname + "/public/data/proteins/" + protein + ".pdb", { encoding: "utf8", flag: "r" });
  const protein_vis = hide_protein ? "" : protein_file
  model_array = complex_file.split("ENDMDL")
  model_array.pop()
  let result = protein_vis + model_array[model]

  fs.writeFileSync("public/result.pdb", result);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.sendFile(__dirname + "/ligand.html");

  // first call down and get the list of pdb files from endpoint here:
});
app.get("/number_of_models", (req, res) => {
  complex = req.query.complex;
  protein = req.query.protein
  const complex_file = fs.readFileSync(__dirname + "/public/data/Complex/" + protein + "/" + protein + "_" + complex + ".pdb", { encoding: "utf8", flag: "r" });
  length_of_file = complex_file.split("ENDMDL").length
  model_array = complex_file.split("ENDMDL")
  model_array.pop()
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.send({ "length_of_file": length_of_file, "models": model_array })
})
app.get("/proteins", (req, res) => {
  console.log("called proteins endpoint");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  MongoClient.connect(uri, async function (err, db) {
    if (err) throw err;
    var dbo = db.db("docking_metadata");
    function pm(p) {
      dbo
        .collection("protein models")
        .find()
        .toArray(async function (err, result) {
          if (err) throw err;

          res.send(p.concat(result));
        });
    }
    dbo
      .collection("proteins")
      .find()
      .toArray(async function (err, result) {
        if (err) throw err;

        pm(result);
      });
  });
});
app.get("/specificProtein", (req, res) => {
  console.log("called proteins endpoint");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  gene = req.query.gene
  pdbId = req.query.pdbId

  searchObj = { "Gene name": `${gene}`, "Gene": `${gene}`, "pdb_id": `${pdbId}`, }

  console.log(searchObj)
  MongoClient.connect(uri, async function (err, db) {
    if (err) throw err;
    var dbo = db.db("docking_metadata");
    function pm(searchObj) {
      let searchObjPM = searchObj
      delete searchObjPM['Gene name']
      if (pdbId == undefined) {
        delete searchObjPM['pdb_id']
      }
      if (gene == undefined) {
        delete searchObjPM['Gene']
      }
      if (Object.keys(searchObjPM).length === 0) {
        res.send({})
      }
      else {
        console.log('PM search', searchObjPM)
        dbo
          .collection("protein models")
          .find(searchObjPM)
          .toArray(async function (err, result) {
            if (err) throw err;

            res.send(result);
          });
      }
    }
    let searchObjP = searchObj
    delete searchObjP['Gene']
    if (pdbId == undefined) {
      delete searchObjP['pdb_id']
    }
    if (gene == undefined) {
      delete searchObjP['Gene name']
    }
    console.log(searchObjP)
    dbo
      .collection("proteins")
      .find(searchObjP)
      .toArray(async function (err, result) {
        if (err) throw err;
        console.log(result, 'protein collection search')
        if (result.length < 1) {
          pm(searchObj);
        }
        else {
          res.send(result)
        }

      });
  });
});
app.get("/ligands", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);

  let type = req.query.type;
  let search = req.query.search;
  MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    var dbo = db.db("docking_metadata");
    dbo
      .collection(type)
      .find({ cid: search })
      .toArray(function (err, result) {
        if (err) throw err;
        res.send(result);
      });
  });
});
app.get('/ligand', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  var protein = req.query.protein;
  var ligand = req.query.ligand;
  MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    var dbo = db.db("docking_metadata");
    dbo
      .collection(protein)
      .find({
        Ligand: ligand
      })
      .limit(1)
      .toArray(function (err, result) {
        if (err) throw err;

        console.log(result.length);
        res.send(result[0]);
        db.close();
      });
  })
})
app.get("/table", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  var protein = req.query.protein;
  var compound = req.query.compound
  var limit = parseInt(req.query.limit) || 100;
  var min_affinity = parseFloat(req.query.min_affinity) || 0;
  var max_affinity = parseFloat(req.query.max_affinity) || -100;
  var db_type = req.query.db_type
  if (db_type != 'Pubchem') {
    var db_op = /ZINC/
  }
  else {
    var db_op = { $not: /ZINC/ }
  }
  var page = (req.query.page - 1) * 100;
  console.log(protein, page, req.query.page, db_type);
  console.log(compound, "is ZINC?")
  if (!compound.includes('ZINC')) {
    console.log(compound)
    compound = parseInt(compound)
  }
  MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    var dbo = db.db("docking_metadata");
    dbo
      .collection(protein)
      .find({
        Affinity: { $gt: max_affinity, $lt: min_affinity }, Ligand: db_op
      })
      .sort({ Affinity: 1 })
      .skip(0)
      .limit(limit)
      .toArray(function (err, result) {
        if (err) throw err;
        var main_search_data = result
        if (compound == null) {
          res.send(result)
        }
        else {
          dbo
            .collection(protein).findOne({
              Ligand: compound
            }).then((single_result) => {
              console.log({
                Ligand: compound
              }, "ligand search")
              if (single_result != null) {
                var children = [single_result].concat(main_search_data)
                res.send(children)
              }
              else {
                var children = [{
                  Affinity: "Not Found in DB",
                  Complex: "Not Found in DB",
                  Ligand: "Not Found in DB",
                  Protein: "Not Found in DB",
                  _id: "Not Found in DB",
                }].concat(main_search_data)
                res.send(children)
              }
            })
        }



      });
  });
});
/*
app.get("/table_filter", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  var protein = req.query.protein;
  var min_affinity = parseFloat(req.query.min_affinity) || 0;
  var max_affinity = parseFloat(req.query.max_affinity) || 100;
  console.log(protein);

  MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    var dbo = db.db("docking_metadata");
    dbo
      .collection(protein)
      .find({ Affinity: { $gt: min_affinity, $lt: max_affinity } })
      .toArray(function (err, result) {
        if (err) throw err;
        res.send(result);
        db.close();
      });
  });
});
*/
app.get("/protein", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  var search = req.query.search;

  console.log(search);

  MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    var dbo = db.db("docking_metadata");
    dbo
      .collection("protiens")
      .findOne({ "Gene name": `${search}` })
      .then(function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
        db.close();
      });
  });
});
app.get("/pdbProteins", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);

  MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    var dbo = db.db("docking_metadata");
    dbo
      .collection("proteins")
      .find()
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
        db.close();
      });
  });
})
app.get("/proteinModels", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);

  MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    var dbo = db.db("docking_metadata");
    dbo
      .collection("protein models")
      .find()
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
        db.close();
      });
  });
})
// perform actions on the collection object

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
