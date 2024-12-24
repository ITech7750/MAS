FROM maven:3-openjdk-16
COPY . .
RUN mvn -Dmaven.wagon.http.ssl.insecure=true -Dmaven.wagon.http.ssl.allowall=true package
EXPOSE 7070
EXPOSE 7778
ENTRYPOINT [ "java",  "-jar", "./target/AENetAgents-1.1-jar-with-dependencies.jar" ]