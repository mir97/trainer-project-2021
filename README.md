# st-2-rest-api

## Инструкция

### Пользователи 

#### 1. http://localhost:3000/users

Перед началом работы с DB необходимо запустить скрипт:
npm run run-migrate


<details><summary>POST</summary>
    Для создания пользователя необходимо отправить POST запрос с следующем Body:

    body = {  
    &ensp;login: string;  
    &ensp;password: string;  
    &ensp;age: number;  
    &ensp;isDeleted: boolean;  
    }
 </details>


 <details><summary>GET</summary>
 Для получения пользователей по содержимому их логина необходимо отправить GET запрос

 http://localhost:3000/users?loginSubstring={string}&limit={number}

 Где limit по стандарту равно 10

 </details>

#### 2. http://localhost:3000/users/{usersId}

 <details><summary>GET</summary>
 Для полученя пользователя по ID необходимо оправить следущий запрос 
 http://localhost:3000/users/{usersId}  
 </details>

 <details><summary>DELETE</summary>
 Для удаления пользователя по ID необходимо оправить следущий запрос 
 http://localhost:3000/users/{usersId}  

 </details>

 <details><summary>PUT</summary>
 Для обновления пользователя по ID необходимо оправить следущий запрос 

 http://localhost:3000/users/{usersId}  
 со следущим body

body = {  
 &ensp;login: string;  
 &ensp;password: string;  
 &ensp;age: number; 
 &ensp;isDeleted: boolean; 
 }  
 

 </details>

### Группы 

#### 1. http://localhost:3000/groups

<details><summary>POST</summary>
    Для создания группы необходимо отправить POST запрос с следующем Body:

    body = {  
    &ensp;name: string;  
    &ensp;permissions: string;  
    }

 </details>


 <details><summary>GET</summary>
 Для получения всех пользователей необходимо отправить GET запрос

 http://localhost:3000/groups/

 </details>

#### 2. http://localhost:3000/groups/{groupId}

 <details><summary>GET</summary>
 Для полученя группы по ID необходимо оправить следущий запрос 
 http://localhost:3000/groups/{groupsId}  
 </details>

 <details><summary>DELETE</summary>
 Для удаления группы по ID необходимо оправить следущий запрос 
 http://localhost:3000/groups/{groupId}  

 </details>

 <details><summary>PUT</summary>
 Для обновления группы по ID необходимо оправить следущий запрос 

 http://localhost:3000/groups/{groupId}  
 со следущим body

body = {  
 &ensp;name: string;  
 &ensp;permissions: string;  
 }  
 </details>

#### 3. http://localhost:3000/groups/addUsersToGroup

 <details><summary>PUT</summary>
 Для добавления записи в промежуточную таблицу GroupUser необходимо отправить следующий запрос 

 http://localhost:3000/groups/addUsersToGroup
 со следущим body

 body = {  
    &groupId;: string;  
    &userIds;: [ 'string' , 'string', ...  ];  
    }  
 </details>



### Авторизация

#### 1. http://localhost:3000/login

<details><summary>GET</summary>
    Для получения Jwt токена необходимо отправить запорос со следующим body

    body = {  
    &ensp;name: string;  
    &ensp;password: string;  
    }

    Тестовые данные для login: 

    login: mxsh25ggi5
    password: uk2q0y2n3y

 </details>
