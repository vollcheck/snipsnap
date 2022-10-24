(ns snipsnap.controllers.snap
  (:require [ring.util.response :as resp]
            [snipsnap.model.snap :as snap]
            [snipsnap.utils :as u]))

(defn create-or-update-snap
  [req]
  (let [db (get-in req [:application/component :database])
        data (u/clean-entity-data "snap" (:json-params req))
        result_id (->> data (snap/save-snap db) first second)]
    (resp/response {:snap/id result_id})))

(defn read-snap
  [req]
  (let [id (get-in req [:params :id])
        db (get-in req [:application/component :database])
        data (snap/get-snap-by-id db id)
        data (if (vector? data)
               (first data)
               data)]
    (resp/response data)))

(defn delete-snap
  [req]
  (let [id (get-in req [:params :id])
        db (get-in req [:application/component :database])
        result (:next.jdbc/update-count (snap/delete-snap-by-id db id))
        message (if (= result 0)
                  (str "Can't delete snap with id " id ", doesn't exist")
                  (str "Sucessfully deteled snap with id " id))]
    (resp/response {:message message})))
