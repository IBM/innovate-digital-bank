FROM ibmcom/ibmnode:latest
LABEL maintainer="amalamine@ae.ibm.com"

# Upgrade npm to latest version

RUN npm install -g yarnpkg
RUN yarn global add npm
RUN npm -v
RUN npm config set unsafe-perm=true

# Copy app & set working directory
WORKDIR /app
COPY . /app
RUN npm install; npm prune --production

ENV NODE_ENV production
ENV SESSION_SECRET 5a4e0d2c6198976aaff66bc8
ENV MONGO_USERNAME mongo
ENV MONGO_PASSWORD mongo1234
ENV MONGO_DB admin

EXPOSE 3100 3200 3400 3600 3800 4000 4100

CMD [ "npm","start" ]
