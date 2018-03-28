FROM ibmcom/ibmnode:latest
LABEL maintainer="amalamine@ae.ibm.com"

#RUN apt-get install -y nodejs npm

WORKDIR /app
COPY . /app
RUN cd /app; npm install; npm prune --production

# Accounts
RUN cd /app/accounts; npm install; npm prune --production
ENV NODE_ENV production
ENV PORT 3400
EXPOSE 3400
CMD [ "npm","start" ]

# Authentication
RUN cd /app/authentication; npm install; npm prune --production
ENV NODE_ENV production
ENV PORT 3200
EXPOSE 3200
CMD [ "npm","start" ]

# Bills
RUN cd /app/bills; npm install; npm prune --production
ENV NODE_ENV production
ENV PORT 3800
EXPOSE 3800
CMD [ "npm","start" ]

# Support
RUN cd /app/support; npm install; npm prune --production
ENV NODE_ENV production
ENV PORT 4000
EXPOSE 4000
CMD [ "npm","start" ]

# Transactions
RUN cd /app/transactions; npm install; npm prune --production
ENV NODE_ENV production
ENV PORT 3600
EXPOSE 3600
CMD [ "npm","start" ]

# Userbase
RUN cd /app/userbase; npm install; npm prune --production
ENV NODE_ENV production
ENV PORT 4200
EXPOSE 4200
CMD [ "npm","start" ]

# Portal
RUN cd /app/portal; npm install; npm prune --production
ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000
CMD [ "npm","start" ]
