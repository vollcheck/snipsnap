(ns snipsnap.controllers.auth
  (:require [ring.util.response :as r]
            [snipsnap.auth :refer [create-token]]
            [snipsnap.models.user :as u]))

(defn register ;; TODO
  [req]
  (let [db (get-in req [:application/component :database])
        data (:json-params req)
        user (u/save-user db data)]
    {:status 201
     :body {:user user
            :token (create-token user)}}))

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
        payload (:identity req)
        user (u/get-user-by-payload db payload)]
    (r/response
     (if (nil? user)
       {:status 404
        :body {:error "Invalid credentials"}}
       {:status 200
        :body {:user user
               :token (create-token user)}}))))
