const express = require("express");
const path = require("path");
const app = express();
const cheerio = require("cheerio");
const axios = require("axios");
const bodyParser = require("body-parser");
const PORT = 3000;
app.use(express.json());

var cors = require("cors");

let corsOptions = {
  origin: "*", // 출처 허용 옵션
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
};

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "../middle/build")));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.listen(PORT, () => {
  console.log("server start");
});

// app.get('*', function (req,res) {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
//   });

app.post("/api/path", (req, res) => {
    const start = req.body.start.place_name.replace(' ','%20');
    const end = req.body.end.place_name.replace(' ','%20');
    
//cheerio 대신 셀레니움으로 수정
  res.json("success");
});

const getHtml = async (start, end) => {
  try {
    
    const url = `https://map.kakao.com/?sName=${start}&eName=${end}`;
    console.log(url);
    return await axios.get(url);
    // 해당 사이트 html 태그 가져오기
  } catch (error) {
    console.error(error);
  }
};
