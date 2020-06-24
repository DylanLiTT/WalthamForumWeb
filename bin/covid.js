<div class="col-sm-6">
   
    <ol> 
    <% data.forEach((item) => {%>
      <li>
        <h3 class="title">
          State: <%= item.state || 'anyone'%>

          <% if (value == "Positive") { %>
            <br>Data Type: <%= "Positive cases"  || "Any data" %>
            <%= item.state %> 
            <%= item.positive %>
            <%} else if (value == "Recovered"){ %>
            <br>Data Type: <%= "Recovered cases" >
            <%= item.state %> 
            <%= item.death %>
            <% } else if (value == "Death")%>
            <br>Data Type: <%= "Recovered cases" >
            <%= item.state %> 
            <%= item.Recovered %>
            <% } else if (value == "Total Test Result")%>
            <br>Data Type: <%= "Total Test Result" >
            <%= item.state %> 
            <%= item.totalTestResults %>
            <% } %>
        </h3>
      </li>
    <%});%>
  </ol>
</div>