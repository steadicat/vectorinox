
test:
	./node_modules/.bin/mocha -r ts-node/register test/**/*.ts
.PHONY: test

test-watch:
	./node_modules/.bin/mocha --watch --watch-extensions ts -r ts-node/register test/**/*.ts src/plugins/*.ts
.PHONY: test-watch