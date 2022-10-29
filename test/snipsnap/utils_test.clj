(ns snipsnap.utils-test
  (:require [clojure.test :refer [deftest is]]
            [snipsnap.utils :refer [clean-entity-data]]))

(deftest clean-entity-data-test
  (let [entity {"snap/id" 2
                "snap/user_id" 1
                "snap/name" "hard computations"
                "snap/content" "(+ 1 2 3)"
                "snap/language_id" 1}
        cleared {:id 2,
                 :user_id 1,
                 :name "hard computations",
                 :content "(+ 1 2 3)",
                 :language_id 1}]
    (is (= (clean-entity-data entity)
           cleared))))
