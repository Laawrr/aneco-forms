-- Create the database (optional, change name as needed)
CREATE DATABASE IF NOT EXISTS survey_system;
USE survey_system;

-- 1. Table: user
-- This must be created first as 'forms' depends on it.
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    admin BOOLEAN DEFAULT FALSE,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- 2. Table: forms
-- Links to 'user' via user_id.
CREATE TABLE forms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    form_name VARCHAR(255) NOT NULL,
    form_description TEXT,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

-- 3. Table: form_content
-- Links to 'forms' via form_id. Represents the questions/items in a form.
CREATE TABLE form_content (
    id INT AUTO_INCREMENT PRIMARY KEY,
    form_id INT NOT NULL,
    form_content_description TEXT,
    FOREIGN KEY (form_id) REFERENCES forms(id) ON DELETE CASCADE
);

-- 4. Table: survey_record
-- Links to 'forms' via form_id. Represents a specific submission of a form.
-- Note: 'contact_no' is set to VARCHAR to handle formatting and leading zeros better than INT.
CREATE TABLE survey_record (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NULL,        -- Marked as optional in diagram
    address VARCHAR(255) NULL,     -- Marked as optional
    email VARCHAR(255) NULL,       -- Marked as optional
    contact_no VARCHAR(50) NULL,   -- Marked as optional, used VARCHAR for phone number safety
    datetime DATETIME DEFAULT CURRENT_TIMESTAMP,
    assisting_staff VARCHAR(255),
    form_id INT NOT NULL,
    FOREIGN KEY (form_id) REFERENCES forms(id) ON DELETE CASCADE
);

-- 5. Table: survey_content
-- Links to 'survey_record' AND 'form_content'. 
-- This stores the specific answer/rating for a specific question in a specific survey.
CREATE TABLE survey_content (
    id INT AUTO_INCREMENT PRIMARY KEY,
    survey_id INT NOT NULL,
    form_content_id INT NOT NULL,
    rating FLOAT,
    FOREIGN KEY (survey_id) REFERENCES survey_record(id) ON DELETE CASCADE,
    FOREIGN KEY (form_content_id) REFERENCES form_content(id) ON DELETE CASCADE
);