FROM openjdk:22
ARG JAR_FILE=target/*.jar
COPY ./target/Marketplace-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]