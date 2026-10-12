
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE groups(
    group_id SERIAL PRIMARY KEY,
    group_title TEXT NOT NULL,
    group_description TEXT NOT NUll,
    creator_id int NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE group_members(
    group_id INT NOT NULL REFERENCES groups(group_id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    joined_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (group_id, user_id)
);

CREATE TABLE assignments(
    assignment_id SERIAL PRIMARY KEY,
    group_id INT NOT NULL REFERENCES groups(group_id) ON DELETE CASCADE,
    created_by INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    assignment_name TEXT NOT NULL,
    assignment_description TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    due_date DATE,
    is_complete BOOLEAN NOT NULL DEFAULT FALSE,
    
);



CREATE TABLE posts(
    post_id SERIAL PRIMARY KEY,
    group_id INT NOT NULL REFERENCES groups(group_id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    post_title TEXT NOT NULL,
    notes TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE study_sets(
    study_set_id SERIAL PRIMARY KEY,
    group_id INT NOT NULL REFERENCES groups(group_id) ON DELETE CASCADE,
    created_by INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    study_set_title TEXT NOT NULL,
    study_set_description TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE flashcards(
    flashcard_id SERIAL PRIMARY KEY,
    study_set_id INT NOT NULL REFERENCES study_sets(study_set_id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT NOT NULL
);

CREATE TABLE tests(
    test_id SERIAL PRIMARY KEY,
    study_set_id INT NOT NULL REFERENCES study_sets(study_set_id) ON DELETE CASCADE,
    test_title TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE test_questions(
    question_id SERIAL PRIMARY KEY,
    test_id INT NOT NULL REFERENCES tests(test_id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    correct_answer TEXT NOT NULL
);



