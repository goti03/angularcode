FROM centos:centos7.9.2009

MAINTAINER goti03@gmail.com

RUN mkdir /opt/tomcat/

WORKDIR /opt/tomcat
RUN curl -O https://dlcdn.apache.org/tomcat/tomcat-9/v9.0.76/bin/apache-tomcat-9.0.76.tar.gz
RUN tar xvfz apache*.tar.gz
RUN mv apache-tomcat-9.0.76/* /opt/tomcat/.
RUN yum -y install java
RUN java -version

WORKDIR /opt/tomcat/webapps
RUN mkdir -p /opt/tomcat/webapps/portal
COPY ./dist/* /opt/tomcat/webapps/portal

#RUN curl -O -L https://github.com/AKSarav/SampleWebApp/raw/master/dist/SampleWebApp.war
#
EXPOSE 8080
#
CMD ["/opt/tomcat/bin/catalina.sh", "run"]
