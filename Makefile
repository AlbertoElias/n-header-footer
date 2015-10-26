.PHONY: build

clean:
	git clean -fxd

install:
	npm install
	obt install --verbose

test:
	obt verify

build:
	obt build

demo:
	nct demo
