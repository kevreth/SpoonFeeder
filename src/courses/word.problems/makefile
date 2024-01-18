word.problems.adoc: word.problems.yml template.html
    python slides.py word.problems.yml

word.problems.2.html: word.problems.adoc
    asciidoctor -b html5 -s -o $@ $<

.PHONY: clean

clean:
    rm -f word.problems.2.html
    rm -f word.problems.adoc
