(ns snipsnap.models.test-utils
  "Tests use H2 in-memory."
  (:require [com.stuartsierra.component :as component]
            [next.jdbc :as jdbc]
            [snipsnap.models.manager :as db-manager]))

#_(def ^:private db-spec {:dbtype "sqlite"
                        :dbname "db-test.sqlite"
                        :database_to_upper false})

(def ^:private db-spec {:dbtype "h2:mem"
                        :dbname "snipsnap_test"
                        :database_to_upper false})

(def test-db (atom nil))

(defn with-test-db
  "A test fixture that sets up an in-memory H2 database for running tests."
  [t]
  ;; clear out any existing in-memory data
  (let [ds (jdbc/get-datasource db-spec)]
    (try
      (jdbc/execute-one! ds ["drop table language"])
      (jdbc/execute-one! ds ["drop table snap"])
      (jdbc/execute-one! ds ["drop table user"])
      (catch Exception _)))
  (let [db (component/start (db-manager/map->Database {:db-spec db-spec}))]
    (reset! test-db db)
    (t)
    (component/stop db)))
