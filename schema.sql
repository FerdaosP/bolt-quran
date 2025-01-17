CREATE TABLE users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      last_login TIMESTAMP
    );

    CREATE TABLE progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      surah_number INTEGER NOT NULL,
      ayat_number INTEGER NOT NULL,
      last_read TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
