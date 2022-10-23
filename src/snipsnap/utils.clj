(ns snipsnap.utils
  (:require [clojure.string :as str]))

(defn now []
  (new java.util.Date))

(defn clean-entity-data
  [entity-name data]
  (->> data
       (map (fn [[k v]] [(-> k
                            (str/replace (str entity-name "/") "")
                            keyword)
                        v]))
       (into {})))
