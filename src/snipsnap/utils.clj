(ns snipsnap.utils
  (:require [clojure.string :as str]))

(defn now []
  (new java.util.Date))

(defn clean-entity-data
  [entity-name data]
  (->> data
       (map (fn [[k v]] [(str/replace k (str entity-name "/") "") v]))
       (into {})))
