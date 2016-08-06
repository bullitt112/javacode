
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<table>
<tr><td>
The Dog is Hunting!

</tr></td>

<tr><td>
The Dog Object: <c:out value="${dog}"/>
</tr></td>
<tr><td>
Age: <c:out value="${dog.age}"/>
</tr></td>
<tr><td>
Breed: <c:out value="${dog.breed}"/>
</tr></td>
<tr><td>
Color: <c:out value="${dog.color}"/>
</tr></td>

<tr><td>
Gender: <c:out value="${dog.gender}"/>
</tr></td>
</table>

<%-- <c:if test="${Dog.dog != null}">
    <div class="msg">test1: ${Dog.dog}</div>
</c:if> --%>

<%-- <c:forEach var="dogInfo" items="${dog}">
    <tr>
    <td>${dogInfo.breed}</td>
    <td>${dogInfo.color}</td>
    <td>${dogInfo.gender}</td>
    <td>${dogInfo.age}</td>

    </tr>
    </c:forEach>  --%>
<%-- <c:forEach var="listValue" items="${dog}">
    <li>${listValue}</li>
</c:forEach>  --%>