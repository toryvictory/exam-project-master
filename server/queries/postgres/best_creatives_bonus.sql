UPDATE "Users"
SET balance = balance + 10
FROM (SELECT id
      FROM "Users"
      WHERE role = 'creator'
      AND rating > 0
      ORDER BY rating DESC
      LIMIT 3
     ) AS "best_creatives"
WHERE "Users".id = best_creatives.id