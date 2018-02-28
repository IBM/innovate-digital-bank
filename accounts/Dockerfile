FROM ibmcom/ibmnode:latest
LABEL maintainer="amalamine@ae.ibm.com"

#RUN apt-get install -y nodejs npm

WORKDIR /app
# Install app dependencies
COPY . /app
RUN cd /app; npm install; npm prune --production
ENV NODE_ENV production
ENV PORT 3400

EXPOSE 3400
CMD [ "npm","start" ]
