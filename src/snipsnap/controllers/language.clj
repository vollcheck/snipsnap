(ns snipsnap.controllers.language
  (:require [ring.util.response :as r]
            [snipsnap.models.language :as language]
            [snipsnap.utils :refer [clean-entity-data]]))

(defn create-or-update-language
  [req]
  (let [db (get-in req [:application/component :database])
        data (clean-entity-data (:json-params req))
        result_id (->> data (language/save-language db) first second)]
    (r/response {:snap/id result_id})))

(defn read-language
  [req]
  (let [db (get-in req [:application/component :database])
        id (get-in req [:params :id])
        data (language/get-language-by-id db id)
        data (if (vector? data)
               (first data)
               data)]
    (r/response data)))

(defn delete-language
  [req]
  (let [db (get-in req [:application/component :database])
        id (get-in req [:params :id])
        result (:next.jdbc/update-count (language/delete-language-by-id db id))
        message (if (= result 0)
                  (str "Can't delete language with id " id ", doesn't exist")
                  (str "Sucessfully deteled snap with id " id))]
    (r/response {:message message})))
