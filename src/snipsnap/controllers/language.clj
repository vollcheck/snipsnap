(ns snipsnap.controllers.language
  (:require [ring.util.response :as resp]
            [snipsnap.models.language :as language]
            [snipsnap.utils :refer [clean-entity-data]]))

(defn create-or-update-language
  [req]
  (let [db (get-in req [:application/component :database])
        data (clean-entity-data (:json-params req))
        result_id (->> data (language/save-language db) first second)]
    (resp/response {:snap/id result_id})))

(defn read-language
  [req]
  (let [db (get-in req [:application/component :database])
        id (get-in req [:params :id])
        data (language/get-language-by-id db id)
        data (if (vector? data)
               (first data)
               data)]
    (resp/response data)))

(defn delete-language
  [req]
  (let [db (get-in req [:application/component :database])
        id (get-in req [:params :id])
        result (:next.jdbc/update-count (language/delete-language-by-id db id))
        message (if (= result 0)
                  (str "Can't delete language with id " id ", doesn't exist")
                  (str "Sucessfully deteled snap with id " id))]
    (resp/response {:message message})))
