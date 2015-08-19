.PHONY: build

clean:
	git clean -fxd

install:
	npm install origami-build-tools
	obt install

test:
	obt verify

build:
	gulp build
	obt build

demo:
	nct demo
