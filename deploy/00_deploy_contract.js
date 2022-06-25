// deploy/00_deploy_contract

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
  
    const args = [];
    await deploy('Guestbook', {
      // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
      args: args,
      from: deployer,
      log: true,
    });
  };
  module.exports.tags = ['all', 'guestbook'];