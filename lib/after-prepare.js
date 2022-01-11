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

  editTemplateFile(platformData.configurationFilePath);

  if (platform == "ios") {
    editTemplateFile(platformData.configurationFilePath.replace(`-${platformData.configurationFileName}`, '.entitlements'));
  }
};

function editTemplateFile(path) {
  console.log(path);
  fs.readFile(path, (err, data) => {
    if (!err) {
      const source = data.toString();
      const result = renderToString(source, process.env);
      fs.writeFileSync(path, result);
    } else {
      console.error(`[environment-environment-variable-hook] Could not update template ${path}`);
    }
  });
}

function renderToString(source, data) {
  var template = handlebars.compile(source);
  var outputString = template(data);
  return outputString;
}