import os
import yaml

def list_directories(path):
  dirs = []
  for item in os.listdir(path):
    if os.path.isdir(os.path.join(path, item)):
      dirs.append(item)
  return sorted(dirs)

path = "../courses/"
subdirs = list_directories(path)

with open("../courses/listing.yml", "w") as f:
  yaml.dump(subdirs, f)
