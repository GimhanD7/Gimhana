-- Import once into the empty database selected in phpMyAdmin.
-- This import does not create an admin account.

CREATE TABLE IF NOT EXISTS admins (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(80) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS projects (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(180) NOT NULL,
  period VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  image LONGTEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_projects_order (display_order, id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS project_technologies (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  project_id INT UNSIGNED NOT NULL,
  technology VARCHAR(80) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  CONSTRAINT fk_technology_project FOREIGN KEY (project_id)
    REFERENCES projects(id) ON DELETE CASCADE,
  INDEX idx_technology_project (project_id, sort_order)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS project_links (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  project_id INT UNSIGNED NOT NULL,
  label VARCHAR(100) NOT NULL,
  url TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  CONSTRAINT fk_link_project FOREIGN KEY (project_id)
    REFERENCES projects(id) ON DELETE CASCADE,
  INDEX idx_link_project (project_id, sort_order)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS project_gallery (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  project_id INT UNSIGNED NOT NULL,
  image LONGTEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  CONSTRAINT fk_gallery_project FOREIGN KEY (project_id)
    REFERENCES projects(id) ON DELETE CASCADE,
  INDEX idx_gallery_project (project_id, sort_order)
) ENGINE=InnoDB;
