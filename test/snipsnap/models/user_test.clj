(ns snipsnap.models.user-test
  (:require [clojure.test :refer [deftest is use-fixtures]]
            [com.stuartsierra.component :as component]
            [next.jdbc :as jdbc]
            [snipsnap.models.manager :as db-manager]
            [snipsnap.models.language :as language]
            [snipsnap.models.user :as user]
            [snipsnap.models.snap :as snap]))
