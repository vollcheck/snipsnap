# snipsnap

### Snip your code snaps!

## Tech stack:

### Backend
- Clojure
- Component
- Ring
- Compojure
- Selmer (?)
- SQLite

## Usage

Clone the repo, `cd` into it, then follow below to _Run the Application_ or _Run the application in REPL_
or _Run the tests_ or _Build an Uberjar_.

### Run the Application
```
clojure -M -m snipsnap.main
```

It should create a SQLite database (`snipsnap_db`) and populate couple tables (to be confirmed) and start a Jetty instance on port 8080.

If that port is in use, start it on a different port. For example, port 8100:

```
clojure -M -m snipsnap.main 8100
```

### Run the Application in REPL

Start REPL

```
$ clj
```

Once REPL starts, start the server as an example on port 8888:

```clj
user=> (require 'snipsnap.main)                             ; load the code
user=> (in-ns 'snipsnap.main)                               ; move to the namesapce
snipsnap.main=> (def system (new-system 8888))              ; specify port
snipsnap.main=> (alter-var-root #'system component/start)   ; start the server
```

### Run the tests with:

```
clojure -T:build test
```

You should see something like this:

```
Running task for: test

Running tests in #{"test"}
2022-05-25 18:19:45.138:INFO::main: Logging initialized @6494ms to org.eclipse.jetty.util.log.StdErrLog

Testing snipsnap.model.snippets-manager-test
Created database and addressbook table!
Populated database with initial data!

Ran 3 tests containing 9 assertions.
0 failures, 0 errors.
```

This uses the `:build` alias to load the `build.clj` file, based on [`tools.build`](https://clojure.org/guides/tools_build), and run the `test` task.
That in turn runs the `run-tests` task from my [`build-clj`](https://github.com/seancorfield/build-clj) wrapper for `tools.build`, that provide "sane" defaults for the myriad options in `tools.build` so you can write simpler `build.clj` files.

## Build an Uberjar

For production deployment, you typically want to build an "uberjar" -- a `.jar` file that contains Clojure itself and all of the code from your application and its dependencies, so that you can run it with the `java -jar` command.

The `build.clj` file -- mentioned above -- contains a `ci` task that:

* runs all the tests
* cleans up the `target` folder
* compiles the application (sometimes called "AOT compilation")
* produces a standalone `.jar` file

```
clojure -T:build ci
```

That should produce the same output as `test` above, followed by something like:

```
Cleaning target...

Skipping pom.xml because :lib and/or :version were omitted...
Copying src, resources...
Compiling snipsnap.main...
2022-05-25 18:20:13.069:INFO::main: Logging initialized @3981ms to org.eclipse.jetty.util.log.StdErrLog
Building uberjar target/example-standalone.jar...
```

The `target` folder will be created if it doesn't exist and it will include a `classes` folder containing all of the compiled Clojure source code from the `snipsnap` application _and all of its dependencies_ including Clojure itself:

```
$ ls target/classes/
cheshire  clojure  clout  com  compojure  crypto  instaparse  json_html  layouts  medley  next  public  ring  selmer  usermanager  views
```

It will also include the standalone `.jar` file which you can run like this:

```
java -jar target/example-standalone.jar
```

This should behave the same as the _Run the Application_ example above.

This JAR file can be deployed to any server that have Java installed and run with no other external dependencies or files.

## Stuff I Need To Do

* I might add a `datafy`/`nav` example.

# License & Copyright

Copyright (c) 2015-2022 Sean Corfield.
              2022 vollcheck

Distributed under the Apache Source License 2.0.
