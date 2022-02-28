FROM node:14 AS ui-build
WORKDIR /usr/src/app
COPY ./
RUN npm install && npm run build

FROM node:14 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/build ./build
COPY backend/package*.json ./backend/
RUN cd backend && npm install
COPY backend/index.js ./backend/

EXPOSE 3080

CMD ["node", "./backend/index.js"]