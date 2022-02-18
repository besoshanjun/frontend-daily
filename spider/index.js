// 爬虫
const axios = require("axios");
const fs = require("fs");
const path = require("path");

axios
  .get(
    "https://unsplash.com/napi/search/photos?query=food&per_page=20&page=2&xp="
  )
  .then((res) => {
    const {results = [] } = res.data;
    results.forEach((result) => {
      const url = result.links.download;
      const id = result.id;
      axios.get(url, {
        responseType: 'arraybuffer'
      }).then(res => {
        const buffer = Buffer.from(res.data, 'binary');
        fs.writeFileSync(path.resolve(__dirname, `./unsplash/${id}`), buffer)
      })
    });
  });
