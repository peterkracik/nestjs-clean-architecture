# Clean Architecture with NestJS

article: https://medium.com/@peterkracik

This project demonstrates the implementation of Clean Architecture principles using the NestJS framework. It serves as a guide for structuring a NestJS application to ensure separation of concerns, maintainability, and scalability.

## Project Structure

The project is organized into several layers, each with a specific responsibility:

-  **Domain Layer**: Contains the core business logic and domain entities. This layer is independent of frameworks and external libraries.

-  **Use Cases Layer**: Implements application-specific business rules. Each use case is represented as a service with a single responsibility.

-  **Interface Adapters Layer**: Acts as a bridge between the framework and the domain layer. This includes controllers, presenters, and gateways.

-  **Frameworks and Drivers Layer**: Contains the NestJS framework and any third-party libraries. This layer handles interactions with external systems, such as databases and APIs.

## Key Features

-  **Dependency Injection**: Utilizes NestJS's powerful dependency injection system to manage service instances and promote loose coupling between components.

-  **Repository Pattern**: Abstracts data access logic, allowing easy swapping of data sources without affecting the business logic.

-  **Modular Design**: Encourages the separation of concerns by organizing the application into distinct modules.

-  **Interchangeable Components**: Demonstrates how to swap out components like databases or notification services with minimal impact on the application.

## Getting Started

### Prerequisites

-  Node.js
-  Yarn

### Installation
```
yarn install
```

### Environment variables

copy `.env.template` to `.env`

### Running the Application

1. Start docker
to provide a database, you can start the docker via
```
docker compose up
```

2.	Start the development server:
```
yarn start:dev
```
3.	Access the application at http://localhost:3000.

### Testing
Run the tests using:

```
yarn test
yarn test:e2e
```

## Customization

- Environment Configuration: Use environment variables to configure different settings for development, testing, and production environments.
- Extending Functionality: Add new use cases or integrate additional services by following the established architectural patterns.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue to discuss your ideas.

## License
This project is licensed under the MIT License. See the LICENSE file for details.


Feel free to adjust the content to better fit your project's specifics, such as adding more detailed instructions or links to documentation.
