SELECT role, COUNT(id) AS "users count"
FROM "Users"
GROUP BY role
