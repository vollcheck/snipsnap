(ns snipsnap.controllers.auth
  (:require [ring.util.response :as r]
            [snipsnap.auth :refer [create-token]]
            [snipsnap.models.user :as u]
            [snipsnap.models.snap :as s]))

(defn register
  [req]
  (let [db (get-in req [:application/component :database])
        data (:json-params req)
        user (u/save-user db data)]
    (r/response
     (if (nil? user)
       {:status 400
        :body {:error "Cannot create user!"}}
       {:status 201
        :body {:user {:id (second (first user))}
               :token (create-token user)}}))))

(defn login
  [req]
  (let [db (get-in req [:application/component :database])
        data (:json-params req)
        user (u/get-user-by-credentials db data)]
    (r/response
     (if (nil? user)
       {:status 404
        :body {:error "Invalid credentials"}}
       {:status 200
        :body {:user user
               :token (create-token user)}}))))

(defn me
  [req]
  (let [db (get-in req [:application/component :database])
        _ (def req1 req)
        _ (println "request from `me` endpoint` " req)
        payload (:identity req)
        user (u/get-user-by-payload db payload)]
    (r/response
     (if (nil? user)
       {:status 404
        :body {:error "Invalid credentials"}}
       {:status 200
        :body {:user user
               :token (create-token user)}}))))

(defn my-snaps
  [req]
  (let [db (get-in req [:application/component :database])
        payload (:identity req)
        user (u/get-user-by-payload db payload)
        _ (println user)
        username (:user/username user)
        _ (println username)
        ]
    (s/get-snaps-by-username db username)))
