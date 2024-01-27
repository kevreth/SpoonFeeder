course.html: course.adoc
	asciidoctor -b html5 -s -o $@ $<

course.adoc: slides.py yamale
	python slides.py course.yml

yamale: wellformed
	yamale course.yml -s schema.yml

wellformed: course.yml
	sh ./wellformed.sh course.yml

.PHONY: clean

clean:
	rm -f course.html
	rm -f course.adoc
