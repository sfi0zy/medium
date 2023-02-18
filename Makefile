install:
	npm install

check:
	npx eslint ./medium.js

watch:
	npx browser-sync start --server . --no-inject-changes & \
	while true; do \
		npx browser-sync reload; \
		inotifywait -qre close_write .; \
	done

clean:
	rm -rf ./node_modules/

