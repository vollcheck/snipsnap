;; copyright (c) 2019-2022 Sean Corfield, all rights reserved

(ns snipsnap.controllers.user
  "The main controller for the user management portion of this app."
  (:require [ring.util.response :as resp]
            [ring.middleware.json :refer [wrap-json-response wrap-json-body]]
            [selmer.parser :as tmpl]
            [snipsnap.model.manager :as db-manager]
            [snipsnap.model.language :as language]
            [snipsnap.model.user :as user]
            [snipsnap.model.snap :as snap]
            [snipsnap.utils :as u]))

(def ^:private changes
  "Count the number of changes (since the last reload)."
  (atom 0))

(defn render-page
  "Each handler function here adds :application/view to the request
  data to indicate which view file they want displayed. This allows
  us to put the rendering logic in one place instead of repeating it
  for every handler."
  [req]
  (let [data (assoc (:params req) :changes @changes)
        view (:application/view req "default")
        html (tmpl/render-file (str "views/user/" view ".html") data)]

    (-> (resp/response
         ;; (tmpl/render-file "layouts/default.html"
         ;;                   (assoc data :body [:safe html]))
         {:a 1}
         )
        (resp/content-type
         ;; "text/html"
         "application/json"
         ))))

(defn user-profile
  "Each handler function here adds :application/view to the request
  data to indicate which view file they want displayed. This allows
  us to put the rendering logic in one place instead of repeating it
  for every handler."
  [req]
  (let [username (get-in req [:params :username])
        db (get-in req [:application/component :database])
        data (user/get-user-by-username db username)
        data (if (vector? data)
               (first data)
               data)]
    (-> (resp/response data)
        (resp/content-type "application/json"))
    ;; (wrap-json-body (resp/response data))
    ))

;; TODO: move that to snap namespace
(defn create-snap
  [req]
  ;; (let [id (get-in req [:params :id])
  ;;       db (get-in req [:application/component :database])
  ;;       _ (prn id db)
  ;;       data (snap/get-snap-by-id db id)
  ;;       data (if (vector? data)
  ;;              (first data)
  ;;              data)]
  ;;   (-> (resp/response data)
  ;;       (resp/content-type "application/json"))
  ;; (wrap-json-body (resp/response data)))
  (let [db (get-in req [:application/component :database])
        data (u/clean-entity-data "snap" (:json-params req))
        result_id (->> data (snap/save-snap db) first second)]
    (def req1 req) ;; TODO: remove
    (-> (resp/response {:snap/id result_id})
        (resp/content-type "application/json"))))

;; TODO: move that to snap namespace
(defn read-snap
  [req]
  (let [id (get-in req [:params :id])
        db (get-in req [:application/component :database])
        _ (prn id db)
        data (snap/get-snap-by-id db id)
        data (if (vector? data)
               (first data)
               data)]
    (-> (resp/response data)
        (resp/content-type "application/json"))
    ;; (wrap-json-body (resp/response data))
    ))

;; TODO: move that to snap namespace
(defn update-snap
  [req]
  )

;; TODO: move that to snap namespace
(defn delete-snap
  [req]
  )

(defn reset-changes
  [req]
  (reset! changes 0)
  (assoc-in req [:params :message] "The change tracker has been reset."))

(defn default
  [req]
  (let [r (assoc-in req [:params :message]
                (str "Welcome to the User Manager application demo! "
                     "This uses just Compojure, Ring, and Selmer."))]
    ;; (clojure.pprint/pprint r)
    r))

(defn delete-by-id
  "Compojure has already coerced the :id parameter to an int."
  [req]
  (swap! changes inc)
  (user/delete-user-by-id (-> req :application/component :database)
                           (get-in req [:params :id]))
  (resp/redirect "/user/list"))

(defn edit
  "Display the add/edit form.

  If the :id parameter is present, Compojure will have coerced it to an
  int and we can use it to populate the edit form by loading that user's
  data from the addressbook."
  [req]
  (let [db   (-> req :application/component :database)
        user (when-let [id (get-in req [:params :id])]
               (user/get-user-by-id db id))]
    (-> req
        (update :params assoc
                :user user
                :language (language/get-languages db))
        (assoc :application/view "form"))))

(defn get-users
  "Render the list view with all the users in the addressbook."
  [req]
  (let [users (user/get-users (-> req :application/component :database))]
    (-> req
        (assoc-in [:params :users] users)
        (assoc :application/view "list"))))

(defn save
  "This works for saving new users as well as updating existing users, by
  delegatin to the model, and either passing nil for :addressbook/id or
  the numeric value that was passed to the edit form."
  [req]
  (swap! changes inc)
  (-> req
      :params
      ;; get just the form fields we care about:
      (select-keys [:id :first_name :last_name :email :department_id])
      ;; convert form fields to numeric:
      (update :id            #(some-> % not-empty Long/parseLong))
      (update :department_id #(some-> % not-empty Long/parseLong))
      ;; qualify their names for domain model:
      (->> (reduce-kv (fn [m k v] (assoc! m (keyword "addressbook" (name k)) v))
                      (transient {}))
           (persistent!)
           (user/save-user (-> req :application/component :database))))
  (resp/redirect "/user/list"))
