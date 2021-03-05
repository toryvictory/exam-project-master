UPDATE "Users"
SET balance = balance + holiday_orders_sum * 0.1
FROM (SELECT "Users".id, sum("Contests".prize) AS "holiday_orders_sum"
      FROM "Users"
               JOIN "Contests"
                    ON "Users".id = "Contests"."userId"
      WHERE "Contests"."createdAt" BETWEEN '2020-12-25' AND '2021-01-14'
        AND "Users".role = 'customer'
      GROUP BY "Users".id
     ) AS "holiday_customers"
WHERE "Users".id = holiday_customers.id
