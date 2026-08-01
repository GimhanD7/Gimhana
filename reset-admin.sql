USE sudessca_evon;

INSERT INTO admins (username, password_hash)
VALUES (
  'admin',
  '$2y$10$YUPGWS6AJp0Eo7L01Jv9xubQk6T.RVMye/wno4OVU/DumfDaOMhd2'
)
ON DUPLICATE KEY UPDATE
  password_hash = VALUES(password_hash),
  updated_at = CURRENT_TIMESTAMP;
