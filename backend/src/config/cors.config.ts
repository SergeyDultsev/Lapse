export const corsRules = {
  origin: ['http://localhost:5000'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
  allowedHeaders: [
    'Origin',
    'Accept',
    'Content-Type',
    'X-Requested-With',
    'Authorization',
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};
