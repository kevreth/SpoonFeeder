import yaml
from yaml.loader import SafeLoader
with open('../courses/aws-review/course.yml') as f:
    questions = yaml.load(f, Loader=SafeLoader)
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
        print(exercise['type'], end ="")
        if length == 1:
            del exercise['ans']
            exercise['type'] = 'mc'
        else:
            exercise['ans'] = length
            exercise['type'] = 'ma'
