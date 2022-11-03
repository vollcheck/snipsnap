(ns snipsnap.controllers.snap
  (:require [ring.util.response :as r]
            [snipsnap.models.snap :as snap]
            [snipsnap.utils :refer [clean-entity-data]]))

(defn create-or-update-snap
  [req]
  (let [db (get-in req [:application/component :database])
        data (clean-entity-data (:json-params req))
        result_id (->> data (snap/save-snap db) first second)]
    (r/response {:snap/id result_id})))

(defn snap-list
  [req]
  (let [db (get-in req [:application/component :database])
        data (snap/get-snaps db)]
    (r/response data)))

(defn read-snap
  [req]
  (let [id (get-in req [:params :id])
        db (get-in req [:application/component :database])
        data (snap/get-snap-by-id db id)
        data (if (vector? data)
               (first data)
               data)]
    (r/response data)))

(defn delete-snap
  [req]
  (let [id (get-in req [:params :id])
        db (get-in req [:application/component :database])
        result (:next.jdbc/update-count (snap/delete-snap-by-id db id))
        message (if (= result 0)
                  (str "Can't delete snap with id " id ", doesn't exist")
                  (str "Sucessfully deleted snap with id " id))]
    (r/response {:message message})))

(comment
  (def db (get snipsnap.main/system :database))
  (def data {:user_id 1,
             :name "just a comment another one",
             :content "(commentfdajslfdsajlfdajslf)",
             :language_id 1})
  (snap/save-snap db data)
  )
