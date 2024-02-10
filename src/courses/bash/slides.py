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
  html_body = passthrough(f"<h1>{yaml_content.get('name')}</h1>")
  txt = yaml_content.get('txt')
  if txt is not None:
    html_body += yaml_content.get('txt')
  for unit in yaml_content.get('units', []):
    html_body += passthrough(f"<h2>{unit['name']}</h2>")
    for lesson in unit.get('lessons', []):
      html_body += passthrough(f"<h3>{lesson['name']}</h3>")
      for module in lesson.get('modules', []):
        html_body += passthrough(f"<h4>{module['name']}</h4>")
        insts = module.get('inst')
        if insts is not None:
          for inst in insts:
            if inst:
              html = extract_inner_content(inst)
              if html is not None:
                html_body += html + passthrough('<hr>')
  return html_body

def extract_inner_content(inst):
  name_adoc=inst.get('name')
  # print(name_adoc)
  # ref_adoc=inst.get('ref')
  content_adoc = inst.get('txt')
  sdbr_adoc = inst.get('sdbr')
  retval = ''
  if name_adoc:
    retval = f"\n++++\n<h5>{name_adoc}</h5>\n++++\n"
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
  template_file = 'template.html'

  yaml_content = read_yaml(yaml_file)
  if not verify_yaml(yaml_content):
    print("Invalid YAML file.")
    sys.exit(1)

  html_body = generate_html_body(yaml_content)
  html_body = passthrough(html_body)
  final_html = substitute_html_body(template_file, html_body)
  final_html = passthrough(final_html)

  output_file = yaml_file.rsplit('.', 1)[0] + ".adoc"
  with open(output_file, 'w') as file:
    file.write(final_html)
  print(f"ADOC file created: {output_file}")

if __name__ == "__main__":
  main()
