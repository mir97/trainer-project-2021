import morgan from 'morgan';

export const customTokenMorganForMiddleWear = (): void => {
  morgan.token('custom', (req: Request) => {
    return [
      `Method: ` + req.method,
      `URL: ` + req.url,
      Object.entries(req.body).length ? `Body: ` + JSON.stringify(req.body) : '',
    ].join(' ');
  });
};
