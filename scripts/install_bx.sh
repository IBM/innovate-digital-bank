#!/bin/bash -e

if [[ "$TRAVIS_PULL_REQUEST" != "false" ]]; then
    echo -e "\033[0;33mPull Request detected; not installing extra software.\033[0m"
    exit 0
fi

echo "Installing Bluemix CLI"
curl -L https://public.dhe.ibm.com/cloud/bluemix/cli/bluemix-cli/latest/IBM_Cloud_CLI_amd64.tar.gz > Bluemix_CLI.tar.gz
tar -xvf Bluemix_CLI.tar.gz
sudo ./Bluemix_CLI/install_bluemix_cli

echo "Installing Developer Tools"
curl -sL https://ibm.biz/idt-installer | bash

echo "Configuring bx to disable version check"
bx config --check-version=false
echo "Checking bx version"
bx --version
