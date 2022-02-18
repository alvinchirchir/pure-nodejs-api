//Configuration variables

var environments = {};

//Staging

environments.staging = {
  port: 4000,
  envName: "staging",
};

//Production
environments.production = {
  port: 5000,
  envName: "production",
};


var currentEnvironment=typeof(process.env.NODE_ENV)=='string'?process.env.NODE_ENV.toLowerCase():'';


var environmentToExport=typeof(environments[currentEnvironment])=='object'?environments[currentEnvironment]:environments.staging;

//Exportthe module
module.exports=environmentToExport