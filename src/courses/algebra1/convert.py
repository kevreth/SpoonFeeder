import sys
import os
from bs4 import BeautifulSoup
import pypandoc
import copy

def convert_html_to_yml(input_html_path):
    # Check if the file extension is html
    if not input_html_path.endswith('.html'):
        sys.exit("Error: Input file must be an HTML file.")

    # Read the input file
    try:
        with open(input_html_path, 'r', encoding='utf-8') as file:
            html_content = file.read()
    except Exception as e:
        sys.exit(f"Error reading file: {e}")

    # Verify if the input is valid HTML5
    try:
        soup = BeautifulSoup(html_content, 'html.parser')
        assert soup.find() is not None
    except AssertionError:
        sys.exit("Error: The input file does not contain valid HTML5.")

    # Process the HTML content
    lessons = []
    for h1 in soup.find_all('h1'):
        lesson = {'name': h1.get_text(strip=True), 'modules': []}
        next_h1_or_h2 = h1.find_next(['h1', 'h2'])

        while next_h1_or_h2 and next_h1_or_h2.name != 'h1':
            if next_h1_or_h2.name == 'h2':
                module = {'name': next_h1_or_h2.get_text(strip=True), 'inst': []}
                next_elem = next_h1_or_h2.find_next_sibling()

                while next_elem and next_elem.name not in ['h1', 'h2']:
                    if next_elem.name != 'section':
                        if next_elem.name == 'table':
                          for row in next_elem.find_all('tr'):
                              # Create a new table with just this row
                              new_table = BeautifulSoup('<table></table>', 'html.parser')
                              new_table.table.append(copy.deepcopy(row))

                              # Convert the new table to asciidoc format
                              row_table_text = pypandoc.convert_text(str(new_table), 'asciidoc', format='html', extra_args=('--standalone', '--wrap=none'))

                              # Append the converted table to 'inst'
                              module['inst'].append({'type': 'info', 'txt': row_table_text})
                            # for row in next_elem.find_all('tr'):
                            #     row_text = pypandoc.convert_text(str(row), 'asciidoc', format='html', extra_args=('--standalone', '--wrap=none'))
                            #     module['inst'].append({'type': 'info', 'txt': row_text})
                        else:
                            converted_text = pypandoc.convert_text(str(next_elem), 'asciidoc', format='html', extra_args=('--standalone', '--wrap=none'))
                            module['inst'].append({'type': 'info', 'txt': converted_text})
                    next_elem = next_elem.find_next_sibling()

                lesson['modules'].append(module)

            next_h1_or_h2 = next_h1_or_h2.find_next(['h1', 'h2'])

        lessons.append(lesson)

    # Generate output file path
    output_file_path = os.path.splitext(input_html_path)[0] + '.yml'

    # Write the output
    try:
        with open(output_file_path, 'w', encoding='utf-8') as file:
            file.write('lessons:\n')
            for lesson in lessons:
                file.write(f"- name: {lesson['name']}\n")
                file.write("  modules:\n")
                for module in lesson['modules']:
                    file.write(f"  - name: {module['name']}\n")
                    file.write("    inst:\n")
                    for inst in module['inst']:
                        file.write("    - type: info\n")
                        file.write("      txt: |\n")
                        for line in inst['txt'].split('\n'):
                            file.write(f"        {line}\n")
    except Exception as e:
        sys.exit(f"Error writing to file: {e}")

    return output_file_path

# Example usage
if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("Usage: python script.py input_file.html")

    input_file = sys.argv[1]
    output_file = convert_html_to_yml(input_file)
    print(f"YML file generated: {output_file}")
