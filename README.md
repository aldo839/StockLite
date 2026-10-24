# Stocklite

# StockLite

![Build](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge)
![Java](https://img.shields.io/badge/Java-17%2B-ED8B00?style=for-the-badge&logo=java&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4479A1?style=for-the-badge&logo=postgresql&logoColor=white)

> Application of heath tracking for sickle cell person in Cameroon.
> This can be useful for sickle cell person of others country in the word, 
> we are focus on Cameroon because we want to 
> the performance of the app and optimize it for starting with others country.

> Stock management functionality is the first version of StockLite,
> in the second version we will add the E-commerce feature and 
> in the third version we will add the targeted prospecting. 

## Description
**Stock management** is one of the first challenge for any store, and the challenge 
add with a quantity of operation make on that one, it is more ease to manage with book and Excel Table.

After an evaluation of how many store we found that many of those who has a stock management, when they
want to stack with **e-commerce**, they order a new software and that new one is no coherent with a stock
management and it is a problem.

Many store now need to make a **targeted advertisement** depending on the product, the period and the 
customer. It is want one of the solution's that can help, and for that it will be better to use what we 
know about our stock and our customer. This is a direct relationship with the stock management feature

>How can we solve these distinct problems in a joint manner ?

This is why we propose StockLite, the application that will take in consideration all that three 
feature that is very helpful for any store in-depending of what they sell.

## Features

### Stock Management
- Create a product category
- Create a product based on his category
- Add or remove product, 
- Update and delete function
- Searching 

### Activity Management
Show activities list with the informations like
- Type of activity
- Date and time
- Actor (In development with user management)

### Administration
In development

## Technical Stack

### Backend

| Category             | Technology            |
|----------------------|-----------------------|
| Programming language | Java 21               |
| Framework            | Spring Boot 4         |
| Security             | Spring Security + JWT |
| Persistance          | Spring Data JPA       |
| Database             | PostgreSQL            |

### Frontend

| Category             | Technology            |
|----------------------|-----------------------|
| Programming language | TypeScript            |
| Framework            | React                 |
| Connexion            | Axios  + TanStack     |

## Installation Guide

### Project Clone
```bash
git clone https://github.com/aldo839/stocklite.git
cd stocklite
```

### Configuration of the database
```
spring.datasource.url=jdbc:postgresql://localhost:5432/stocklite
spring.datasource.username=your_postgres_username
spring.datasource.password=your_postgres_password


### Application running
```bash
cd /backend/stocklite
./mvnw spring-boot:run
```

```bash
cd /frontend/stocklite
npm run dev
```

## Demo

<img width="1920" height="906" alt="Screenshot_20261010_062836" src="https://github.com/user-attachments/assets/389c34f5-0b20-4254-a3a1-00502f8fbeee" />
<img width="1920" height="910" alt="Screenshot_20261010_062757" src="https://github.com/user-attachments/assets/c20fd6a9-9b20-41e2-a3f9-45d1fcf41f71" />
<img width="1920" height="910" alt="Screenshot_20261010_063043" src="https://github.com/user-attachments/assets/572dd6c2-7109-4908-9bb8-d91efa804769" />




