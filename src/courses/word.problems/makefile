word.problems.2.html: word.problems.adoc
	asciidoctor -b html5 -s -o $@ $<

word.problems.adoc:
	python slides.py word.problems.yml

.PHONY: clean

clean:
	rm -f word.problems.2.html
	rm -f word.problems.adoc
