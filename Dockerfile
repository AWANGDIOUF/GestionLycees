FROM ubuntu:20.04

RUN apt-get update --fix-missing
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get install -y default-jdk && apt-get install -y maven

RUN export JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64"

RUN apt-get install -y nodejs
RUN apt-get install -y npm

COPY . /project
WORKDIR /project
RUN mvn package -Pprod

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom", "-Dblabla", "-jar","/project/target/lycee-tech-0.0.1-SNAPSHOT.jar", "--spring.profiles.active=prod,api-docs","-DskipTests=true"]
