#!/bin/bash
mkdir old
echo ""
echo "Cloning old RazorFlow JS Repo for reference reasons"
git clone git@bitbucket.org:razorflow/oldjsrf.git old/oldjsrf

echo "Cloning RazorFlow JS Core"
git clone git@bitbucket.org:razorflow/jsrf.git jsrf

echo "Cloning RazorFlow PHP"
git clone git@bitbucket.org:razorflow/phprf.git phprf

echo "Cloning Docs"
git clone git@github.com:razorflow/docs.git docs

echo "Cloning RazorDoc"
git clone git@github.com:razorflow/razordoc.git razordoc

echo "Cloning Webrf"
git clone git@github.com:razorflow/docs.git phprf

echo "Cloning Examples"
git clone git@github.com:razorflow/examples.git examples
