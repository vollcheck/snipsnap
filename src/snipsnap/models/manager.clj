(ns snipsnap.models.manager
  "The model for the application."
  (:require [com.stuartsierra.component :as component]
            [next.jdbc :as jdbc]
            [next.jdbc.sql :as sql]
            [snipsnap.models.language :as language]
            [snipsnap.models.user :as user]
            [snipsnap.models.snap :as snap]))

;; database connection and initial data

(def ^:private ^:const db-spec
  "SQLite database connection spec."
  {:dbtype "sqlite" :dbname "db.sqlite"})

;; database initialization
(defn- populate
  "Called at application startup. Attempts to create the
  database table and populate it. Takes no action if the
  database table already exists."
  [db db-type]
  (let [auto-key (if (= "sqlite" db-type)
                   "primary key autoincrement"
                   (str "generated always as identity"
                        " (start with 1 increment by 1)"
                        " primary key"))]
    (try
      (jdbc/execute-one! (db)
                         [(str "
create table language (
  id    integer " auto-key ",
  name  varchar(32)
)")])
      (jdbc/execute-one! (db)
                         [(str "
create table snap (
  id            integer " auto-key ",
  user_id       integer not null,
  name          text,
  content       text,
  language_id   integer,
  create_date   varchar(128),
  update_date   varchar(128)
)")])
      (jdbc/execute-one! (db)
                         [(str "
create table user (
  id        integer " auto-key ",
  username  varchar(32),
  password  varchar(64),
  email     varchar(64),
  avatar    blob,
  bio       text
)")])
      (println "Created database and user/snap/language tables!")
      ;; if table creation was successful, it didn't exist before
      ;; so populate it...
      (try
        (doseq [l language/initial-languages-data]
          (sql/insert! (db) :language {:name l}))
        (doseq [s snap/initial-snaps-data]
          (sql/insert! (db) :snap s))
        (doseq [row user/initial-user-data]
          (sql/insert! (db) :user row))
        (println "Populated database with initial data!")
        (catch Exception e
          (println "Exception:" (ex-message e))
          (println "Unable to populate the initial data -- proceed with caution!")))
      (catch Exception e
        ;; (println e)
        (println "Looks like the database is already setup. Squashing SQL error.")))))

;; database component
(defrecord Database [db-spec     ; configuration
                     datasource] ; state

  component/Lifecycle
  (start [this]
    (if datasource
      this ; already initialized
      (let [database (assoc this :datasource (jdbc/get-datasource db-spec))]
        ;; set up database if necessary
        (populate database (:dbtype db-spec))
        database)))
  (stop [this]
    (assoc this :datasource nil))

  ;; allow the Database component to be "called" with no arguments
  ;; to produce the underlying datasource object
  clojure.lang.IFn
  (invoke [_] datasource))

(defn setup-database [] (map->Database {:db-spec db-spec}))
