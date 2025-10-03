// const EHR = artifacts.require("EHR");

// module.exports = function (deployer) {
//   deployer.deploy(EHR);
// };


    // const HealthChain = artifacts.require("HealthChain");
    // module.exports = function (deployer) {
    //   deployer.deploy(HealthChain);
    // };

const HealthChain = artifacts.require("HealthChain");
const DrugSupplyChain = artifacts.require("DrugSupplyChain");

module.exports = function (deployer) {
  deployer.deploy(HealthChain);
  deployer.deploy(DrugSupplyChain);
};