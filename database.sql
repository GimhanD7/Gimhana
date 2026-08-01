CREATE DATABASE IF NOT EXISTS gimhana_portfolio
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE gimhana_portfolio;

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

INSERT INTO admins (username, password_hash)
VALUES ('admin', '$2y$10$YUPGWS6AJp0Eo7L01Jv9xubQk6T.RVMye/wno4OVU/DumfDaOMhd2')
ON DUPLICATE KEY UPDATE
  password_hash = VALUES(password_hash),
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO projects (id, title, period, description, category, image, display_order) VALUES
(1, 'Tuition Class Management Systems', 'January 2025', 'Architected and developed comprehensive tuition management platforms serving multiple user roles including students, teachers, and administrators across two independent educational institutions. Implemented student enrollment, class scheduling, automated payment processing, real-time attendance tracking, and comprehensive result evaluation modules.', 'Web Development', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop', 0),
(2, 'Leo Club of SLIIT Portal', 'July 2024', 'Engineered a comprehensive web-based portal streamlining internal club operations and member management processes. Implemented secure authentication protocols, role-based access controls, and user-friendly dashboards for enhanced operational efficiency.', 'Web Development', 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop', 1),
(3, 'PDF Management System (Associated Newspapers of Ceylon Limited)', 'July 2024 - December 2024', 'Developed and maintained an enterprise-grade PDF Management System handling document workflows across multiple newspaper departments, improving document organization efficiency, search functionality, and cross-departmental collaboration.', 'System Design', 'https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=2030&auto=format&fit=crop', 2),
(4, 'Official Leo Club of SLIIT Website', 'July 2024', 'Designed and developed the official Leo Club website with emphasis on responsive design and exceptional user experience. Applied modern UI/UX practices to enhance accessibility, usability, and visual appeal across all device platforms. Managed complete website architecture, content integration, SEO optimization, and performance tuning.', 'Web Development', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop', 3),
(5, 'JCEY Tea Box Packaging Design', 'July 2023 - December 2023', 'Designed comprehensive tea box packaging for 7 regional variants and 10 flavor-based products, ensuring alignment with brand identity and market positioning. Created engaging promotional artwork and marketing materials for both digital and print platforms.', 'Design', 'https://images.unsplash.com/photo-1544787210-2211d7c309c7?q=80&w=1974&auto=format&fit=crop', 4),
(6, 'Freelance Social Media Visual Branding', 'January 2022 - Present', 'Designed engaging and visually compelling social media content for diverse clients across multiple platforms including Facebook, Instagram, and LinkedIn. Improved brand visibility and audience engagement through strategic creative visual content development and platform-optimized designs.', 'Design', 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop', 5)
ON DUPLICATE KEY UPDATE title = VALUES(title);

DELETE FROM project_technologies WHERE project_id BETWEEN 1 AND 6;
DELETE FROM project_links WHERE project_id BETWEEN 1 AND 6;

INSERT INTO project_technologies (project_id, technology, sort_order) VALUES
(1, 'React.js', 0), (1, 'Node.js', 1), (1, 'MySQL', 2), (1, 'Express', 3), (1, 'Responsive Design', 4),
(2, 'React.js', 0), (2, 'PHP', 1), (2, 'MySQL', 2), (2, 'Authentication', 3),
(3, 'PHP', 0), (3, 'MySQL', 1), (3, 'JavaScript', 2), (3, 'System Enhancement', 3),
(4, 'React.js', 0), (4, 'Tailwind CSS', 1), (4, 'Framer Motion', 2), (4, 'SEO Optimization', 3),
(5, 'Adobe Photoshop', 0), (5, 'Figma', 1), (5, 'Branding', 2), (5, 'Graphic Design', 3),
(6, 'Adobe Photoshop', 0), (6, 'Graphic Design', 1), (6, 'Visual Branding', 2);

INSERT INTO project_links (project_id, label, url, sort_order) VALUES
(1, 'Manoj Maths', 'http://mathswithmanoj.com/', 0),
(1, 'Sudesh Maths', 'https://sudeshmaths.com/', 1),
(2, 'Portal', 'https://web.portal.sliitleo.org', 0),
(4, 'Official Site', 'https://sliitleo.org', 0);
