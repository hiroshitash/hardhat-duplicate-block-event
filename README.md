# Duplicated block event emits with WebSocketProvider

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Steps to reproduce:

```shell
npm i
npx hardhat node

#On a seprate window, run below:
npx hardhat run -network localhost scripts/deploy.ts --verbose

#Or below for debugging
node --inspect-brk node_modules/.bin/hardhat run  --network localhost scripts/deploy.ts --verbose
# 1. Open chrome and type in chrome://inspec
# 2. Click `inspect` under Remote Target


#On another window, run transactions
npx hardhat console --network localhost
> await network.provider.send("eth_sendTransaction", [{ from: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", to: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266" }]);
```

You should see duplicate block events like below
```
Lock with 0.001ETH and unlock timestamp 1685650949 deployed to 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
block 2023-06-01T20:21:33.910Z 6
block 2023-06-01T20:21:36.265Z 7
block 2023-06-01T20:21:39.046Z 8
block 2023-06-01T20:21:39.700Z 9
block 2023-06-01T20:21:39.705Z 9
block 2023-06-01T20:21:39.708Z 9
block 2023-06-01T20:21:40.312Z 9
block 2023-06-01T20:21:40.319Z 9
```


## How to debug on Chrome Devtool
Since Hardhat uses [fork](https://github.com/NomicFoundation/hardhat/blob/3ae4a78044c1dcb36eaca27c3af2d03b5145e173/packages/hardhat-core/src/internal/util/scripts-runner.ts#L32), we would have to pass new parameters in order to debug forked process from Chrome Devtool.

1. Add a breakpoint at [fork](https://github.com/NomicFoundation/hardhat/blob/3ae4a78044c1dcb36eaca27c3af2d03b5145e173/packages/hardhat-core/src/internal/util/scripts-runner.ts#L32)
```
const childProcess = fork(scriptPath, scriptArgs, {
    stdio: "inherit",
    execArgv: nodeArgs,
    env: envVars,
});
```
2. When it stops at the breakpoint above, click `Console` and run the following lines:
```
nodeArgs[0] = '--inspect=9228'
nodeArgs.splice(1, 0, '--inspect-brk')
scriptArgs = ['--verbose']
```
3. On Chrome, go to `chrome://inspect` and click `Configure` and add `localhost:9228`
4. You should see a new target (with scripts/deploy.ts) under Remote Target