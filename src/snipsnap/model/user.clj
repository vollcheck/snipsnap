(ns snipsnap.model.user
  "Namespace for user model persistence."
  (:require [next.jdbc.sql :as sql]))

(def ^:const initial-user-data
  "Seed the user table with this data."
  [{:username "vollcheck" :password "admin"
    :email "vollcheck@snipsnap.com"
    :avatar "https://avatars.githubusercontent.com/u/42350899?v=4"
    :bio "clojure enjoyer"}])

(defn get-user-by-id
  "Given a user ID, return the user record."
  [db id]
  (sql/get-by-id (db) :user id))

(defn get-user-by-username
  "Given a user ID, return the user record."
  [db username]
  (sql/find-by-keys (db) :user {:username username}))

(defn get-users
  "Return all available users, sorted by name."
  [db]
  (sql/query (db)
             ["
select *
 from user
 order by username
"]))

(defn save-user
  "Save a user record. If ID is present and not zero, then
  this is an update operation, otherwise it's an insert."
  [db user]
  (let [id (:user/id user)]
    (if (and id (not (zero? id)))
      ;; update
      (sql/update! (db) :user
                   (dissoc user :user/id)
                   {:id id})
      ;; insert
      (sql/insert! (db) :user
                   (dissoc user :user/id)))))

(defn delete-user-by-id
  "Given a user ID, delete that user."
  [db id]
  (sql/delete! (db) :user {:id id}))
