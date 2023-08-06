# POC Meilisearch Blog SvelteKit

Context: https://github.com/stephane-klein/backlog/issues/244

```sh
$ docker-compose up -d
$ asdf install
$ pnpm install
$ ./init.js
$ pnpm run dev
```

Go to http://127.0.0.1:7700/ to play with the search engine.

Go to http://localhost:5173/ to play with SvelteKit app.

```sh
$ pnpm run test

 PASS  src/parser.test.js
  ✓ adds 1 + 2 to equal 3 (1 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.255 s
Ran all test suites.
```
