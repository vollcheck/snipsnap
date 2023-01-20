(ns snipsnap.controllers.snap
  (:require [ring.util.response :as r]
            [snipsnap.models.snap :as snap]
            [snipsnap.utils :refer [clean-entity-data]]))

(defn create-or-update-snap
  [req]
  (let [db (get-in req [:application/component :database])
        _ (def db1 req)
        data (clean-entity-data (:json-params req))
        _ (println "cleaned data" data)
        result-id (-> (snap/save-snap db data) first second)
        ]
    (r/response {:snap/id result-id})))

(comment
  (def db (get snipsnap.main/system :database))
  (def data {:user_id 1,
             :name "just a comment another one",
             :content "(commentfdajslfdsajlfdajslf)",
             :language_id 1})
  (def data2
    {:user_id 1, :snap/name "IT'S JUST A COMMENT, OKAY?"})
  (snap/save-snap db data)
  )

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
