course.html: course.adoc
	asciidoctor -r asciidoctor-diagram -b html5 -s -o $@ $<

course.adoc: course.yml slides.py #*.svg
	sh ./wellformed.sh course.yml
	yamale course.yml -s schema.yml
	python3 slides.py course.yml

.PHONY: clean

clean:
	rm -f course.html
