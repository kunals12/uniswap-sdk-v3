require("dotenv").config();
const ethers = require("ethers");
const {
  abi: QuoterABI,
} = require("@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json");

const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_LINK);

const fetchPrice = async (addressFrom, addressTo, value) => {
  const quoterContract = new ethers.Contract(
    "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6",
    QuoterABI,
    provider
  );

  const amountToPass = ethers.utils.parseUnits(value);
  const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
    addressFrom,
    addressTo,
    3000,
    amountToPass,
    0
  );

  const amount = ethers.utils.formatUnits(quotedAmountOut.toString(), 18);
  return amount;
};

const main = async () => {
  const addressFrom = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; //weth
  const addressTo = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; //dai
  const value = "1";

  const result = await fetchPrice(addressFrom, addressTo, value);
  console.log(result);
};

main();
