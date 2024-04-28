/src
|-- /app
|   |-- /modules
|   |   |-- /user
|   |   |   |-- /domain
|   |   |   |   |-- user.entity.ts
|   |   |   |   |-- user.service.ts
|   |   |   |   |-- user.interface.ts (opcional)
|   |   |   |   |-- /exceptions (se houver)
|   |   |   |   |   |-- user.exception.ts
|   |   |   |-- /infra
|   |   |   |   |-- /typeorm
|   |   |   |   |   |-- user.repository.ts
|   |   |   |-- /data
|   |   |   |   |-- /dto
|   |   |   |   |   |-- create-user.dto.ts
|   |   |   |   |   |-- update-user.dto.ts
|   |   |   |   |-- /interfaces (se houver)
|   |   |   |   |   |-- user.interface.ts
|   |   |   |   |-- /enums (se houver)
|   |   |   |   |   |-- user.enum.ts
|   |   |   |-- /controller
|   |   |   |   |-- user.controller.ts
|   |   |   |-- /presentation (opcional)
|   |   |   |   |-- /dto
|   |   |   |   |   |-- create-user.dto.ts
|   |   |   |   |   |-- update-user.dto.ts
|   |   |   |   |-- /responses (opcional)
|   |   |   |   |   |-- user.response.ts
|   |   |   |   |-- /middleware (opcional)
|   |   |   |   |   |-- validation.middleware.ts
|   |-- /config
|   |   |-- database.config.ts
|   |   |-- swagger.config.ts
|-- /test
|   |-- /unit
|   |   |-- /user
|   |   |   |-- user.service.spec.ts

