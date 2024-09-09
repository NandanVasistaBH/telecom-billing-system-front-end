FROM node:18 AS build
WORKDIR /ap
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 3001
CMD ["nginx", "-g", "daemon off;"]
