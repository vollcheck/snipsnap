;; copyright (c) 2019-2022 Sean Corfield, all rights reserved

(ns snipsnap.model.manager-test
  "These tests use H2 in-memory."
  (:require [clojure.test :refer [deftest is use-fixtures]]
            [com.stuartsierra.component :as component]
            [next.jdbc :as jdbc]
            [snipsnap.model.manager :as db-manager]
            [snipsnap.model.language :as language]
            [snipsnap.model.user :as user]
            [snipsnap.model.snap :as snap]))

(def ^:private test-db (atom nil))

(def ^:private db-spec {:dbtype "h2:mem"
                        :dbname "snipsnaps_test"
                        :database_to_upper false})

(defn- with-test-db
  "A test fixture that sets up an in-memory H2 database for running tests."
  [t]
  ;; clear out any existing in-memory data
  (let [ds (jdbc/get-datasource db-spec)]
    (try
      (jdbc/execute-one! ds ["drop table language"])
      (jdbc/execute-one! ds ["drop table snap"])
      (jdbc/execute-one! ds ["drop table user"])
      (catch Exception _)))
  (let [db (component/start
            (db-manager/map->Database {:db-spec db-spec}))]
    (reset! test-db db)
    (t)
    (component/stop db)))

(use-fixtures :once with-test-db)

(deftest language-test
  (is (= #:language{:id 1 :name "clojure"}
         (language/get-language-by-id @test-db 1)))
  (is (= 2 (count (language/get-languages @test-db)))))

(deftest user-test
  (is (= 1 (:user/id (user/get-user-by-id @test-db 1))))
  (is (= "vollcheck" (:user/username
                 (user/get-user-by-id @test-db 1))))
    (is (= 1 (count (user/get-users @test-db))))
  #_(is (= 4 (:addressbook/department_id
            (db-manager/get-user-by-id @test-db 1))))
  #_(is (= "Development" (:department/name
                        (first
                         (db-manager/get-users @test-db)))))
  )

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
