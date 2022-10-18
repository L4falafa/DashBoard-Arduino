#Node immage
FROM node:latest
#Set working directory
WORKDIR /app
#Copy package.json
COPY ./package.json ./
#Inatall Nodemon
RUN npm install -g nodemon
#Install dependencies
RUN npm install
#Copy everything else
COPY ./ ./
#Expose port
EXPOSE 3000
#Default command
CMD ["npm", "start"]