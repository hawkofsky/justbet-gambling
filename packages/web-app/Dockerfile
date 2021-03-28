FROM node:10
WORKDIR /frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# RUN npm install -g pm2
EXPOSE 3002
CMD ["pm2-runtime", "start", "pm2.yaml"]
