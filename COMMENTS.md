## Arquitetura utilizada
Optei por utilizar uma arquitetura **Clean Architecture** combinada com **DDD (Domain Driven Design)** para manter a separação clara entre camadas de domínio, aplicação e infraestrutura, em ambos projetos.  
Essa decisão foi tomada para garantir:
- Facilidade de manutenção e evolução do código;
- Maior testabilidade (módulos independentes e desacoplados);
- Clareza na responsabilidade de cada camada (UI, casos de uso, domínio, infraestrutura).

---

## Lista de bibliotecas de terceiros utilizadas

### Frontend - Vite Vue 3
- Axios - http client
- Maska - aplicação de máscaras em inputs
- Material Design Icons - pacote de ícones
- Pinia - Store Management
- Vuetify - Component framework

### Backend - NodeJS - NestJS
- TypeORM - ORM
- Jwt - autenticação
- Bcrypt - hash
- Bson - ObjectId
- Class-transformer & class-validator - Anotações de validações de campos tm classes
- Cookie-parser - gerenciamento de cookies
- Dayjs - Formatação de datas e manipulação de data/hora
- Passport & Passport JWT - autenticação
---

## O que eu melhoraria se tivesse mais tempo
- Adicionaria **observabilidade** logs estruturados, métricas.
- Implementação de rules para abranger vários tipos de usuário e suas permissões.
- UI/UX - Melhoraria o layout para trazer mais conforto ao usuário
- Dividiria a responsabilidade de autenticação a outra aplicação backend assim como é feito com o Keycloak por exemplo.
- Criaria uma store reativa a comandos via WebSocket que atualizaria os dados em tempo real para todos os usuários conectados.
---

## Requisitos obrigatórios que não foram entregues
- Nenhum

---