RUN export JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64"

RUN apt-get install -y nodejs
RUN apt-get install -y npm

COPY . /project
WORKDIR /project
RUN mvn package 

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom", "-Dblabla", "-jar","/project/target/lycee-tech-0.0.1-SNAPSHOT.jar", "--spring.profiles.active=prod,api-docs,no-liquibase"]