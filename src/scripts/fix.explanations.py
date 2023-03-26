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
        if 'exp' in exercise:
          exp = exercise['exp']
          if isinstance(exp, list):
            expReplace = ''
            for item in exp:
              if not isinstance(item, str):
                if isinstance(item, object):
                  objctr += 1
                  for key in item:
                    expReplace += f'          * {key}NEWLINE634'
                    value = item[key]
                    if isinstance(value, list):
                      for itema in value:
                        expReplace += '            ** ' + itema + "NEWLINE634"
              else:
                expReplace += f'          * {item}NEWLINE634'
            if expReplace != '':
              expReplace = "|NEWLINE634" + expReplace
              exercise['exp'] = expReplace

        # if 'ref' in exercise:
        #   if isinstance(ref, str):
        #     ref = exercise['ref']
        #     print(ref)
        #   if isinstance(ref, list):
        #     ref = exercise['ref']
        #     print(ref)
        #   ref = exercise['ref']
        #   print(ref)
        # adoc = markdown_to_asciidoc(exp)
        # print(adoc)
print(yaml.dump(course, sort_keys=False, width=float("inf")))
