#!/bin/bash -e

if [[ "$TRAVIS_PULL_REQUEST" != "false" ]]; then
    echo -e "\033[0;33mPull Request detected; not installing extra software.\033[0m"
    exit 0
fi

echo "Installing IBM Cloud CLI"
curl -L https://clis.ng.bluemix.net/download/bluemix-cli/latest/linux64 > IBM_Cloud_CLI.tar.gz
tar -xvf IBM_Cloud_CLI.tar.gz
sudo ./Bluemix_CLI/install_bluemix_cli

echo "IBM Cloud Developer Tools"
curl -sL https://ibm.biz/idt-installer | bash

echo "Running IBM Cloud help"
ibmcloud dev help

echo "Configuring ibmcloud to disable version check"
ibmcloud config --check-version=false
echo "Checking ibmcloud version"
ibmcloud --version
