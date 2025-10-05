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
const ClinicalTrial = artifacts.require("ClinicalTrial");
const InsuranceClaim = artifacts.require("InsuranceClaim");

module.exports = function (deployer) {
  deployer.deploy(HealthChain);
  deployer.deploy(DrugSupplyChain);
  deployer.deploy(ClinicalTrial);
  deployer.deploy(InsuranceClaim);
};