(ns snipsnap.controllers.user
  "The main controller for the user management portion of this app."
  (:require [ring.util.response :as r]
            [snipsnap.models.user :as user]
            [snipsnap.utils :refer [clean-entity-data]]))

(defn create-or-update-user
  [req]
  (let [db (get-in req [:application/component :database])
        data (clean-entity-data (:json-params req))
        result_id (->> data (user/save-user db) first second)]
    (r/response {:snap/id result_id})))

(defn user-list
  "User profile view."
  [req]
  (let [db (get-in req [:application/component :database])
        data (user/get-users db)]
    (r/response data)))

(defn read-user
  "User profile view."
  [req]
  (let [username (get-in req [:params :username])
        db (get-in req [:application/component :database])
        data (user/get-user-by-username db username)
        data (if (vector? data)
               (first data)
               data)]
    (r/response data)))

(defn read-user-snaps
  "List all snaps by user."
  [req]
  (let [username (get-in req [:params :username])
        db (get-in req [:application/component :database])
        data (user/get-snaps-by-user db username)]
    (r/response data)))

(defn delete-user
  [req]
  (let [db (get-in req [:application/component :database])
        username (get-in req [:params :username])
        result (:next.jdbc/update-count (user/delete-user-by-username db username))
        message (if (= result 0)
                  (str "Can't delete user with username " username ", doesn't exist")
                  (str "Sucessfully deleted snap with username " username))]
    (r/response {:message message})))
