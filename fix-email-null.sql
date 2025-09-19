-- Option 1: Delete records with null emails
DELETE FROM user_model WHERE email IS NULL;

-- Option 2: Update null emails to a default value
-- UPDATE user_model SET email = 'default@example.com' WHERE email IS NULL;

-- Option 3: Drop and recreate the table (WARNING: This will delete all data!)
-- DROP TABLE IF EXISTS user_model CASCADE;