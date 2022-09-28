import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import {Route, Routes} from "react-router-dom";
import Course from "./components/Course/Course";
import Traning from "./components/Traning/Traning";
import Contacts from "./components/Contacts/Contacts";
import Footer from "./components/Footer/Footer";
import Auth from "./components/Auth/Auth";

const App = () =>{
    const courses = [
        {
            id:1,
            name:"Основы Http запросов",
            dependises:[
                {
                    id:1,
                    name:"Основы HTTP",
                    desc:"HTTP обеспечивает общение между множеством хостов и клиентов, а также поддерживает целый ряд сетевых настроек.\n" +
                        "\n" +
                        "В основном, для общения используется TCP/IP, но это не единственный возможный вариант. По умолчанию, TCP/IP использует порт 80, но можно заюзать и другие."+
                        "Общение между хостом и клиентом происходит в два этапа: запрос и ответ. Клиент формирует HTTP запрос, в ответ на который сервер даёт ответ (сообщение). Чуть позже, мы более подробно рассмотрим эту схему работы.\n" +
                        "\n" +
                        "Текущая версия протокола HTTP - 1.1, в которой были введены некоторые новые фишки. На мой взгляд, самые важные из них это: поддержка постоянно открытого соединения, новый механизм передачи данных chunked transfer encoding, новые заголовки для кэширования. Что-то из этого мы рассмотрим во второй части данной статьи.",
                    image:"https://ruseller.com/lessons/les1726/images/http1-request-response.png"
                },
                {
                    id:2,
                    name:"URL",
                    desc:"Сердцевиной веб-общения является запрос, который отправляется через Единый указатель ресурсов (URL). Я уверен, что вы уже знаете, что такое URL адрес, однако для полноты картины, решил всё-таки сказать пару слов. Структура URL очень проста и состоит из следующих компонентов:Протокол может быть как http для обычных соединений, так и https для более безопасного обмена данными. Порт по умолчанию - 80. Далее следует путь к ресурсу на сервере и цепочка параметров.",
                    image:"https://ruseller.com/lessons/les1726/images/http1-request-response.png"
                },
                {
                    id:3,
                    name:"Методы",
                    desc:"С помощью URL, мы определяем точное название хоста, с которым хотим общаться, однако какое действие нам нужно совершить, можно сообщить только с помощью HTTP метода. Конечно же существует несколько видов действий, которые мы можем совершить. В HTTP реализованы самые нужные, подходящие под нужды большинства приложений.\n" +
                        "\n" +
                        "Существующие методы:\n" +
                        "\n" +
                        "GET: получить доступ к существующему ресурсу. В URL перечислена вся необходимая информация, чтобы сервер смог найти и вернуть в качестве ответа искомый ресурс.\n" +
                        "\n" +
                        "POST: используется для создания нового ресурса. POST запрос обычно содержит в себе всю нужную информацию для создания нового ресурса.\n" +
                        "\n" +
                        "PUT: обновить текущий ресурс. PUT запрос содержит обновляемые данные.\n" +
                        "\n" +
                        "DELETE: служит для удаления существующего ресурса.\n" +
                        "\n" +
                        "Данные методы самые популярные и чаще всего используются различными инструментами и фрэймворками. В некоторых случаях, PUT и DELETE запросы отправляются посредством отправки POST, в содержании которого указано действие, которое нужно совершить с ресурсом: создать, обновить или удалить.\n" +
                        "\n" +
                        "Также HTTP поддерживает и другие методы:\n" +
                        "\n" +
                        "HEAD: аналогичен GET. Разница в том, что при данном виде запроса не передаётся сообщение. Сервер получает только заголовки. Используется, к примеру, для того чтобы определить, был ли изменён ресурс.\n" +
                        "\n" +
                        "TRACE: во время передачи запрос проходит через множество точек доступа и прокси серверов, каждый из которых вносит свою информацию: IP, DNS. С помощью данного метода, можно увидеть всю промежуточную информацию.\n" +
                        "\n" +
                        "OPTIONS: используется для определения возможностей сервера, его параметров и конфигурации для конкретного ресурса.",
                    image: null
                },
                {
                    id:4,
                    name:"Коды состояния",
                    desc:"В ответ на запрос от клиента, сервер отправляет ответ, который содержит, в том числе, и код состояния. Данный код несёт в себе особый смысл для того, чтобы клиент мог отчётливей понять, как интерпретировать ответ:\n" +
                        "\n" +
                        "1xx: Информационные сообщения\n" +
                        "\n" +
                        "Набор этих кодов был введён в HTTP/1.1. Сервер может отправить запрос вида: Expect: 100-continue, что означает, что клиент ещё отправляет оставшуюся часть запроса. Клиенты, работающие с HTTP/1.0 игнорируют данные заголовки.\n" +
                        "\n" +
                        "2xx: Сообщения об успехе\n" +
                        "\n" +
                        "Если клиент получил код из серии 2xx, то запрос ушёл успешно. Самый распространённый вариант - это 200 OK. При GET запросе, сервер отправляет ответ в теле сообщения. Также существуют и другие возможные ответы:\n" +
                        "\n" +
                        "202 Accepted: запрос принят, но может не содержать ресурс в ответе. Это полезно для асинхронных запросов на стороне сервера. Сервер определяет, отправить ресурс или нет.\n" +
                        "204 No Content: в теле ответа нет сообщения.\n" +
                        "205 Reset Content: указание серверу о сбросе представления документа.\n" +
                        "206 Partial Content: ответ содержит только часть контента. В дополнительных заголовках определяется общая длина контента и другая инфа.\n" +
                        "3xx: Перенаправление\n" +
                        "\n" +
                        "Своеобразное сообщение клиенту о необходимости совершить ещё одно действие. Самый распространённый вариант применения: перенаправить клиент на другой адрес.\n" +
                        "\n" +
                        "301 Moved Permanently: ресурс теперь можно найти по другому URL адресу.\n" +
                        "303 See Other: ресурс временно можно найти по другому URL адресу. Заголовок Location содержит временный URL.\n" +
                        "304 Not Modified: сервер определяет, что ресурс не был изменён и клиенту нужно задействовать закэшированную версию ответа. Для проверки идентичности информации используется ETag (хэш Сущности - Enttity Tag);\n" +
                        "4xx: Клиентские ошибки\n" +
                        "\n" +
                        "Данный класс сообщений используется сервером, если он решил, что запрос был отправлен с ошибкой. Наиболее распространённый код: 404 Not Found. Это означает, что ресурс не найден на сервере. Другие возможные коды:\n" +
                        "\n" +
                        "400 Bad Request: вопрос был сформирован неверно.\n" +
                        "401 Unauthorized: для совершения запроса нужна аутентификация. Информация передаётся через заголовок Authorization.\n" +
                        "403 Forbidden: сервер не открыл доступ к ресурсу.\n" +
                        "405 Method Not Allowed: неверный HTTP метод был задействован для того, чтобы получить доступ к ресурсу.\n" +
                        "409 Conflict: сервер не может до конца обработать запрос, т.к. пытается изменить более новую версию ресурса. Это часто происходит при PUT запросах.\n" +
                        "5xx: Ошибки сервера\n" +
                        "\n" +
                        "Ряд кодов, которые используются для определения ошибки сервера при обработке запроса. Самый распространённый: 500 Internal Server Error. Другие варианты:\n" +
                        "\n" +
                        "501 Not Implemented: сервер не поддерживает запрашиваемую функциональность.\n" +
                        "503 Service Unavailable: это может случиться, если на сервере произошла ошибка или он перегружен. Обычно в этом случае, сервер не отвечает, а время, данное на ответ, истекает.",
                    image: null
                },
            ]
        }
    ]
    
    return(
        <div className="App">
            <div className="container">
                <Header/>
                <Routes>
                    <Route path="/" element={<Course courses={courses}/>}/>
                    <Route path="/:id" element={<Course courses={courses}/>}/>
                    <Route path="/traning" element={<Traning/>}/>
                    <Route path="/contacts" element={<Contacts/>}/>
                    <Route path="/profile" element={<Auth/>}/>
                </Routes>
            </div>
            {/*<Footer/>*/}
        </div>
    )
}
export default App;