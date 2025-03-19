@REM This script is used to start the application on Microsoft AVD for local development
yarn config set registry https://registry.npmjs.org/ss
yarn install --network-timeout 1000000
yarn start