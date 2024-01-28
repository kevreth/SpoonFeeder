course.html: course.adoc
	asciidoctor -b html5 -s -o $@ $<

course.adoc: course.yml slides.py
	sh ./wellformed.sh course.yml
	yamale course.yml -s schema.yml
	python3 slides.py course.yml

.PHONY: clean

clean:
	rm -f course.html
	rm -f course.adoc
