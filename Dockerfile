FROM ibmcom/ibmnode:latest
LABEL maintainer="***REMOVED***"

#RUN apt-get install -y nodejs npm

#App
WORKDIR /app

# Accounts
WORKDIR /app/accounts
# Install app dependencies
COPY ./accounts /app/accounts
RUN cd /app/accounts; npm install; npm prune --production
ENV NODE_ENV production
ENV PORT 3400
EXPOSE 3400
CMD [ "npm","start" ]
RUN cd

# Authentication
WORKDIR /app/authentication
# Install app dependencies
COPY ./authentication /app/authentication
RUN cd /app/authentication; npm install; npm prune --production
ENV NODE_ENV production
ENV PORT 3200
EXPOSE 3200
CMD [ "npm","start" ]
RUN cd

# Bills
WORKDIR /app/bills
# Install app dependencies
COPY ./bills /app/bills
RUN cd /app/bills; npm install; npm prune --production
ENV NODE_ENV production
ENV PORT 3800
EXPOSE 3800
CMD [ "npm","start" ]
RUN cd

# Support
WORKDIR /app/support
# Install app dependencies
COPY ./support /app/support
RUN cd /app/support; npm install; npm prune --production
ENV NODE_ENV production
ENV PORT 4000
EXPOSE 4000
CMD [ "npm","start" ]
RUN cd

# Transactions
WORKDIR /app/transactions
# Install app dependencies
COPY ./transactions /app/transactions
RUN cd /app/transactions; npm install; npm prune --production
ENV NODE_ENV production
ENV PORT 3600
EXPOSE 3600
CMD [ "npm","start" ]
RUN cd

# Userbase
WORKDIR /app/userbase
# Install app dependencies
COPY ./userbase /app/userbase
RUN cd /app/userbase; npm install; npm prune --production
ENV NODE_ENV production
ENV PORT 4200
EXPOSE 4200
CMD [ "npm","start" ]
RUN cd

# Portal
WORKDIR /app/portal
# Install app dependencies
COPY ./portal /app/portal
RUN cd /app/portal; npm install; npm prune --production
ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000
CMD [ "npm","start" ]
RUN cd
