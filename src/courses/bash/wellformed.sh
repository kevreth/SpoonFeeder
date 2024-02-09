#!/bin/bash

# Check if a file name is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <yaml_file>"
    exit 1
fi

# The YAML file to validate
yaml_file="$1"

# Validate the YAML file using yq
yq eval . "$yaml_file" > /dev/null

# Check the exit status of the yq command
if [ $? -eq 0 ]; then
    echo "$yaml_file is well-formed."
else
    echo "$yaml_file is not well-formed."
    exit 1
fi
