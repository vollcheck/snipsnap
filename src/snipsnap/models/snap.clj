(ns snipsnap.models.snap
  "Namespace for snap model persistence."
  (:require [next.jdbc.sql :as sql]
            [honey.sql :as hsql]
            [snipsnap.utils :refer [now]]))

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
  (sql/query (db) ["select s.*, l.name, u.username
 from snap s
 left join language l on s.language_id = l.id
 left join user u on s.user_id = u.id
order by name"]))

(comment
  ;; TODO
  (let [query {:select [:s.* :l.name :u.username]
               :from [[:snap :s] [:language :l] [:user :u]]
               :left-join [[:= :s.user_id :u.id] [:= :s.language_id :l.id]]
               :order-by [:s.name]}]
    (hsql/format query {:inline true}))
  )

(defn save-snap
  "Save a snap record. If ID is present and not zero, then
  this is an update operation, otherwise it's an insert."
  [db snap]
  (let [id (:id snap)]
    (if (and id (not (zero? id)))
      ;; update
      (sql/update! (db) :snap
                   (-> snap
                       (dissoc :id)
                       (assoc :update_date (now)))
                   {:id id})
      ;; insert
      (sql/insert! (db) :snap
                   (-> snap
                       (dissoc :id)
                       (assoc :create_date (now)))))))

(defn delete-snap-by-id
  "Given a snap ID, delete that snap."
  [db id]
  (sql/delete! (db) :snap {:id id}))

(comment
  ;; NOTE: You could just make a tests out of that

  (def example-snap2
    {"snap/id" 2
     "snap/user_id" 1
     "snap/name" "hard computations"
     "snap/content" "(+ 1 2 3)"
     "snap/language_id" 1})

  (require '[snipsnap.utils :refer [clean-entity-data]])
  (save-snap db (clean-entity-data "snap" example-snap2))

  (def example-snap
    {"user_id" 1
     "name" "hard computations"
     "content" "(+ 1 2 3)"
     "language_id" 1})

  (def db
    (-> snipsnap.controllers.user/req1 :application/component :database))

  ;; NOTE: Super useful!
  (sql/find-by-keys (db) :snap {:name "hard computations"})
  (sql/delete! (db) :snap {:id 1337})

  (def r (save-snap db example-snap))
  ;; => #:snap{:id 2,
  ;;           :user_id 1,
  ;;           :name "hard computations",
  ;;           :content "(+ 1 2 3)",
  ;;           :language_id 1,
  ;;           :create_date "1666532055413",
  ;;           :update_date nil}

  )