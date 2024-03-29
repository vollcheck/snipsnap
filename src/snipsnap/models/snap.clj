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
    :user_id 1
    :create_date (now)}])

(defn get-snap-by-id
  "Given a snap ID, return the snap record."
  [db id]
  (sql/query (db) [(str "select s.*, l.name, u.username
 from snap s
 left join language l on s.language_id = l.id
 left join user u on s.user_id = u.id
 where s.id = " id "
order by name")]))

(defn get-snaps
  "Return all available language records (in order).

  Since this is a join, the keys in the hash maps returned will
  be namespace-qualified by the table from which they are drawn:

  snap/id, snap/name, etc, user/username"
  [db]
  (sql/query (db) ["select s.*, s.create_date, u.username, l.name
 from snap s
 left join language l on s.language_id = l.id
 left join user u on s.user_id = u.id
 order by name"]))

(defn save-snap
  "Save a snap record. If ID is present and not zero, then
  this is an update operation, otherwise it's an insert."
  [db snap]
  (let [id (:id snap)]
    (prn id)
    (if (and id (not (zero? id)))
      ;; update ;; caution! returns number of updated rows instead of snap id
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

(defn get-snaps-by-username
  [db username]
  (let [query {:select [:s.* :l.name]
               :from [[:snap :s] [:language :l] [:user :u]]
               :where [:and
                       [:= :u.username username]
                       [:= :s.user_id :u.id]]}]
    (first (sql/query (db) (hsql/format query)))))


(comment
  (def db (get-in snipsnap.main/system [:database :datasource]))
  (let [query {:select [:s.* :l.name]
               :from [[:snap :s] [:language :l] [:user :u]]
               :where [:and
                       [:= :u.username "vollcheck"]
                       [:= :s.user_id :u.id]]}]
    (first (sql/query db (hsql/format query))))

  ;; TODO - transform this `SELECT` with leftjoins to honeysql
  (let [query {:select [:s.* :l.name :u.username]
               :from [[:snap :s] [:language :l] [:user :u]]
               :left-join [[:= :s.user_id :u.id] [:= :s.language_id :l.id]]
               :order-by [:s.name]}]
    (hsql/format query {:inline true}))
  )
