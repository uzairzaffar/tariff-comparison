# Use an official Node.js runtime as a parent image
FROM node:18 as build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build

# Use a lightweight Nginx image to serve the Angular app
FROM nginx:alpine

# Copy the built Angular app to the Nginx server directory
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.confg

# Expose the port Nginx listens on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
