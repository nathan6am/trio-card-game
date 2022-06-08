const axios = require("axios");

export default async function isTextClean(text) {
  const options = {
    method: "GET",
    url: "https://community-purgomalum.p.rapidapi.com/containsprofanity",
    params: { text: text },
    headers: {
      "X-RapidAPI-Host": "community-purgomalum.p.rapidapi.com",
      "X-RapidAPI-Key": "f675f3896fmsh251dce6a53cb627p168c53jsna5504c85810c",
    },
  };

  try {
    const res = await axios.request(options);
    return res.data;
  } catch (e) {
    console.error(e.message);
  }
}
