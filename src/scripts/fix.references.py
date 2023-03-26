import yaml

from yaml.loader import SafeLoader
with open('course.yml', encoding="utf8") as f:
  course = yaml.load(f, Loader=SafeLoader)
  units = course['units']
  objctr = 0
  for unit in units:
    lessons = unit['lessons']
    for lesson in lessons:
      modules = lesson['modules']
      for module in modules:
        exercises = module['exercises']
        for exercise in exercises:
          if 'ref' in exercise:
            ref = exercise['ref']
            if isinstance(ref, list):
              refReplace = ''
              for item in ref:
                refReplace += f'          * {item}NEWLINE634'
              exercise['ref'] = "|NEWLINE634" + refReplace
print(yaml.safe_dump(course, sort_keys=False, width=float("inf")))
