course.html: course.adoc
	asciidoctor -r asciidoctor-diagram -b html5 $<

course.adoc: course.yml slides.py makefile schema.yml wellformed.sh *.svg
	sh ./wellformed.sh course.yml
	yamale course.yml -s schema.yml   |grep -v Validating
	python3 slides.py course.yml

.PHONY: clean

clean:
	rm -f course.html
	rm -f course.adoc
	rm -f diag-graphviz-md5-*.svg
