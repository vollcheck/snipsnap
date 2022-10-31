(ns snipsnap.models.user-test
  (:require [clojure.test :refer [deftest is use-fixtures testing]]
            [snipsnap.models.user :as u]
            [snipsnap.models.test-utils :refer [with-test-db test-db]]))

(use-fixtures :once with-test-db)

(deftest user-model-test
  (testing "standard get user by id or by username"
    (let [ks [:user/id
              :user/username
              :user/password
              :user/email
              :user/avatar
              :user/bio]
          existing-by-id (u/get-user-by-id @test-db 1)
          ;; existing-by-username (u/get-user-by-username @test-db "vollcheck")
          ]
      (is (= (keys existing-by-id) ks))
      ;; (is (= (keys existing-by-username) ks))
      ))

  (testing "get user by id when lang doesn't exist"
    (is (= nil (u/get-user-by-id @test-db 0))))

  (testing "create new user"
    (let [new-user (u/save-user @test-db {:username "thatguy"
                                          :email "that@guy.net"
                                          :avatar ""
                                          :bio "wrangling parens"})
          new-user-id (second (first new-user))]
      (is (= 2 new-user-id))))

  (testing "list all users"
    (is (= 2 (count (u/get-users @test-db)))))

  (testing "update existing snap"
    (let [result (u/save-user @test-db {:user/id 1
                                        :user/username "vollcheck"
                                        :user/password "admin"
                                        :user/email "vollcheck@snipsnap.com"
                                        :user/avatar ""
                                        :user/bio "wrangling parens with emacs"})]
      (is (= 1 (:next.jdbc/update-count result)))))

  (testing "remove existing user"
    (let [result (u/delete-user-by-username @test-db "vollcheck")]
      (is (= 1 (:next.jdbc/update-count result)))))

  (testing "trying to remove user that doesn't exist"
    (let [result (u/delete-user-by-username @test-db "idontevenexist")]
      (is (= 0 (:next.jdbc/update-count result))))))
