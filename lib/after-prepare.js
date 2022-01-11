const fs = require("fs-extra");
const iOSPList = require("plist");
const handlebars = require("handlebars");

require('dotenv').config()

module.exports = function (
  $logger,
  $platformsDataService,
  $projectData,
  hookArgs
) {
  const platform = hookArgs.prepareData.platform;
  const platformData =
    $platformsDataService.platformsDataService[platform]._platformData;

  fs.readFile(platformData.configurationFilePath, (err, data) => {
    if (!err) {
      const source = data.toString();
      const result = renderToString(source, process.env);
      fs.writeFileSync(platformData.configurationFilePath, result);
    } else {
      console.error("[environment-environment-variable-hook] Could not write to template");
    }
  });
  if (platform == "ios") {
    // TODO: see if we can get app.entitlements too;
    console.log(platformData.configurationFilePath)
  }
};

function renderToString(source, data) {
  var template = handlebars.compile(source);
  var outputString = template(data);
  return outputString;
}