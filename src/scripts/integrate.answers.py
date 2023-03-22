import yaml
from yaml.loader import SafeLoader
with open('cp.exam.guide.questions.yml') as f:
  questions = yaml.load(f, Loader=SafeLoader)
with open('cp.exam.guide.answers.yml') as f:
  answers = yaml.load(f, Loader=SafeLoader)
qnum = 0
partNum=-1
for part in questions:
  partNum +=1
  for exercise in part['exercises']:
    exercise['qnum'] = qnum
    exercise['ans'] =  answers[partNum]['exercises'][qnum]['ans']
    qnum += 1
    exercise['qnum'] = qnum
  qnum = 0
for part in questions:
  for exercise in part['exercises']:
    ans = exercise['ans']
    arr = ans.split(',')
    positions = []
    for item in arr:
      pos = ord(item) - 65
      positions.append(pos)
    options = exercise['o']
    for pos in positions:
      if pos==0: #no need to move anything if correct answer is in zero position.
        continue
      item = options.pop(pos)
      options.insert(0, item)
      exercise['o'] = options
    length = len(arr)
    if length == 1:
      del exercise['ans']
    else:
      exercise['ans'] = length
with open('cp.exam.guide.combined.yml', 'w') as f:
  f.write(yaml.dump(questions, sort_keys=False, width=float("inf")))
