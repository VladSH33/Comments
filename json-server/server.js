// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('json-server/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (req.method === 'GET') {
    next();
  } else {
    const token = req.headers.authorization;
    if (token && token === 'Bearer valid-token') {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
});

server.post('/comments/rate', (req, res) => {
  const { id, parentId, isLike, isDislike } = req.body;

  if (parentId) {
    const parentComment = router.db.get('comments').find({ id: parentId }).value();
    if (!parentComment) return res.status(404).json({ message: 'Комментарий не найден!' });

    const updatedReplies = parentComment.replies.map((reply) =>
      reply.id === id ? { ...reply, isLike, isDislike } : reply
    );

    router.db.get('comments').find({ id: parentId }).assign({ replies: updatedReplies }).write();
  } else {
    router.db.get('comments').find({ id }).assign({ isLike, isDislike }).write();
  }

  res.sendStatus(200);
});

server.use(router);
server.listen(5000, () => {
  console.log('JSON Server is running on port 5000');
});
