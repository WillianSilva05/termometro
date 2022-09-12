const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

const port = 3002;
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/style", async (req, res) => {
    res.sendFile(path.join(__dirname + "/assets/css/index.css"));
});

app.get("/script", async (req, res) => {
    res.sendFile(path.join(__dirname + "/assets/js/script.js"));
    
});

app.get("/meta", (req, res) => {
    res.sendFile(path.join(__dirname + "/assets/meta.js"));
});

app.get("/vendido", (req, res) => {
    res.sendFile(path.join(__dirname + "/assets/vendido.js"));
});

app.post("/alterarMeta", (req, res) => {
    let meta = `export default {"meta" : ${req.body.meta}}`;

    fs.writeFile(path.join(__dirname + "/assets/meta.js"), meta, (err) => {
        if (err) console.log(err);
    });

    res.send("<script>if (!window.alert('Meta alterada com sucesso!')) {window.location.href='/'}</script>")
});

app.post("/addVenda", (req, res) => {
    let venda = `export default {"vendido" : ${Number(req.body.venda) + Number(req.body.vendido)}}`;

    fs.writeFile(path.join(__dirname + "/assets/vendido.js"), venda, (err) => {
        if (err) console.log(err);
    });

    res.send("<script>if (!window.alert('Venda adicionada com sucesso!')) {window.location.href='/'}</script>")
});

app.post("/editVenda", (req, res) => {
    let venda = `export default {"vendido" : ${Number(req.body.venda)}}`;

    fs.writeFile(path.join(__dirname + "/assets/vendido.js"), venda, (err) => {
        if (err) console.log(err);
    });

    res.send("<script>if (!window.alert('Venda editada com sucesso!')) {window.location.href='/'}</script>")
});

app.listen(port);
