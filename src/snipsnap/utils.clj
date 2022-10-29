(ns snipsnap.utils
  (:require [clojure.string :as str]))

(defn now []
  (new java.util.Date))

(defn clean-entity-data
  [data]
  (let [ns-len (-> data keys first (str/index-of "/") inc)]
    (->> data
         (map (fn [[k v]] [(keyword (subs k ns-len))
                          v]))
         (into {}))))
