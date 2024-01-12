import sys
import yaml
from bs4 import BeautifulSoup
import subprocess

ARGS = ['asciidoctor', '-b', 'html5', '-a', 'stylesheet!', '-o', '-', '-']
def read_yaml(file_path):
    """ Reads and returns the content of the YAML file. """
    with open(file_path, 'r') as file:
        return yaml.safe_load(file)

def verify_yaml(yaml_content):
    return isinstance(yaml_content, dict)  # Basic validation

def generate_html_body(yaml_content):
    html_body = '<div>'
    for lesson in yaml_content.get('lessons', []):
        html_body += f"<h2>{lesson['name']}</h2>"
        for module in lesson.get('modules', []):
            html_body += f"<h3>{module['name']}</h3>"
            insts = module.get('inst')
            if insts is not None:
                for inst in insts:
                    inst_content = inst.get('txt')
                    if inst_content:
                        html = extract(inst_content)
                        html_body += html
            html_body += "<hr>"
        html_body += "<hr>"
    html_body += '</div>'
    return html_body

def convert_to_html(inst_content):
    try:
        completion = subprocess.run(
            ARGS, text=True, input=inst_content, capture_output=True, check=True
        )
        if completion.check_returncode() == 0 or completion.check_returncode() == None:
            return completion.stdout
        else:
            print(f"Error in converting content to HTML: {completion.stderr}", file=sys.stderr)
            print(completion.check_returncode())
    except subprocess.CalledProcessError as e:
        print(f"Subprocess error: {e}", file=sys.stderr)

def extract_inner_content(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    content_div = soup.find('div', id='content')
    if content_div:
        first_div_inside_content = content_div.find('div')
        if first_div_inside_content:
            inner_content = first_div_inside_content.decode_contents()
            first_div_inside_content.decompose()
            return inner_content.strip()
        else:
            content_div_content = content_div.decode_contents()
            return content_div_content
    return None

def extract(str):
    document=convert_to_html(str)
    extract = extract_inner_content(document)
    return extract

def substitute_html_body(template_file, html_body):
    """ Substitutes the HTML body into the template HTML file. """
    with open(template_file, 'r') as file:
        soup = BeautifulSoup(file, 'html.parser')
        soup.body.clear()
        soup.body.append(BeautifulSoup(html_body, 'html.parser'))
    return str(soup)

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
    final_html = substitute_html_body(template_file, html_body)

    output_file = yaml_file.rsplit('.', 1)[0] + ".2.html"
    with open(output_file, 'w') as file:
        file.write(final_html)
    print(f"HTML file created: {output_file}")

if __name__ == "__main__":
    main()
