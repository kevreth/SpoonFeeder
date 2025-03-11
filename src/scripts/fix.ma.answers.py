import yaml
from yaml.loader import SafeLoader
with open('course1.yml', encoding="utf8") as f:
  course = yaml.load(f, Loader=SafeLoader)
units = course['units']
ctr = 0
for unit in units:
  lessons = unit['lessons']
  for lesson in lessons:
    modules = lesson['modules']
    for module in modules:
      exercises = module['exercises']
      for exercise in exercises:
        if 'numans' in exercise:
          numans = exercise['numans']
          numans = str(numans)
          positions = numans.split(',')
          options = exercise['o']
          # print (options)
          for pos in positions:
            pos = int(pos)
            pos -= 1
            if pos==0: #no need to move anything if correct answer is in zero position.
              continue
            item = options.pop(pos)
            options.insert(0, item)
            exercise['o'] = options
          # print (options)
          length = len(positions)
          ctr+=1
          # print(ctr, exercise['type'], numans, length)
          if length == 1:
            if 'numans' in exercise:
              del exercise['numans']
            exercise['type'] = 'mc'
          else:
            if 'numans' in exercise:
              exercise['numans'] = length
            exercise['type'] = 'ma'
print(yaml.dump(course, sort_keys=False, width=float("inf")))
