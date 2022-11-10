(ns user
  (:require clojure.main
            [snipsnap.main :refer [repl-start]]
            [clojure.tools.logging :as log]))

(defn start []
  (println "Snipsnap API by Okular. Copyright (c) 2022, Okular Company")
  (println "Compiling code, please wait...")
  (log/info "Starting development system\n")

  (repl-start)

  (log/info "System started and ready...\n")

  (println)
  (println "Welcome to Snipsnap!\n")
  (println)
  )
