(ns snipsnap.models.language
  "Namespace for language model persistence."
  (:require [next.jdbc.sql :as sql]
            [honey.sql :as hsql]))

(def ^:const initial-languages-data
  "Seed the snaps table with this data."
  ["Clojure" "JavaScript"])

(defn get-language-by-id
  "Given a language ID, return the language record."
  [db id]
  (sql/get-by-id (db) :lang id))

(defn get-languages
  "Return all available language records (in order)."
  [db]
  (sql/query (db) (hsql/format {:select :* :from :language :order-by [:name]}
                               {:inline true})))

(defn save-language
  "Save a language record. If ID is present and not zero, then
  this is an update operation, otherwise it's an insert."
  [db language]
  (let [id (:language/id language)]
    (if (and id (not (zero? id)))
      ;; update
      (sql/update! (db) :language
                   (dissoc language :language/id)
                   {:id id})
      ;; insert
      (sql/insert! (db) :language
                   (dissoc language :language/id)))))

(defn delete-language-by-id
  "Given a language ID, delete that language."
  [db id]
  (sql/delete! (db) :language {:id id}))
