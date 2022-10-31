(ns snipsnap.models.language_test
  (:require [clojure.test :refer [deftest is use-fixtures testing]]
            [snipsnap.models.language :as l]
            [snipsnap.models.test-utils :refer [with-test-db test-db]]))

(use-fixtures :once with-test-db)

(deftest language-model-test
  (testing "standard language get"
    (is (= #:language{:id 1 :name "Clojure"}
           (l/get-language-by-id @test-db 1))))

  (testing "get language by id when lang doesn't exist"
    (is (= nil (l/get-language-by-id @test-db 0))))

  (testing "list all languages"
    (is (= 2 (count (l/get-languages @test-db)))))

  (testing "create new language"
    (let [new-lang (l/save-language @test-db {:language/name "Haskell"})
          new-lang-id (second (first new-lang))]
      (is (= 3 new-lang-id))))

  (testing "update existing language"
    (let [result (l/save-language @test-db {:language/id 3
                                            :language/name "Haskell"})]
      (is (= 1 (:next.jdbc/update-count result)))))

  (testing "remove existing language"
    (let [result (l/delete-language-by-id @test-db 3)]
      (is (= 1 (:next.jdbc/update-count result)))))

  (testing "trying to remove language that doesn't exist"
    (let [result (l/delete-language-by-id @test-db 100)]
      (is (= 0 (:next.jdbc/update-count result))))))
