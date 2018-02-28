FROM ibmcom/ibmnode

ENV PORT 4000

WORKDIR "/app"

# Bundle app source
COPY . /app

EXPOSE 4000

CMD ["/bin/bash"]

ARG bx_dev_user=root
ARG bx_dev_userid=1000
RUN BX_DEV_USER=$bx_dev_user
RUN BX_DEV_USERID=$bx_dev_userid
RUN if [ $bx_dev_user != "root" ]; then useradd -ms /bin/bash -u $bx_dev_userid $bx_dev_user; fi
