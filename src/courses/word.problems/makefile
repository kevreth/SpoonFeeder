word.problems.html: word.problems.adoc
	asciidoctor -b html5 -s -o $@ $<

word.problems.adoc:
	python slides.py word.problems.yml

.PHONY: clean

clean:
	rm -f word.problems.html
	rm -f word.problems.adoc
