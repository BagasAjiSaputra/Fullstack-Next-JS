import fetch from "node-fetch";

(async () => {
  for (let i = 1; i <= 50; i++) {
    const res = await fetch("https://www.lanaradesain.com/");
    console.log(i, res.status);
  }
})();