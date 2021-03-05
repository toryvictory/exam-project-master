db.messages.aggregate(
  [
    { $match: { body: {$regex: /паровоз/i } }},
    { $count: 'messages_count' },
  ],
  );