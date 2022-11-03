(ns snipsnap.controllers.core
  (:require [ring.util.response :refer [response]]))

(defn dashboard [req]
  (response {:message "Welcome on snipsnap platform!"}))
