const fs = require('fs');

let year, month, day;

const arg = process.env.DATE;
if (arg && arg.length === 6) {
  year = arg.substring(0, 2);
  month = arg.substring(2, 4);
  day = arg.substring(4, 6);
} else {
  const today = new Date();

  year = today.getFullYear() - 2000;
  if (year < 10)
    year = `0${year}`;

  month = today.getMonth() + 1;
  if (month < 10)
    month = `0${month}`;

  day = today.getDate()
  if (day < 10)
    day = `0${day}`;
}

const regions = [ 'Thailand_asia' ];

regions.forEach(region => {
  removeFiles(region, year, month);
  if (day !== '00')
    downloadFile(region, year, month, "00");

  downloadFile(region, year, month, day);
});

function downloadFile(region, year, month, day) {
  const filename = `${region}_${year}_${month}_${day}.obf`;
  const source = `https://download.osmand.net/download?aosmc=true&self=true&file=${filename}.gz`
  const target = `./data/latest/${filename}`;
  console.log(`echo "-- downloading ${filename}"`);
  console.log(`curl -k -o - "${source}" | gunzip > "${target}"`);
}

function removeFiles(region, year, month) {
  const files = fs.readdirSync('./data/latest/').filter(f => f.match(`${region}_${year}_${month}`));
  files.forEach(filename => {
    console.log(`echo "-- removing ${filename}"`);
    console.log(`rm ./data/latest/${filename}`)
  });
}