<div class="row">

    <div class="col-sm-6">
        <% data.forEach((item) => {%>
      <h3 class="title">
        State: <%= item.state || 'anyone'%>
        <br>Data Type <%= dataType  || "Any data" %>
      </h3>
      <ol> 
          <li>
          <%= item.state %> 
          <%= item.dataType %>
        <%});%>
    </idv>
  </div> 