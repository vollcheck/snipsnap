(ns user
  (:require clojure.main
            [snipsnap.main :refer [repl-start]]
            [clojure.tools.logging :as log]))

(defn start []
  (println "Snipsnap API by Okular. Copyright (c) 2022, Okular S.A.")
  (println "Compiling code, please wait...")
  (log/info "Starting development system")

  (repl-start)

  (log/info "System started and ready...")

  (println)
  (println "Welcome to Snipsnap!")
  (println)
  )
