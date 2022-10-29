(ns snipsnap.models.manager-test
  "These tests use H2 in-memory."
  (:require [clojure.test :refer [deftest is use-fixtures]]
            [com.stuartsierra.component :as component]
            [next.jdbc :as jdbc]
            [snipsnap.models.manager :as db-manager]
            [snipsnap.models.language :as language]
            [snipsnap.models.user :as user]
            [snipsnap.models.snap :as snap]))

(def ^:private test-db (atom nil))

#_(def ^:private db-spec {:dbtype "h2:mem"
                          :dbname "db_test"
                          :database_to_upper false})

(def ^:private db-spec {:dbtype "sqlite"
                        :dbname "db-test.sqlite"
                        :database_to_upper false})

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

(use-fixtures :once with-test-db)

(deftest language-test
  (is (= #:language{:id 1 :name "Clojure"}
         (language/get-language-by-id @test-db 1)))
  (is (= 2 (count (language/get-languages @test-db)))))

(deftest user-test
  (is (= 1 (:user/id (user/get-user-by-id @test-db 1))))
  (is (= "vollcheck" (:user/username (user/get-user-by-id @test-db 1))))
  (is (= 1 (count (user/get-users @test-db)))))


(deftest save-user-test
  (is (= "another-vollcheck@snipsnap.com"
         (:user/email
          (do
            (user/save-user @test-db {:user/id 1
                                      :user/email "another-vollcheck@snipsnap.com"})
            (user/get-user-by-id @test-db 1)))))
  (is (= "vollcheck2@snipsnap.com"
         (:user/email
          (do
            (user/save-user @test-db {:user/username "vollcheck"
                                      :user/bio "really like keyboard clicking"
                                      :user/email "vollcheck2@snipsnap.com"})
            (user/get-user-by-id @test-db 2))))))


(comment
  (jdbc/execute-one! @test-db ["select * from user"])
  )
