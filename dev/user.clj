(ns user
  (:require clojure.main
            [snipsnap.main :refer [dev-start]]
            [clojure.tools.logging :as log]))

(defn start []
  (println "Snipsnap API by Okular. Copyright (c) 2022, Okular Company")
  (println "Compiling code, please wait...")
  (log/info "Starting development system\n")

  (dev-start)

  (log/info "System started and ready...\n")

  (println)
  (println "Welcome to Snipsnap!\n")
  (println)
  )
