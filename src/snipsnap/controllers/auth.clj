(ns snipsnap.controllers.auth
  (:require [ring.util.response :as r]
            [snipsnap.auth :refer [create-token]]
            [snipsnap.models.user :as u]))

(defn register
  [{:keys [parameters] :as req}]
  (let [db (get-in req [:application/component :database])
        data (:body parameters)
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
  [request]
  (let [payload (:identity request)
        user (u/get-user-by-payload payload)]
    (if (nil? user)
      {:status 404
       :body {:error "Invalid credentials"}}
      {:status 200
       :body {:user user
              :token (create-token user)}})))

(comment
  (:json-params req1)
  (create-token {:username "vollcheck"})
  (snipsnap.controllers.core/dashboard {})
  (def d (get-in req1 [:application/component :database]))
  (def creds (-> req1 :json-params clojure.walk/keywordize-keys))
  (def user (u/get-user-by-credentials d creds))

  (u/get-user-by-credentials d {:username "vollcheck" :password "admin"})
  (login req1)
  (create-token user) ;; => "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyL2lkIjoxLCJ1c2VyL3VzZXJuYW1lIjoidm9sbGNoZWNrIn0.w92A7hyp4SbpsyVqRwUkqdmGmkCbSu9BdjNZ1arOH1Y"
  (if (nil? user)
    {:status 404
     :body {:error "Invalid credentials"}}
    {:status 200
     :body {:user user
            :token (create-token user)}})
  req1 ;; => {:json-params {"username" "vollcheck", "password" "admin"},
;;     :ssl-client-cert nil,
;;     :protocol "HTTP/1.1",
;;     :cookies {},
;;     :remote-addr "127.0.0.1",
;;     :params {:username "vollcheck", :password "admin"},
;;     :flash nil,
;;     :route-params {},
;;     :headers
;;     {"extension" "Security/Digest Security/SSL",
;;      "accept" "*/*",
;;      "connection" "keep-alive",
;;      "host" "localhost:8888",
;;      "accept-encoding" "gzip",
;;      "content-length" "48",
;;      "mime-version" "1.0",
;;      "content-type" "application/json"},
;;     :server-port 8888,
;;     :content-length 48,
;;     :form-params {},
;;     :compojure/route [:post "/login"],
;;     :session/key nil,
;;     :query-params {},
;;     :content-type "application/json",
;;     :character-encoding "UTF-8",
;;     :uri "/login",
;;     :server-name "localhost",
;;     :query-string nil,
;;     :body nil,
;;     :multipart-params {},
;;     :scheme :http,
;;     :application/component
;;     {:config {:repl true},
;;      :database
;;      {:db-spec {:dbtype "sqlite", :dbname "db.sqlite"},
;;       :datasource
;;       #object[next.jdbc.connection$url_PLUS_etc$reify__7050 0x3495d952 "jdbc:sqlite:db.sqlite"]},
;;      :state "Running"},
;;     :request-method :post,
;;     :session {}}
  )
