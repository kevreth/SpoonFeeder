import sys
import yaml

def read_yaml(file_path):
  with open(file_path, 'r') as file:
    return yaml.safe_load(file)

def verify_yaml(yaml_content):
  return isinstance(yaml_content, dict)

def passthrough(str):
  return f'\n\n++++\n{str}\n++++\n\n'

def generate_html_body(yaml_content):
  html_body = f"= {yaml_content.get('name')}\n\n"
  txt = yaml_content.get('txt')
  if txt is not None:
    html_body += yaml_content.get('txt')
  for unit_ctr, unit in enumerate(yaml_content.get('units', []), start=1):
    html_body += f"== Unit {unit_ctr}: {unit['name']}\n\n"
    for lesson_ctr, lesson in enumerate(unit.get('lessons', []), start=1):
      html_body += f"=== Lesson {lesson_ctr}: {lesson['name']}\n\n"
      for module_ctr, module in enumerate(lesson.get('modules', []), start=1):
        html_body += f"==== Module {module_ctr}: {module['name']}\n\n"
        insts = module.get('inst')
        if insts is not None:
          for inst in insts:
            if inst:
              html = extract_inner_content(inst)
              if html is not None:
                html_body += html + "\n\n'''\n\n"
  return html_body

def extract_inner_content(inst):
  name_adoc=inst.get('name')
  # print(name_adoc)
  # ref_adoc=inst.get('ref')
  content_adoc = inst.get('txt')
  sdbr_adoc = inst.get('sdbr')
  retval = ''
  if name_adoc:
    retval = f"===== {name_adoc}\n\n"
  if sdbr_adoc:
    retval += f'''
++++
<div class="two-columns">
  <div class="sidebar">
++++

{sdbr_adoc}

++++
  </div>
<div class="content">
++++

{content_adoc}

++++
  </div>
</div>
++++
    '''
  else: retval += content_adoc
  return retval

def substitute_html_body(template_file, html_body):
  with open(template_file, 'r') as file:
    return file.read().replace('%REPLACE%',html_body)

def main():
  if len(sys.argv) < 2:
    print("Usage: python script.py <YAML file path>")
    sys.exit(1)

  yaml_file = sys.argv[1]

  yaml_content = read_yaml(yaml_file)
  if not verify_yaml(yaml_content):
    print("Invalid YAML file.")
    sys.exit(1)

  html_body = generate_html_body(yaml_content)
  output_file = yaml_file.rsplit('.', 1)[0] + ".adoc"
  with open(output_file, 'w') as file:
    file.write(html_body)
  print(f"ADOC file created: {output_file}")

if __name__ == "__main__":
  main()
