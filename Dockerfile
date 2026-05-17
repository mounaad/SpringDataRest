FROM eclipse-temurin:21-alpine
ADD target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]