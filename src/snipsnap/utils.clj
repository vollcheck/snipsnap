(ns snipsnap.utils
  (:require [clojure.string :as str]))

(defn now []
  (new java.util.Date))

(Integer/parseInt "19")

(defn clean-entity-data
  [data]
  (if-let [ns (-> data keys first (str/index-of "/"))]
    (->> data
         (map (fn [[k v]] [(keyword (subs k (inc ns)))
                          v]))
         (into {}))
    (clojure.walk/keywordize-keys data)))

;; (clean-entity-data {"name" "testing snip", "content" "i said it's testing!"})
