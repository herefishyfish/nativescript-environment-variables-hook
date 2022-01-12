const fs = require("fs-extra");
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
  const nsConfig = $projectData.nsConfig;
  
  if (nsConfig) {
    if (nsConfig.id) {
      process.env['APP_ID'] = nsConfig.id;
    }
    
    const hookConfig = $projectData.nsConfig.environmentVariablesHook;
    if (hookConfig && hookConfig.additionalPaths) {
      try {
        hookConfig.additionalPaths.forEach((path) => {
          editTemplateFile(path);
        });
      } catch (error) {
        console.warn(`[environment-environment-variable-hook] Could not update template ${path}`);   
      }
    }
  }

  editTemplateFile(platformData.configurationFilePath);

  if (platform == "ios") {
    editTemplateFile(platformData.configurationFilePath.replace(`-${platformData.configurationFileName}`, '.entitlements'));
  }
};

function editTemplateFile(path) {
  fs.readFile(path, (err, data) => {
    if (!err) {
      const source = data.toString();
      const result = renderToString(source, process.env);
      fs.writeFileSync(path, result);
    } else {
      console.warn(`[environment-environment-variable-hook] Could not update template ${path}`);
    }
  });
}

function renderToString(source, data) {
  var template = handlebars.compile(source);
  var outputString = template(data);
  return outputString;
}