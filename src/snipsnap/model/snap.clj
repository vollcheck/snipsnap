(ns snipsnap.model.snap
  "Namespace for snap model persistence."
  (:require [next.jdbc.sql :as sql]))

(def ^:const initial-snaps-data
  "Seed the snaps table with this data."
  [{:name "sum of two integers"
    :content "(defn sum [x y] (+ x y))"
    :language_id 1
    :user_id 1}])

(defn get-snap-by-id
  "Given a snap ID, return the snap record."
  [db id]
  (sql/get-by-id (db) :snap id))

(defn get-snaps
  "Return all available language records (in order).

  Since this is a join, the keys in the hash maps returned will
  be namespace-qualified by the table from which they are drawn:

  snap/id, snap/name, etc, language/name, user/username"
  [db]
  (sql/query (db) ["
select s.*, l.name, u.username
 from snap s
 left join language l on s.language_id = l.id
 left join user u on s.user_id = u.id
order by name
"]))

(defn save-snap
  "Save a snap record. If ID is present and not zero, then
  this is an update operation, otherwise it's an insert."
  [db snap]
  (let [id (:snap/id snap)]
    (if (and id (not (zero? id)))
      ;; update
      (sql/update! (db) :snap
                   (dissoc snap :snap/id)
                   {:id id})
      ;; insert
      (sql/insert! (db) :snap
                   (dissoc snap :snap/id)))))

(defn delete-snap-by-id
  "Given a snap ID, delete that snap."
  [db id]
  (sql/delete! (db) :snap {:id id}))
