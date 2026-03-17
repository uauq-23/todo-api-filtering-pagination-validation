import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { requestContext } from './middlewares/request-context.js';
import { accessLogger } from './middlewares/access-logger.js';
import { responseHelpers } from './middlewares/response-helpers.js';
import todoRouter from './routers/todo-r.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// gài request context middleware để attach requestId và logger
app.use(requestContext());
// gài access logger middleware
app.use(accessLogger());
app.use(responseHelpers);

// Routes
app.use('/api/todos', todoRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;