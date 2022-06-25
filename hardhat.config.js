require('@nomiclabs/hardhat-waffle');
require('dotenv').config({ path: './.env' });

require('hardhat-deploy');
require('@nomiclabs/hardhat-ethers');

const defaultNetwork = 'rinkeby';

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.7',
  defaultNetwork,

  networks: {
    localhost: {
      chainId: 31337,
    },

    /////////
    // L1 NETWORKS
    /////////

    // mainnet: {
    //   chainId: 1,
    //   url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
    //   url: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
    //   accounts: [`${process.env.PRIVATE_KEY}`],
    // },

    // L1 TEST NETWORKS

    rinkeby: {
      chainId: 4,
      url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },

    /////////
    // L2 NETWORKS
    /////////

    polygon: {
      chainId: 137,
      url: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
    tokenOwner: 1,
  },
};
