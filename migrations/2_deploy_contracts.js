// const EHR = artifacts.require("EHR");

// module.exports = function (deployer) {
//   deployer.deploy(EHR);
// };


    const HealthChain = artifacts.require("HealthChain");
    module.exports = function (deployer) {
      deployer.deploy(HealthChain);
    };

