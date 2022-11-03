(ns snipsnap.models.user
  "Namespace for user model persistence."
  (:require [clojure.walk :refer [keywordize-keys]]
            [next.jdbc.sql :as sql]
            [honey.sql :as hsql]))

(def ^:const initial-user-data
  "Seed the user table with this data."
  [{:username "vollcheck" :password "admin"
    :email "vollcheck@snipsnap.com"
    :avatar "" ;; https://avatars.githubusercontent.com/u/42350899?v=4
    :bio "clojure enjoyer"}])

(defn get-users
  "Return all available users, sorted by name."
  [db]
  ;; NOTE: what about get users by date of creation?
  (let [query {:select [:*]
               :from [:user]
               :order-by [:username]}]
    (sql/query (db) (hsql/format query :inline true))))

(defn get-user-by-id
  "Given a user ID, return the user record."
  [db id]
  (sql/get-by-id (db) :user id))

#_(defn get-user-by-username
  "Given a user ID, return the user record."
  [db username]
    (sql/find-by-keys (db) :user {:username username}))

(defn get-user-by-username
  "Given a user ID, return the user record."
  [db username]
  (sql/query (db) (hsql/format {:select [:*]
                                :from [:user]
                                :where [:= :username username]})))


(defn get-user-by-credentials
  "Get user ID and username for the login token hash."
  [db data]
  (let [{:keys [username password]} (keywordize-keys data)
        query {:select [:id :username]
               :from [:user]
               :where [:and
                       [:= :username username]
                       [:= :password password]]}]
  (first (sql/query (db) (hsql/format query)))))

(defn get-user-by-payload
  [payload]
  ())

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

(defn delete-user-by-username
  "Given a user ID, delete that user."
  [db username]
  (sql/delete! (db) :user {:username username}))


(comment
  (def db (:database snipsnap.main/system))
  (get-user-by-credentials db {"username" "vollcheck" "password" "admin"})
  )
