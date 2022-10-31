(ns snipsnap.models.snap-test
  (:require [clojure.test :refer [deftest is use-fixtures testing]]
            [snipsnap.models.snap :as s]
            [snipsnap.models.test-utils :refer [with-test-db test-db]]))

(use-fixtures :once with-test-db)

(deftest snap-model-test
  (testing "standard snap get"
    (let [existing (s/get-snap-by-id @test-db 1)]
      (is (= (keys existing) [:snap/id
                              :snap/user_id
                              :snap/name
                              :snap/content
                              :snap/language_id
                              :snap/create_date
                              :snap/update_date]))))

  (testing "get snap by id when snap doesn't exist"
    (is (= nil (s/get-snap-by-id @test-db 0))))

  (testing "create new snap"
    (let [new-snap (s/save-snap @test-db {:name "multiplication of two integers"
                                          :content "const multiply = (x, y) => x * y"
                                          :language_id 2
                                          :user_id 1})
          new-snap-id (second (first new-snap))]
      (is (= 2 new-snap-id))))

  (testing "list all snaps"
    (is (= 2 (count (s/get-snaps @test-db)))))

  (testing "update existing snap"
    (let [result (s/save-snap @test-db {:id 1
                                        :name "sum of two integers with doc"
                                        :content "(defn sum \"doc here\" [x y] (+ x y))"
                                        :language_id 1
                                        :user_id 1})]
      (is (= 1 (:next.jdbc/update-count result)))))

  (testing "remove existing snap"
    (let [result (s/delete-snap-by-id @test-db 2)]
      (is (= 1 (:next.jdbc/update-count result)))))

  (testing "trying to remove snap that doesn't exist"
    (let [result (s/delete-snap-by-id @test-db 100)]
      (is (= 0 (:next.jdbc/update-count result))))))
